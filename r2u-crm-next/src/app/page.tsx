import { redirect } from "next/navigation";

// Root route always resolves to the dashboard; auth guarding happens
// inside DashboardLayout/AuthContext (unauthenticated users are bounced
// to /login — wired up in Phase 2 alongside the Users/Auth module).
export default function RootPage() {
  redirect("/dashboard");
}
