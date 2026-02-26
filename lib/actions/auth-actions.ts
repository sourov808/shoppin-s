"use server";

import { authClient } from "@/lib/auth-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface AuthActionResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

/**
 * Sign out action
 * @returns AuthActionResponse
 */
export async function signOutAction(): Promise<AuthActionResponse> {
  try {
    await authClient.signOut();
    revalidatePath("/", "layout");
    redirect("/login");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to sign out";
    return {
      success: false,
      error: message,
    };
  }
}
