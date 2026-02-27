import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://e-shopping-lemon.vercel.app",
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
} = authClient;

// Helper type for session with role
export type SessionWithRole = {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: string;
      createdAt: Date;
      updatedAt: Date;
      emailVerified: boolean;
    };
  } | null;
};
