import fs from "node:fs";
import Groq from "groq-sdk";
import type { TranscriptSegment } from "../types";

export type TranscribeResult = { text: string; segments: TranscriptSegment[] };

export async function transcribe(localPath: string): Promise<TranscribeResult> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const res = await groq.audio.transcriptions.create({
    file: fs.createReadStream(localPath),
    model: "whisper-large-v3-turbo",
    response_format: "verbose_json",
    timestamp_granularities: ["segment"],
  });

  const anyRes = res as unknown as { text: string; segments?: { start: number; end: number; text: string }[] };
  return {
    text: anyRes.text,
    segments: (anyRes.segments ?? []).map((s) => ({ start: s.start, end: s.end, text: s.text.trim() })),
  };
}
