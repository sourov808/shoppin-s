import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://e-shopping-lemon.vercel.app",
});

export const {
  useSession,
  signIn,
  signOut,
  signUp,
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
