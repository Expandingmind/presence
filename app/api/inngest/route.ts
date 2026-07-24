import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { analyzeVideoFn } from "@/lib/inngest/functions/analyze-video";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [analyzeVideoFn],
});
