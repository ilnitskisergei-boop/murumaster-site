import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipient =
  process.env.INQUIRY_RECIPIENT_EMAIL || "ilnitskisergei@gmail.com";

type InquiryPayload = {
  name?: string;
  email?: string;
  requestType?: string;
  service?: string;
  region?: string;
  comment?: string;
  language?: "et" | "ru" | string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value?: string) {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;color:#17201b;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#314338;">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as InquiryPayload;
    const language = payload.language === "ru" ? "ru" : "et";
    const requiredFields = [
      ["name", payload.name],
      ["email", payload.email],
      ["requestType", payload.requestType],
      ["service", payload.service],
    ];
    const missing = requiredFields
      .filter(([, value]) => !String(value ?? "").trim())
      .map(([field]) => field);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const submittedAt = new Date().toISOString();
    const subject =
      language === "ru" ? "НОВАЯ ЗАЯВКА – MURUMASTER" : "UUS PÄRING – MURUMASTER";
    const fields = {
      Language: language.toUpperCase(),
      Name: payload.name ?? "",
      Email: payload.email ?? "",
      "Request type": payload.requestType ?? "",
      "Selected service": payload.service ?? "",
      Region: payload.region ?? "",
      Comment: payload.comment ?? "",
      "Submitted at": submittedAt,
    };
    const text = Object.entries(fields)
      .map(([label, value]) => `${label}: ${value || "-"}`)
      .join("\n");
    const html = `
      <div style="font-family:Arial,sans-serif;background:#f7faf5;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dbe5d8;">
          <div style="background:#12351f;color:#ffffff;padding:20px 24px;">
            <h1 style="margin:0;font-size:22px;">${escapeHtml(subject)}</h1>
            <p style="margin:8px 0 0;color:#f4c542;font-weight:700;">Murumaster</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${Object.entries(fields)
              .map(([label, value]) => row(label, value))
              .join("")}
          </table>
        </div>
      </div>
    `;

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "Murumaster <onboarding@resend.dev>",
      to: recipient,
      replyTo: payload.email,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend inquiry error", result.error);
      return NextResponse.json(
        { error: "Failed to send inquiry email" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("FORM ERROR:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
