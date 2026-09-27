import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { contactSchema } from "@/lib/validations/contact";

// NOTE: Phase 1 persistence only. Submissions are appended to a local JSON
// file so the form is genuinely functional in dev. This file does not
// survive on serverless hosts like Vercel (ephemeral filesystem) — Phase 2/3
// of the build plan replaces this with a Sanity `inquiry` document write +
// a Resend email notification, per PLAN.md.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

async function appendInquiry(entry: Record<string, unknown>) {
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

  try {
    await appendInquiry({
      name,
      email,
      phone: phone || null,
      projectType: projectType || null,
      message,
      submittedAt: new Date().toISOString(),
      status: "New",
    });
  } catch (error) {
    console.error("Failed to persist contact inquiry", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our end. Please call or email us directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
