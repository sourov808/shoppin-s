"use server";

import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { cookies } from "next/headers";

export interface AuthActionResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

/**
 * Sign out action
 * Redirects to /login after successful sign out
 * @returns AuthActionResponse
 */
export async function signOutAction(): Promise<AuthActionResponse> {
  try {
    const headersList = await headers();
    // Use the server-side auth API to sign out
    await auth.api.signOut({
      headers: headersList,
    });

    // Clear any remaining cookies
    const cookieStore = await cookies();
    cookieStore.delete("better-auth.session_token");

    revalidatePath("/", "layout");
    redirect("/");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to sign out";
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Get current user session with role information
 * @returns Session data with user role or null
 */
export async function getCurrentSession() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (!session?.user?.id) {
      return null;
    }

    // Fetch user from database to get the role
    const db = await import("@/lib/db").then(m => m.db);
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...session,
      user: {
        ...session.user,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Check if current user is admin
 * @returns boolean
 */
export async function isAdminUser(): Promise<boolean> {
  const session = await getCurrentSession();
  const userRole = (session?.user as { role?: string })?.role;
  return userRole === "ADMIN";
}

/**
 * Require admin access - redirect non-admins to user dashboard
 */
export async function requireAdmin() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role;
  if (userRole !== "ADMIN") {
    redirect("/account");
  }

  return session;
}

/**
 * Require user access - redirect admins to admin dashboard
 */
export async function requireUser() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role;
  if (userRole === "ADMIN") {
    redirect("/admin");
  }

  return session;
}
