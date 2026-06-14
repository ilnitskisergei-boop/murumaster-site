import { NextResponse } from "next/server";

const resendEndpoint = "https://api.resend.com/emails";
const leadRecipient = "muru.master.ee@gmail.com";
const subject = "UUS PÄRING – MURUMASTER";

type LeadPayload = {
  locale?: string;
  name?: string;
  email?: string;
  requestType?: string;
  need?: string;
  area?: string;
  comment?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as LeadPayload;
  const fields = {
    "Keel / Language": payload.locale ?? "",
    Nimi: payload.name ?? "",
    "E-post": payload.email ?? "",
    "Päringu tüüp": payload.requestType ?? "",
    Teenus: payload.need ?? "",
    Piirkond: payload.area ?? "",
    Kommentaar: payload.comment ?? "",
  };

  if (!fields.Nimi || !fields["E-post"] || !fields["Päringu tüüp"] || !fields.Teenus || !fields.Piirkond) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const text = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || "-"}`)
    .join("\n");

  const resendResponse = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Murumaster <onboarding@resend.dev>",
      to: [leadRecipient],
      reply_to: fields["E-post"],
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
