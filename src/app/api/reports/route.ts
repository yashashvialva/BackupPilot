import { NextResponse } from "next/server";
import { getTenantContext } from "@/lib/tenant";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const dynamic = "force-dynamic";
function jsonToCSV(items: any[], fields: string[], headers: string[]) {
  const replacer = (key: string, value: any) => (value === null ? "" : value);
  const csv = [
    headers.join(","),
    ...items.map((row) =>
      fields
        .map((fieldName) => {
          const val = row[fieldName];
          if (val instanceof Date) {
            return JSON.stringify(val.toISOString());
          }
          return JSON.stringify(val, replacer);
        })
        .join(",")
    ),
  ].join("\r\n");
  return csv;
}

export async function GET(request: Request) {
  try {
    const { customerDb: prisma, awsClients, connection } = await getTenantContext(request);

    const userId = request.headers.get("x-user-id");
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "success-rate"; // success-rate | storage | restore
    const format = searchParams.get("format") || "csv"; // csv | pdf

    let reportTitle = "";
    let csvData: any[] = [];
    let fields: string[] = [];
    let headers: string[] = [];

    if (type === "success-rate") {
      reportTitle = "Backup Job Execution Success Rates";
      const jobs = await prisma.backupJob.findMany({
        where: {
          policy: {
            target: {
              user_id: userId,
            },
          },
        },
        include: {
          policy: true,
        },
        orderBy: { started_at: "desc" },
      });

      csvData = jobs.map((j) => ({
        id: j.id,
        policy: j.policy.name,
        started: j.started_at,
        completed: j.completed_at || "",
        status: j.status,
        error: j.error_message || "",
      }));

      fields = ["id", "policy", "started", "completed", "status", "error"];
      headers = ["Job ID", "Backup Policy", "Started At", "Completed At", "Status", "Errors"];
    } else if (type === "storage") {
      reportTitle = "Storage Utilization and Snapshot Footprint";
      const snapshots = await prisma.snapshot.findMany({
        where: {
          job: {
            policy: {
              target: {
                user_id: userId,
              },
            },
          },
        },
        include: {
          job: {
            include: {
              policy: {
                include: {
                  target: true,
                },
              },
            },
          },
        },
        orderBy: { created_at: "desc" },
      });

      csvData = snapshots.map((s) => ({
        id: s.snapshot_id,
        policy: s.job.policy.name,
        target: s.job.policy.target.name,
        volume: s.job.policy.target.volume_id,
        size: s.size,
        created: s.created_at,
        state: s.state,
      }));

      fields = ["id", "policy", "target", "volume", "size", "created", "state"];
      headers = ["Snapshot ID", "Policy Name", "Backup Target", "Volume ID", "Size (GB)", "Created At", "State"];
    } else if (type === "restore") {
      reportTitle = "EBS Restore Operations Execution History";
      const restores = await prisma.restoreJob.findMany({
        where: {
          snapshot: {
            job: {
              policy: {
                target: {
                  user_id: userId,
                },
              },
            },
          },
        },
        include: {
          snapshot: {
            include: {
              job: {
                include: {
                  policy: {
                    include: {
                      target: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: { started_at: "desc" },
      });

      csvData = restores.map((r) => ({
        id: r.id,
        snapshot: r.snapshot_id,
        policy: r.snapshot.job.policy.name,
        started: r.started_at,
        completed: r.completed_at || "",
        status: r.status,
        new_volume: r.new_volume_id || "",
      }));

      fields = ["id", "snapshot", "policy", "started", "completed", "status", "new_volume"];
      headers = ["Restore Job ID", "Source Snapshot", "Source Policy", "Started At", "Completed At", "Status", "New Volume ID"];
    } else {
      return NextResponse.json({ error: "Invalid report type parameter." }, { status: 400 });
    }

    // A. Generate CSV
    if (format === "csv") {
      const csvContent = jsonToCSV(csvData, fields, headers);

      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${type}_report_${Date.now()}.csv"`,
        },
      });
    }

    // B. Generate PDF
    if (format === "pdf") {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      let page = pdfDoc.addPage([600, 800]);
      let y = 740;

      // Draw Title and Headers
      page.drawText("BackupPilot Management System", { x: 50, y: 765, size: 9, font, color: rgb(0.5, 0.5, 0.5) });
      page.drawText(reportTitle, { x: 50, y, size: 18, font: fontBold, color: rgb(0.1, 0.2, 0.4) });
      page.drawText(`Generated: ${new Date().toLocaleString()}`, { x: 50, y: y - 15, size: 8, font, color: rgb(0.4, 0.4, 0.4) });

      y -= 45;

      // Draw Header Line
      page.drawRectangle({
        x: 45,
        y: y - 4,
        width: 510,
        height: 18,
        color: rgb(0.92, 0.94, 0.98),
      });

      const colWidths = [120, 110, 100, 100, 80];
      let colX = 50;

      const pdfHeaders = headers.slice(0, 5);
      const pdfFields = fields.slice(0, 5);

      pdfHeaders.forEach((header, index) => {
        page.drawText(header, { x: colX, y: y, size: 8, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
        colX += colWidths[index] || 100;
      });

      y -= 20;

      // Draw Rows
      for (const row of csvData) {
        if (y < 60) {
          page = pdfDoc.addPage([600, 800]);
          y = 740;
        }

        colX = 50;
        pdfFields.forEach((field, index) => {
          let text = String(row[field] || "");
          if (text.length > 20) {
            text = text.substring(0, 18) + "...";
          }
          page.drawText(text, { x: colX, y, size: 7.5, font, color: rgb(0.2, 0.2, 0.2) });
          colX += colWidths[index] || 100;
        });

        // Thin divider
        page.drawLine({
          start: { x: 45, y: y - 4 },
          end: { x: 555, y: y - 4 },
          thickness: 0.5,
          color: rgb(0.9, 0.9, 0.9),
        });

        y -= 18;
      }

      const pdfBytes = await pdfDoc.save();

      return new Response(Buffer.from(pdfBytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${type}_report_${Date.now()}.pdf"`,
        },
      });
    }

    return NextResponse.json({ error: "Unsupported file format." }, { status: 400 });
  } catch (err: any) {
    console.error("GET /api/reports Error:", err);
    if (err.message?.includes("AWS Connection not found") || err.message?.includes("AssumeRole") || err.message?.includes("Secrets Manager") || err.name === "CredentialsProviderError") {
      return NextResponse.json({ error: "AWS connection unavailable or revoked", code: "TENANT_CONNECTION_FAILED" }, { status: 503 });
    }
    return NextResponse.json({ error: err.message || "Failed to generate report file." }, { status: 500 });
  }
}
