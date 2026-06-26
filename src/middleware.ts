import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const region = process.env.AWS_REGION as string;
const mockMode = process.env.MOCK_AWS === "true";
const clientSecret = "mock-jwt-secret-key-1234567890-backup-pilot";
const mockSecret = new TextEncoder().encode(clientSecret);

// Configured Cognito Details
const clientId = process.env.COGNITO_CLIENT_ID || "";
const userPoolId = process.env.COGNITO_USER_POOL_ID || "";
const jwksUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;

// Cache remote JWKS
let jwksCached: any = null;
function getJwks() {
  if (!jwksCached && !mockMode && userPoolId) {
    jwksCached = jose.createRemoteJWKSet(new URL(jwksUrl));
  }
  return jwksCached;
}

/**
 * Edge-compatible token generator for mock refresh.
 */
async function generateMockTokens(email: string, sub: string, role: string) {
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + 3600; // 1 hour

  const idPayload = {
    sub,
    email,
    name: email.split("@")[0],
    "cognito:groups": role === "Admin" ? ["Admin"] : ["User"],
    iss: `https://cognito-idp.${region}.amazonaws.com/mock_pool`,
    exp: expiration,
    iat: now,
  };

  const idToken = await new jose.SignJWT(idPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(mockSecret);

  const accessToken = await new jose.SignJWT({
    sub,
    username: email,
    client_id: "mock_client_id",
    exp: expiration,
    iat: now,
  })
    .setProtectedHeader({ alg: "HS256" })
    .sign(mockSecret);

  return { idToken, accessToken };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that are excluded from authentication checks
  const isPublicPath =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth/login") ||
    pathname.startsWith("/api/auth/signup") ||
    pathname.startsWith("/api/auth/confirm") ||
    pathname.startsWith("/api/auth/resend-code") ||
    pathname.startsWith("/api/auth/forgot-password") ||
    pathname.startsWith("/api/auth/reset-password") ||
    pathname.startsWith("/api/auth/logout") ||
    pathname.includes("favicon.ico");

  const idTokenCookie = request.cookies.get("bp_id_token")?.value;
  const accessTokenCookie = request.cookies.get("bp_access_token")?.value;
  const refreshTokenCookie = request.cookies.get("bp_refresh_token")?.value;
  const userEmailCookie = request.cookies.get("bp_user_email")?.value || "";
  const userRoleCookie = request.cookies.get("bp_user_role")?.value || "User";

  let payload: any = null;
  let errorMsg = "";

  if (idTokenCookie) {
    try {
      if (mockMode) {
        const { payload: verified } = await jose.jwtVerify(idTokenCookie, mockSecret);
        payload = verified;
      } else {
        const jwks = getJwks();
        if (jwks) {
          const { payload: verified } = await jose.jwtVerify(idTokenCookie, jwks);
          payload = verified;
        } else {
          errorMsg = "JWKS not configured";
        }
      }
    } catch (err: any) {
      errorMsg = err.message || "JWT verification failed";
    }
  }

  // Token is valid - forward request with headers
  if (payload) {
    if (isPublicPath && !pathname.startsWith("/api/auth")) {
      // Authenticated user trying to access login/register -> redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.sub);
    response.headers.set("x-user-email", payload.email || "");
    const groups = payload["cognito:groups"] || [];
    const role = groups.includes("Admin") ? "Admin" : "User";
    response.headers.set("x-user-role", role);
    return response;
  }

  // Token is invalid/expired, but refresh token is available -> attempt silent refresh
  if (refreshTokenCookie) {
    try {
      let newIdToken = "";
      let newAccessToken = "";
      let userId = "";
      let userEmail = userEmailCookie;
      let userRole = userRoleCookie;

      if (mockMode) {
        userId = refreshTokenCookie.replace("mock_refresh_token_", "");
        const tokens = await generateMockTokens(userEmail || "demo@backuppilot.com", userId, userRole);
        newIdToken = tokens.idToken;
        newAccessToken = tokens.accessToken;
      } else {
        // Live Cognito refresh call
        const cognitoUrl = `https://cognito-idp.${region}.amazonaws.com/`;
        const refreshResponse = await fetch(cognitoUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          },
          body: JSON.stringify({
            ClientId: clientId,
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
              REFRESH_TOKEN: refreshTokenCookie,
            },
          }),
        });

        if (!refreshResponse.ok) {
          throw new Error("Cognito refresh request failed.");
        }

        const data = await refreshResponse.json();
        newIdToken = data.AuthenticationResult?.IdToken;
        newAccessToken = data.AuthenticationResult?.AccessToken;

        if (!newIdToken || !newAccessToken) {
          throw new Error("Cognito did not return new tokens.");
        }

        // Decode the new token to read claims
        const decoded = jose.decodeJwt(newIdToken);
        userId = decoded.sub || "";
        userEmail = (decoded.email as string) || userEmailCookie;
        const groups = (decoded["cognito:groups"] as string[]) || [];
        userRole = groups.includes("Admin") ? "Admin" : "User";
      }

      if (isPublicPath && !pathname.startsWith("/api/auth")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Successful refresh - set cookies on request & response
      const response = NextResponse.next();
      
      const secureFlag = process.env.NODE_ENV === "production";
      response.cookies.set("bp_id_token", newIdToken, {
        httpOnly: true,
        secure: secureFlag,
        sameSite: "strict",
        maxAge: 3600,
      });
      response.cookies.set("bp_access_token", newAccessToken, {
        httpOnly: true,
        secure: secureFlag,
        sameSite: "strict",
        maxAge: 3600,
      });

      response.headers.set("x-user-id", userId);
      response.headers.set("x-user-email", userEmail);
      response.headers.set("x-user-role", userRole);
      return response;
    } catch (refreshErr) {
      console.error("Token refresh failed in middleware:", refreshErr);
      // Fall through to redirect/unauthorized
    }
  }

  // User is not authenticated and has no active session
  if (isPublicPath) {
    return NextResponse.next();
  }

  // API request -> return 401 Unauthorized
  if (pathname.startsWith("/api/")) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorized. Please authenticate." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Page request -> redirect to landing/login page
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
