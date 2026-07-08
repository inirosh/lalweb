import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { createSupabaseServer } from "@/lib/supabase/serverClient";

// Wraps all logged-in admin pages with the sidebar shell.
// Double-checks the login on the server (middleware also protects this).
export default async function PanelLayout({ children }) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return <AdminShell email={user.email}>{children}</AdminShell>;
}
