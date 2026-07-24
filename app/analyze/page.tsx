"use client";
import { useEffect, useState } from "react";
import type { Job } from "@/lib/types";

const STEP_LABELS: Record<string, string> = {
  downloading: "Downloading video",
  transcribing: "Transcribing audio",
  analyzing: "Analyzing hook, pacing, on-screen text",
  generating: "Generating post ideas",
};

const STEPS_ORDER = ["downloading", "transcribing", "analyzing", "generating"] as const;

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("indie iOS productivity app");
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    const poll = async () => {
      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) return;
      const j = (await res.json()) as Job;
      if (cancelled) return;
      setJob(j);
      if (j.status !== "done" && j.status !== "error") setTimeout(poll, 1500);
    };
    poll();
    return () => { cancelled = true; };
  }, [jobId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setSubmitting(true);
    setJob(null);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url, niche }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.id) setJobId(data.id);
  }

  return (
    <>
      <header>
        <nav>
          <a href="/" className="brand"><span className="dot" />Presence</a>
          <a className="nav-cta" href="/">Home</a>
        </nav>
      </header>

      <main className="analyze-wrap">
        <div className="eyebrow">Analyzer</div>
        <h1 style={{ fontSize: "clamp(38px,6vw,64px)", margin: "0 0 12px" }}>
          Paste a video. <em>Get the pattern.</em>
        </h1>
        <p className="lead">Drop a YouTube Short (TikTok / Reels coming soon). Presence watches it and returns the hook breakdown, pacing, and 5 next-post ideas for your niche.</p>

        <form className="analyze-form" onSubmit={submit}>
          <input type="url" placeholder="https://www.youtube.com/shorts/…" value={url} onChange={(e) => setUrl(e.target.value)} required />
          <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Analyze"}</button>
        </form>
        <input type="text" placeholder="Your niche (e.g. indie iOS productivity app)" value={niche} onChange={(e) => setNiche(e.target.value)} style={{ width: "100%", minWidth: 0 }} />

        {job && (
          <div className="status-card">
            <h3>{job.status === "done" ? "Done" : job.status === "error" ? "Error" : "Working…"}</h3>
            <p style={{ color: "var(--muted)", margin: 0, fontSize: 14 }}>{job.url}</p>
            <ul className="step-list">
              {STEPS_ORDER.map((s) => {
                const done =
                  (s === "downloading" && job.steps.download?.done) ||
                  (s === "transcribing" && job.steps.transcribe?.done) ||
                  (s === "analyzing" && job.steps.vision?.done) ||
                  (s === "generating" && job.steps.ideas?.done);
                const active = job.status === s;
                return (
                  <li key={s} className={done ? "done" : active ? "active" : ""}>
                    <span className="step-dot" /> {STEP_LABELS[s]}
                  </li>
                );
              })}
            </ul>
            {job.error && <p style={{ color: "#a33", marginTop: 12 }}>{job.error}</p>}
          </div>
        )}

        {job?.steps.vision?.analysis && (
          <div className="status-card" style={{ marginTop: 20 }}>
            <div className="eyebrow">Analysis</div>
            <h3>Hook — {job.steps.vision.analysis.hook.hookType} ({job.steps.vision.analysis.hook.strength}/5)</h3>
            <p style={{ margin: "6px 0 10px" }}>{job.steps.vision.analysis.hook.firstThreeSecondsDescription}</p>
            <p style={{ color: "var(--muted)", fontStyle: "italic", margin: 0 }}>{job.steps.vision.analysis.hook.whyItWorks}</p>
            <p style={{ marginTop: 14 }}><b>Pacing:</b> {job.steps.vision.analysis.pacing.cutRhythm} · {job.steps.vision.analysis.pacing.totalCuts} cuts · {job.steps.vision.analysis.pacing.avgCutLengthSec}s avg</p>
            <p><b>Format:</b> {job.steps.vision.analysis.format}</p>
            <p style={{ color: "var(--muted)" }}>{job.steps.vision.analysis.overall_summary}</p>
          </div>
        )}

        {job?.steps.ideas?.ideas && (
          <div style={{ marginTop: 24 }}>
            <div className="eyebrow">Next-post ideas</div>
            {job.steps.ideas.ideas.map((idea) => (
              <div key={idea.rank} className="idea">
                <div className="rank">#{idea.rank}</div>
                <div className="hook">"{idea.hook}"</div>
                <div className="meta">
                  <span>{idea.format}</span>
                  <span>fit {idea.niche_fit_score}/5</span>
                </div>
                <ol>
                  <li>{idea.outline[0]}</li>
                  <li>{idea.outline[1]}</li>
                  <li>{idea.outline[2]}</li>
                </ol>
                <p style={{ margin: "10px 0 0" }}><b>CTA:</b> {idea.cta}</p>
                <p className="why">{idea.why}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
