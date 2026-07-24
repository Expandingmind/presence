"use client";
import { usePathname, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";

const LINKS = [
  { href: "/app", label: "Dashboard", icon: "◆" },
  { href: "/app/analyze", label: "Analyzer", icon: "▶" },
  { href: "/app/creators", label: "Creators", icon: "◎" },
  { href: "/app/ideas", label: "Ideas", icon: "✎" },
];

export default function AppNav({ email, configured }: { email: string | null; configured: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    if (!configured) return;
    await supabaseBrowser().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="app-nav">
      <a href="/app" className="brand" style={{ marginBottom: 28 }}>
        <span className="dot" /> Presence
      </a>
      <nav className="app-nav-list">
        {LINKS.map((l) => {
          const active = pathname === l.href || (l.href !== "/app" && pathname.startsWith(l.href));
          return (
            <a key={l.href} href={l.href} className={active ? "app-nav-link active" : "app-nav-link"}>
              <span className="app-nav-icon">{l.icon}</span>
              {l.label}
            </a>
          );
        })}
      </nav>
      <div className="app-nav-footer">
        {email && <div className="app-nav-email">{email}</div>}
        {configured ? (
          <button onClick={signOut} className="app-nav-signout">Sign out</button>
        ) : (
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Local preview mode</div>
        )}
      </div>
    </aside>
  );
}
