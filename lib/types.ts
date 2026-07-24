export type JobStatus = "queued" | "downloading" | "transcribing" | "analyzing" | "generating" | "done" | "error";

export type PipelineSteps = {
  download?: { done: boolean; localPath?: string; durationSec?: number };
  transcribe?: { done: boolean; transcript?: string; segments?: TranscriptSegment[] };
  vision?: { done: boolean; analysis?: VideoAnalysis };
  ideas?: { done: boolean; ideas?: PostIdea[] };
};

export type TranscriptSegment = { start: number; end: number; text: string };

export type VideoAnalysis = {
  hook: { firstThreeSecondsDescription: string; hookType: string; strength: 1 | 2 | 3 | 4 | 5; whyItWorks: string };
  pacing: { totalCuts: number; avgCutLengthSec: number; cutRhythm: "fast" | "moderate" | "slow" | "varied" };
  onScreenText: string[];
  visualBeats: { atSec: number; description: string }[];
  format: string;
  niche_pattern_match: string;
  overall_summary: string;
};

export type PostIdea = {
  rank: number;
  hook: string;
  format: string;
  outline: [string, string, string];
  cta: string;
  why: string;
  niche_fit_score: 1 | 2 | 3 | 4 | 5;
};

export type Job = {
  id: string;
  createdAt: number;
  url: string;
  niche: string;
  status: JobStatus;
  steps: PipelineSteps;
  error?: string;
};
