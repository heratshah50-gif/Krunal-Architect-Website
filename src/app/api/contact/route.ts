import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { contactSchema } from "@/lib/validations/contact";
import { serverClient } from "@/sanity/lib/serverClient";
import { isSanityConfigured } from "@/sanity/env";
import { resend, isResendConfigured } from "@/lib/resend";
import { contactNotificationHtml } from "@/lib/emailTemplates";
import { site } from "@/lib/constants";

// Local-file fallback: used only when Sanity isn't configured yet (see the
// build plan). It keeps the form working end-to-end in local dev before the
// client sets up a real Sanity project, but does NOT survive on serverless
// hosts like Vercel — the Sanity write below is the durable path once
// SANITY_API_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID are set.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

async function appendInquiryLocally(entry: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  let existing: unknown[] = [];
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }
  existing.push(entry);
  await writeFile(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the highlighted fields.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (result.data.company) {
    return NextResponse.json({ success: true });
  }

  const { name, email, phone, projectType, message } = result.data;
  const submittedAt = new Date().toISOString();

  let leadSaved = false;

  if (isSanityConfigured && process.env.SANITY_API_WRITE_TOKEN) {
    try {
      await serverClient.create({
        _type: "inquiry",
        name,
        email,
        phone: phone || undefined,
        projectType: projectType || undefined,
        message,
        submittedAt,
        status: "New",
      });
      leadSaved = true;
    } catch (error) {
      console.error("Failed to write inquiry to Sanity, falling back to local file", error);
    }
  }

  if (!leadSaved) {
    try {
      await appendInquiryLocally({
        name,
        email,
        phone: phone || null,
        projectType: projectType || null,
        message,
        submittedAt,
        status: "New",
      });
      leadSaved = true;
    } catch (error) {
      console.error("Failed to persist contact inquiry locally", error);
    }
  }

  if (!leadSaved) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our end. Please call or email us directly.",
      },
      { status: 500 }
    );
  }

  // Email notification is best-effort: the lead is already durably saved
  // above, so a transient email failure should never fail the request.
  if (isResendConfigured && resend) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.NOTIFY_EMAIL || site.email,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        html: contactNotificationHtml({ name, email, phone, projectType, message }),
      });
    } catch (error) {
      console.error("Failed to send contact notification email", error);
    }
  }

  return NextResponse.json({ success: true });
}
