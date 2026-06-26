import crypto from "crypto";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ChangePasswordCommand,
  AdminGetUserCommand,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import * as jose from "jose";

const region = process.env.AWS_REGION as string;
const mockMode = process.env.MOCK_AWS === "true";
const clientSecret = "mock-jwt-secret-key-1234567890-backup-pilot";

const cognitoConfig = {
  region,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
};

const cognitoClient = !mockMode ? new CognitoIdentityProviderClient(cognitoConfig) : null;
const clientId = process.env.COGNITO_CLIENT_ID || "";
const userPoolId = process.env.COGNITO_USER_POOL_ID || "";

// Key for signing mock tokens
const mockSecret = new TextEncoder().encode(clientSecret);

interface CognitoTokens {
  IdToken: string;
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
}

/**
 * Generate simulated JWTs for mock mode.
 */
async function generateMockTokens(email: string, sub: string, role: string): Promise<CognitoTokens> {
  const now = Math.floor(Date.now() / 1000);
  const expiration = now + 3600; // 1 hour

  const idTokenPayload = {
    sub,
    email,
    name: email.split("@")[0],
    "cognito:groups": role === "Admin" ? ["Admin"] : ["User"],
    iss: `https://cognito-idp.${region}.amazonaws.com/mock_pool`,
    exp: expiration,
    iat: now,
  };

  const accessTokenPayload = {
    sub,
    username: email,
    client_id: "mock_client_id",
    exp: expiration,
    iat: now,
  };

  const idToken = await new jose.SignJWT(idTokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(mockSecret);

  const accessToken = await new jose.SignJWT(accessTokenPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(mockSecret);

  const refreshToken = "mock_refresh_token_" + sub;

  return {
    IdToken: idToken,
    AccessToken: accessToken,
    RefreshToken: refreshToken,
    ExpiresIn: 3600,
  };
}


/**
 * Sign up a new user.
 */
export async function signUpUser(email: string, password: string, name: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Signing up: email=${email}, name=${name}`);
    const sub = crypto.randomUUID();
    return { sub, userConfirmed: false };
  }

  try {
    const res = await cognitoClient!.send(
      new SignUpCommand({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "name", Value: name },
        ],
      })
    );
    return {
      sub: res.UserSub!,
      userConfirmed: res.UserConfirmed || false,
    };
  } catch (err: any) {
    if (err.name === "UsernameExistsException") {
      // Check if the existing user is UNCONFIRMED
      try {
        const existingUser = await cognitoClient!.send(
          new AdminGetUserCommand({
            UserPoolId: userPoolId,
            Username: email,
          })
        );
        
        if (existingUser.UserStatus === "UNCONFIRMED") {
          console.log(`[COGNITO] Deleting stale unconfirmed user for ${email}...`);
          // Delete the unconfirmed user
          await cognitoClient!.send(
            new AdminDeleteUserCommand({
              UserPoolId: userPoolId,
              Username: email,
            })
          );
          
          // Retry the signup
          console.log(`[COGNITO] Retrying signup for ${email}...`);
          const retryRes = await cognitoClient!.send(
            new SignUpCommand({
              ClientId: clientId,
              Username: email,
              Password: password,
              UserAttributes: [
                { Name: "email", Value: email },
                { Name: "name", Value: name },
              ],
            })
          );
          return {
            sub: retryRes.UserSub!,
            userConfirmed: retryRes.UserConfirmed || false,
          };
        }
      } catch (adminErr) {
        console.error("Failed to check or delete unconfirmed user:", adminErr);
      }
    }
    
    console.error("Cognito SignUp Error:", err);
    throw err; // Throw the original error object so the route can catch its name
  }
}

/**
 * Confirm user registration.
 */
export async function confirmUser(email: string, code: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Confirming email=${email} with code=${code}`);
    return { success: true };
  }

  try {
    await cognitoClient!.send(
      new ConfirmSignUpCommand({
        ClientId: clientId,
        Username: email,
        ConfirmationCode: code,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("Cognito Confirm Error:", err);
    throw new Error(err.message || "Failed to confirm verification code.");
  }
}

/**
 * Resend confirmation code.
 */
export async function resendCode(email: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Resending verification code to email=${email}`);
    return { success: true };
  }

  try {
    await cognitoClient!.send(
      new ResendConfirmationCodeCommand({
        ClientId: clientId,
        Username: email,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("Cognito ResendCode Error:", err);
    throw new Error(err.message || "Failed to resend verification code.");
  }
}

/**
 * Login user and fetch tokens.
 */
export async function loginUser(email: string, password: string, role: string = "User"): Promise<CognitoTokens> {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Logging in: email=${email}, role=${role}`);
    
    // Generate/Use a stable mock UUID for seed users if matching seed emails
    let sub = "c0ca1010-0000-0000-0000-000000000000"; // demo
    if (email === "admin@backuppilot.com") {
      sub = "c0ca1010-1111-1111-1111-111100000000";
    } else if (email !== "demo@backuppilot.com") {
      sub = crypto.randomUUID();
    }
    
    return generateMockTokens(email, sub, role);
  }

  try {
    const res = await cognitoClient!.send(
      new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
    );
    
    if (res.ChallengeName) {
      throw new Error(`Cognito returned auth challenge: ${res.ChallengeName}. Challenge flows are not supported in this simplified setup.`);
    }

    const authResult = res.AuthenticationResult;
    if (!authResult) {
      throw new Error("Invalid authentication result.");
    }

    return {
      IdToken: authResult.IdToken!,
      AccessToken: authResult.AccessToken!,
      RefreshToken: authResult.RefreshToken!,
      ExpiresIn: authResult.ExpiresIn || 3600,
    };
  } catch (err: any) {
    console.error("Cognito Login Error:", err);
    throw new Error(err.message || "Incorrect email or password.");
  }
}


/**
 * Request password reset (forgot password).
 */
export async function forgotPassword(email: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Requesting password reset code for email=${email}`);
    return { success: true };
  }

  try {
    await cognitoClient!.send(
      new ForgotPasswordCommand({
        ClientId: clientId,
        Username: email,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("Cognito ForgotPassword Error:", err);
    throw new Error(err.message || "Failed to trigger password reset flow.");
  }
}

/**
 * Complete password reset.
 */
export async function resetPassword(email: string, code: string, newPass: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Completing password reset for email=${email}`);
    return { success: true };
  }

  try {
    await cognitoClient!.send(
      new ConfirmForgotPasswordCommand({
        ClientId: clientId,
        Username: email,
        ConfirmationCode: code,
        Password: newPass,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("Cognito ResetPassword Error:", err);
    throw new Error(err.message || "Failed to reset password. Please ensure code is correct.");
  }
}

/**
 * Change password when logged in.
 */
export async function changeUserPassword(accessToken: string, oldPass: string, newPass: string) {
  if (mockMode) {
    console.log(`[MOCK COGNITO] Changing user password`);
    return { success: true };
  }

  try {
    await cognitoClient!.send(
      new ChangePasswordCommand({
        AccessToken: accessToken,
        PreviousPassword: oldPass,
        ProposedPassword: newPass,
      })
    );
    return { success: true };
  } catch (err: any) {
    console.error("Cognito ChangePassword Error:", err);
    throw new Error(err.message || "Failed to change password.");
  }
}
