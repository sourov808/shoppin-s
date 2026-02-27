import { getCurrentSession } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

/**
 * Dashboard redirect page
 * Redirects users based on their role:
 * - ADMIN -> /admin
 * - USER -> /account
 */
export default async function DashboardRedirectPage() {
  const session = await getCurrentSession();
  
  if (!session?.user) {
    redirect("/login");
  }
  
  const userRole = (session.user as { role?: string }).role;
  
  if (userRole === "ADMIN") {
    redirect("/admin");
  }
  
  redirect("/account");
}
