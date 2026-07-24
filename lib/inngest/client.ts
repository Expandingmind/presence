import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "presence" });

export type AnalyzeEvent = {
  name: "presence/analyze.requested";
  data: { jobId: string; url: string; niche: string };
};
