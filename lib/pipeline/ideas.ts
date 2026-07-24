import Anthropic from "@anthropic-ai/sdk";
import type { PostIdea, VideoAnalysis } from "../types";

const FRAMEWORKS = `# Short-form frameworks (reference)

## Hook-Retention-Payoff-CTA
- Hook (0-3s): pattern interrupt, curiosity gap, or bold claim. Must promise a payoff.
- Retention (3-15s): raise the stakes, deepen the promise, add proof or context.
- Payoff: deliver the promised value — the "aha" or the transformation.
- CTA: one specific ask. Tied to the payoff, not tacked on.

## Curiosity-gap hook patterns
- "Nobody talks about X but…"
- "I built X and Y happened"
- "The Z I wish I knew when I started"
- Contrarian: "Stop doing X. Do Y instead."
- Numbered lists with a spike: "3 things about X (the 3rd changed everything)"

## App/software marketing specifics
- Screen recordings > talking heads for feature demos when the product IS the payoff.
- On-screen text carries retention on muted-autoplay platforms — every second needs a caption or visual.
- Show the *problem* on screen for the first 2s. Show the *solution* by second 4. Show *proof* (numbers, reactions) by second 8.
- CTAs that work: "link in bio", "comment X for the [thing]", "reply if you want the template". Not "download my app".`;

const SYSTEM = `You are a short-form marketing strategist for indie app/software founders. Given a video's structured analysis, its transcript, and the user's niche, produce 5 next-post ideas ranked by predicted performance for that niche. Every idea must be concretely shootable today — not generic advice. Use the reference frameworks. Return ONLY valid JSON.`;

const JSON_SPEC = `Return an array of exactly 5 ideas, ranked 1 (best fit) to 5:
[
  {
    "rank": 1,
    "hook": "the exact opening line (spoken or on-screen)",
    "format": "e.g. 'screen recording + voiceover', 'talking head + b-roll', 'POV', 'text-only'",
    "outline": ["beat 1 (0-3s)", "beat 2 (3-10s)", "beat 3 (10s-end + CTA)"],
    "cta": "the specific ask",
    "why": "1-sentence rationale grounded in the source video's pattern + the niche",
    "niche_fit_score": 1|2|3|4|5
  }
]`;

export async function generateIdeas(
  transcript: string,
  analysis: VideoAnalysis,
  niche: string,
): Promise<PostIdea[]> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 3000,
    system: [
      { type: "text", text: SYSTEM },
      { type: "text", text: FRAMEWORKS, cache_control: { type: "ephemeral" } },
    ],
    messages: [
      {
        role: "user",
        content: `NICHE:\n${niche}\n\nSOURCE VIDEO ANALYSIS:\n${JSON.stringify(analysis, null, 2)}\n\nTRANSCRIPT:\n${transcript}\n\n${JSON_SPEC}`,
      },
    ],
  });

  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const json = extractJson(text);
  return JSON.parse(json) as PostIdea[];
}

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return text.trim();
}
