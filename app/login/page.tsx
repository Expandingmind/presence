"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState("/app");
  const configured = isSupabaseConfigured();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("error")) setError("Sign-in failed. Try again.");
    if (p.get("next")) setNext(p.get("next")!);
  }, []);

  async function signInWithGoogle() {
    if (!configured) return;
    setLoading(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) { setError(error.message); setLoading(false); }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="status-card" style={{ maxWidth: 440, width: "100%", padding: "40px 36px", textAlign: "center" }}>
        <a href="/" className="brand" style={{ justifyContent: "center", marginBottom: 24 }}>
          <span className="dot" /> Presence
        </a>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 36, margin: "0 0 8px" }}>Welcome.</h1>
        <p style={{ color: "var(--muted)", margin: "0 0 28px" }}>Sign in to build your app's presence.</p>

        {!configured ? (
          <div style={{ padding: 16, background: "var(--green-soft)", borderRadius: 12, fontSize: 14, color: "var(--green-ink)", textAlign: "left" }}>
            <b>Supabase not connected yet.</b>
            <p style={{ margin: "6px 0 0" }}>Follow <code>SUPABASE_SETUP.md</code> at the repo root, then reload this page.</p>
          </div>
        ) : (
          <>
            <button className="btn btn-primary" onClick={signInWithGoogle} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
              {loading ? "Redirecting…" : "Continue with Google"}
            </button>
            {error && <p style={{ color: "#a33", marginTop: 14, fontSize: 14 }}>{error}</p>}
          </>
        )}

        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 24 }}>
          <a href="/" style={{ color: "var(--muted)", textDecoration: "underline" }}>← Back to home</a>
        </p>
      </div>
    </main>
  );
}
