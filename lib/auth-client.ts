import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  fetchOptions: {
    onSuccess(context) {
      // Update session headers when auth succeeds
      const authHeader = context.response.headers.get("set-cookie");
      if (authHeader) {
        window.location.reload();
      }
    },
  },
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
