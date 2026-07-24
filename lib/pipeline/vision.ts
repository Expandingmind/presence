import fs from "node:fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VideoAnalysis } from "../types";

const SYSTEM = `You are a short-form video analyst for app/software marketing. Watch the video and return strict JSON matching the schema. Focus on the CRAFT — the hook, cut rhythm, on-screen text, visual beats. Be concrete and time-anchored. No fluff.`;

const SCHEMA_PROMPT = `Return ONLY valid JSON, no markdown fences, matching:
{
  "hook": { "firstThreeSecondsDescription": string, "hookType": string, "strength": 1|2|3|4|5, "whyItWorks": string },
  "pacing": { "totalCuts": number, "avgCutLengthSec": number, "cutRhythm": "fast"|"moderate"|"slow"|"varied" },
  "onScreenText": string[],
  "visualBeats": [{ "atSec": number, "description": string }],
  "format": string,
  "niche_pattern_match": string,
  "overall_summary": string
}`;

export async function analyzeVideo(localPath: string, niche: string): Promise<VideoAnalysis> {
  const bytes = await fs.readFile(localPath);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM,
    generationConfig: { responseMimeType: "application/json" },
  });

  const result = await model.generateContent([
    { inlineData: { mimeType: "video/mp4", data: bytes.toString("base64") } },
    `Niche context: ${niche}\n\n${SCHEMA_PROMPT}`,
  ]);

  const text = result.response.text();
  return JSON.parse(text) as VideoAnalysis;
}
