import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { AccountSidebar } from "@/components/dashboard/account-sidebar";
import { AccountMobileNav } from "@/components/dashboard/account-mobile-nav";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch user from database to get the role
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    }
  });

  if (!user) {
    redirect("/login");
  }

  // Redirect admin users to admin dashboard
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="flex flex-col lg:flex-row flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 gap-8">
      {/* Search Sidebar on lg */}
      <AccountSidebar user={user} />

      {/* Main content w/ mobile nav */}
      <main className="flex-1 flex flex-col gap-6 min-w-0">
        <AccountMobileNav />
        {children}
      </main>
    </div>
  );
}
