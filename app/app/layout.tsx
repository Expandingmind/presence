import { redirect } from "next/navigation";
import { supabaseServer, isSupabaseConfigured } from "@/lib/supabase/server";
import AppNav from "./_components/app-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let email: string | null = null;
  const configured = isSupabaseConfigured();

  if (configured) {
    const supabase = await supabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login?next=/app");
    email = user.email ?? null;
  }

  return (
    <div className="app-shell">
      <AppNav email={email} configured={configured} />
      <main className="app-main">{children}</main>
    </div>
  );
}
