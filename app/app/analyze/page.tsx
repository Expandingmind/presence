"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/browser";
import type { Job } from "@/lib/types";

type SavedAnalysis = { id: string; url: string; status: string; created_at: string; title: string | null };

export default function AppAnalyzePage() {
  const configured = isSupabaseConfigured();
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("indie iOS productivity app");
  const [job, setJob] = useState<Job | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<SavedAnalysis[]>([]);

  useEffect(() => { if (configured) loadHistory(); }, [configured]);

  async function loadHistory() {
    const sb = supabaseBrowser();
    const { data } = await sb.from("analyses").select("id,url,status,created_at,title").order("created_at", { ascending: false }).limit(10);
    setHistory((data ?? []) as SavedAnalysis[]);
  }

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
      else if (configured) loadHistory();
    };
    poll();
    return () => { cancelled = true; };
  }, [jobId, configured]);

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
      <div className="eyebrow">Analyzer</div>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 44, margin: "0 0 8px" }}>Feed it a video.</h1>
      <p className="lead">Paste any short-form URL. Presence returns the hook, the pacing, and 5 next-post ideas for your niche.</p>

      <form className="analyze-form" onSubmit={submit} style={{ margin: "24px 0 12px" }}>
        <input type="url" placeholder="https://www.youtube.com/shorts/…" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Analyze"}</button>
      </form>
      <input type="text" placeholder="Your niche" value={niche} onChange={(e) => setNiche(e.target.value)} style={{ width: "100%", minWidth: 0 }} />

      {job && (
        <div className="status-card" style={{ marginTop: 20 }}>
          <h3>{job.status === "done" ? "Done" : job.status === "error" ? "Error" : "Working…"}</h3>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: 14 }}>{job.url}</p>
          {job.error && <p style={{ color: "#a33", marginTop: 12 }}>{job.error}</p>}
        </div>
      )}

      {job?.steps.vision?.analysis && (
        <div className="status-card" style={{ marginTop: 20 }}>
          <div className="eyebrow">Analysis</div>
          <h3>Hook — {job.steps.vision.analysis.hook.hookType}</h3>
          <p>{job.steps.vision.analysis.hook.firstThreeSecondsDescription}</p>
          <p style={{ color: "var(--muted)", fontStyle: "italic" }}>{job.steps.vision.analysis.hook.whyItWorks}</p>
        </div>
      )}

      {job?.steps.ideas?.ideas && (
        <div style={{ marginTop: 24 }}>
          <div className="eyebrow">Next-post ideas</div>
          {job.steps.ideas.ideas.map((idea) => (
            <div key={idea.rank} className="idea">
              <div className="rank">#{idea.rank}</div>
              <div className="hook">"{idea.hook}"</div>
              <div className="meta"><span>{idea.format}</span><span>fit {idea.niche_fit_score}/5</span></div>
              <ol><li>{idea.outline[0]}</li><li>{idea.outline[1]}</li><li>{idea.outline[2]}</li></ol>
              <p style={{ margin: "10px 0 0" }}><b>CTA:</b> {idea.cta}</p>
              <p className="why">{idea.why}</p>
            </div>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>History</h2>
          {history.map((h) => (
            <div key={h.id} className="row-card">
              <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.title || h.url}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{h.status}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
