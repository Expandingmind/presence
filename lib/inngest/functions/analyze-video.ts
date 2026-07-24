import { inngest } from "../client";
import { store } from "../../store";
import { downloadVideo } from "../../pipeline/download";
import { transcribe } from "../../pipeline/transcribe";
import { analyzeVideo } from "../../pipeline/vision";
import { generateIdeas } from "../../pipeline/ideas";

export const analyzeVideoFn = inngest.createFunction(
  { id: "analyze-video", name: "Analyze video" },
  { event: "presence/analyze.requested" },
  async ({ event, step }) => {
    const { jobId, url, niche } = event.data as { jobId: string; url: string; niche: string };

    const download = await step.run("download", async () => {
      store.patch(jobId, { status: "downloading" });
      const r = await downloadVideo(url);
      store.patch(jobId, {
        steps: { download: { done: true, localPath: r.localPath, durationSec: r.durationSec } },
      });
      return r;
    });

    const transcript = await step.run("transcribe", async () => {
      store.patch(jobId, { status: "transcribing" });
      const r = await transcribe(download.localPath);
      store.patch(jobId, {
        steps: { transcribe: { done: true, transcript: r.text, segments: r.segments } },
      });
      return r;
    });

    const analysis = await step.run("analyze", async () => {
      store.patch(jobId, { status: "analyzing" });
      const r = await analyzeVideo(download.localPath, niche);
      store.patch(jobId, { steps: { vision: { done: true, analysis: r } } });
      return r;
    });

    const ideas = await step.run("ideas", async () => {
      store.patch(jobId, { status: "generating" });
      const r = await generateIdeas(transcript.text, analysis, niche);
      store.patch(jobId, { steps: { ideas: { done: true, ideas: r } } });
      return r;
    });

    store.patch(jobId, { status: "done" });
    return { jobId, ideasCount: ideas.length };
  },
);
