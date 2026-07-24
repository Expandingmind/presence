import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { inngest } from "@/lib/inngest/client";
import { store } from "@/lib/store";
import type { Job } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { url?: string; niche?: string };
  const url = body.url?.trim();
  const niche = body.niche?.trim() || "indie iOS/software app founders";
  if (!url) return NextResponse.json({ error: "url required" }, { status: 400 });

  const id = randomUUID();
  const job: Job = { id, createdAt: Date.now(), url, niche, status: "queued", steps: {} };
  store.set(job);

  await inngest.send({ name: "presence/analyze.requested", data: { jobId: id, url, niche } });

  return NextResponse.json({ id, status: "queued" });
}
