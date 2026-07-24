"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/browser";

type Idea = {
  id: string;
  hook: string;
  format: string | null;
  outline: string | null;
  cta: string | null;
  notes: string | null;
  status: "inbox" | "drafting" | "shipped" | "killed";
  created_at: string;
};

const STATUSES: Idea["status"][] = ["inbox", "drafting", "shipped", "killed"];

export default function IdeasPage() {
  const configured = isSupabaseConfigured();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ hook: "", format: "", outline: "", cta: "", notes: "" });
  const [filter, setFilter] = useState<Idea["status"] | "all">("all");

  useEffect(() => { if (configured) load(); else setLoading(false); }, [configured]);

  async function load() {
    const sb = supabaseBrowser();
    const { data } = await sb.from("ideas").select("*").order("created_at", { ascending: false });
    setIdeas((data ?? []) as Idea[]);
    setLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.hook.trim()) return;
    const sb = supabaseBrowser();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return;
    await sb.from("ideas").insert({
      user_id: user.id,
      hook: form.hook.trim(),
      format: form.format.trim() || null,
      outline: form.outline.trim() || null,
      cta: form.cta.trim() || null,
      notes: form.notes.trim() || null,
    });
    setForm({ hook: "", format: "", outline: "", cta: "", notes: "" });
    setShowForm(false);
    load();
  }

  async function setStatus(id: string, status: Idea["status"]) {
    const sb = supabaseBrowser();
    await sb.from("ideas").update({ status }).eq("id", id);
    setIdeas((is) => is.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this idea?")) return;
    const sb = supabaseBrowser();
    await sb.from("ideas").delete().eq("id", id);
    setIdeas((is) => is.filter((i) => i.id !== id));
  }

  const shown = filter === "all" ? ideas : ideas.filter((i) => i.status === filter);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow">Ideas</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 44, margin: "0 0 8px" }}>Your post inbox.</h1>
          <p className="lead" style={{ maxWidth: 520 }}>Every hook, every angle, every "what if…". Captured before you forget.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add idea"}</button>
      </div>

      {!configured && (
        <div className="status-card" style={{ marginTop: 24 }}>
          <b>Preview mode.</b>
          <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>Connect Supabase to save ideas. See <code>SUPABASE_SETUP.md</code>.</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="status-card" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="text" placeholder="Hook (the opening line) *" value={form.hook} onChange={(e) => setForm({ ...form, hook: e.target.value })} required />
          <input type="text" placeholder="Format (screen recording, talking head, POV…)" value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value })} />
          <textarea placeholder="Outline (3 beats: hook → body → payoff)" value={form.outline} onChange={(e) => setForm({ ...form, outline: e.target.value })} rows={3} style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line-strong)", fontFamily: "var(--sans)", fontSize: 15 }} />
          <input type="text" placeholder="CTA" value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
          <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line-strong)", fontFamily: "var(--sans)", fontSize: 15 }} />
          <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Save idea</button>
        </form>
      )}

      <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["all", ...STATUSES] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={filter === f ? "chip chip-active" : "chip"}>{f}</button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        {loading && <p style={{ color: "var(--muted)" }}>Loading…</p>}
        {!loading && shown.length === 0 && configured && (
          <div className="status-card">
            <h3>{filter === "all" ? "No ideas yet." : `No ideas in "${filter}".`}</h3>
            <p style={{ margin: 0, color: "var(--muted)" }}>Click "Add idea" to capture your first one.</p>
          </div>
        )}
        {shown.map((i) => (
          <div key={i.id} className="row-card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.3 }}>"{i.hook}"</div>
                {i.format && <div style={{ marginTop: 6, fontSize: 13, color: "var(--green)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{i.format}</div>}
                {i.outline && <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14, color: "var(--ink-soft)", whiteSpace: "pre-wrap" }}>{i.outline}</p>}
                {i.cta && <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14 }}><b>CTA:</b> {i.cta}</p>}
                {i.notes && <p style={{ marginTop: 6, marginBottom: 0, fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>{i.notes}</p>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value as Idea["status"])} className="mini-select">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(i.id)} className="link-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
