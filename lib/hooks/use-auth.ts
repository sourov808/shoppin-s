"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export type UserRole = "ADMIN" | "USER";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

export interface UseAuthReturn {
  session: any | null;
  user: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  signOut: () => Promise<void>;
}

/**
 * Custom hook for authentication with role-based access control
 * Provides session data, user role, and helper methods
 */
export function useAuth(): UseAuthReturn {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const session = data?.session ?? null;
  const user = (session as any)?.user ?? null;
  
  const userRole = user?.role as UserRole | undefined;

  const isAuthenticated = !!session;
  const isAdmin = userRole === "ADMIN";
  const isUser = userRole === "USER";

  const isLoading = isPending;

  const signOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return {
    session,
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isUser,
    signOut,
  };
}
