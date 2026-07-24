import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";

export default async function Dashboard() {
  let recentAnalyses: { id: string; url: string; created_at: string; status: string }[] = [];
  let creatorCount = 0;
  let ideaCount = 0;

  if (isSupabaseConfigured()) {
    const supabase = await supabaseServer();
    const [{ data: analyses }, { count: cc }, { count: ic }] = await Promise.all([
      supabase.from("analyses").select("id,url,created_at,status").order("created_at", { ascending: false }).limit(5),
      supabase.from("creators").select("*", { count: "exact", head: true }),
      supabase.from("ideas").select("*", { count: "exact", head: true }),
    ]);
    recentAnalyses = analyses ?? [];
    creatorCount = cc ?? 0;
    ideaCount = ic ?? 0;
  }

  return (
    <>
      <div className="eyebrow">Dashboard</div>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 44, margin: "0 0 8px" }}>Welcome back.</h1>
      <p className="lead">Everything you're shipping, in one place.</p>

      <div className="stat-grid">
        <a href="/app/analyze" className="stat-card">
          <div className="stat-num">{recentAnalyses.length}</div>
          <div className="stat-label">Recent analyses</div>
        </a>
        <a href="/app/creators" className="stat-card">
          <div className="stat-num">{creatorCount}</div>
          <div className="stat-label">UGC creators</div>
        </a>
        <a href="/app/ideas" className="stat-card">
          <div className="stat-num">{ideaCount}</div>
          <div className="stat-label">Post ideas</div>
        </a>
      </div>

      {recentAnalyses.length > 0 && (
        <>
          <h2 style={{ fontSize: 22, marginTop: 40, fontWeight: 600 }}>Recent analyses</h2>
          <div style={{ marginTop: 12 }}>
            {recentAnalyses.map((a) => (
              <a key={a.id} href={`/app/analyze?id=${a.id}`} className="row-card">
                <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.url}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.status}</div>
              </a>
            ))}
          </div>
        </>
      )}

      {!isSupabaseConfigured() && (
        <div className="status-card" style={{ marginTop: 32 }}>
          <b>Preview mode.</b>
          <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
            You're seeing the app shell without a database. Finish <code>SUPABASE_SETUP.md</code> to enable real accounts + data.
          </p>
        </div>
      )}
    </>
  );
}
