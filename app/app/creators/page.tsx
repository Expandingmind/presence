"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/browser";

type Creator = {
  id: string;
  name: string;
  handle: string | null;
  platforms: string[];
  contact: string | null;
  notes: string | null;
  status: "prospect" | "active" | "paused" | "dropped";
  created_at: string;
};

const STATUSES: Creator["status"][] = ["prospect", "active", "paused", "dropped"];

export default function CreatorsPage() {
  const configured = isSupabaseConfigured();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", handle: "", platforms: "", contact: "", notes: "" });

  useEffect(() => { if (configured) load(); else setLoading(false); }, [configured]);

  async function load() {
    const sb = supabaseBrowser();
    const { data } = await sb.from("creators").select("*").order("created_at", { ascending: false });
    setCreators((data ?? []) as Creator[]);
    setLoading(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const sb = supabaseBrowser();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return;
    const platforms = form.platforms.split(",").map((s) => s.trim()).filter(Boolean);
    await sb.from("creators").insert({
      user_id: user.id,
      name: form.name.trim(),
      handle: form.handle.trim() || null,
      platforms,
      contact: form.contact.trim() || null,
      notes: form.notes.trim() || null,
    });
    setForm({ name: "", handle: "", platforms: "", contact: "", notes: "" });
    setShowForm(false);
    load();
  }

  async function setStatus(id: string, status: Creator["status"]) {
    const sb = supabaseBrowser();
    await sb.from("creators").update({ status }).eq("id", id);
    setCreators((cs) => cs.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this creator?")) return;
    const sb = supabaseBrowser();
    await sb.from("creators").delete().eq("id", id);
    setCreators((cs) => cs.filter((c) => c.id !== id));
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow">Creators</div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 44, margin: "0 0 8px" }}>Your UGC roster.</h1>
          <p className="lead" style={{ maxWidth: 520 }}>Invite creators, track deliverables, keep every conversation in one place.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "+ Add creator"}</button>
      </div>

      {!configured && (
        <div className="status-card" style={{ marginTop: 24 }}>
          <b>Preview mode.</b>
          <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>Connect Supabase to save creators. See <code>SUPABASE_SETUP.md</code>.</p>
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="status-card" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="text" placeholder="Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="text" placeholder="Handle (e.g. @nameonig)" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
          <input type="text" placeholder="Platforms (comma-separated: tiktok, instagram, youtube)" value={form.platforms} onChange={(e) => setForm({ ...form, platforms: e.target.value })} />
          <input type="text" placeholder="Contact (email or DM link)" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          <textarea placeholder="Notes (rates, style, who they've worked with…)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} style={{ borderRadius: 16, padding: 14, border: "1px solid var(--line-strong)", fontFamily: "var(--sans)", fontSize: 15 }} />
          <button className="btn btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Save creator</button>
        </form>
      )}

      <div style={{ marginTop: 28 }}>
        {loading && <p style={{ color: "var(--muted)" }}>Loading…</p>}
        {!loading && creators.length === 0 && configured && (
          <div className="status-card">
            <h3>No creators yet.</h3>
            <p style={{ margin: 0, color: "var(--muted)" }}>Click "Add creator" to start your roster.</p>
          </div>
        )}
        {creators.map((c) => (
          <div key={c.id} className="row-card" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>{c.name}</div>
                {c.handle && <div style={{ color: "var(--muted)", fontSize: 14 }}>{c.handle}</div>}
                {c.platforms.length > 0 && (
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {c.platforms.map((p) => <span key={p} style={{ fontSize: 11, padding: "3px 9px", background: "var(--green-soft)", color: "var(--green)", borderRadius: 999, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{p}</span>)}
                  </div>
                )}
                {c.contact && <div style={{ marginTop: 8, fontSize: 14, color: "var(--ink-soft)" }}>{c.contact}</div>}
                {c.notes && <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14, color: "var(--muted)" }}>{c.notes}</p>}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <select value={c.status} onChange={(e) => setStatus(c.id, e.target.value as Creator["status"])} className="mini-select">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(c.id)} className="link-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
