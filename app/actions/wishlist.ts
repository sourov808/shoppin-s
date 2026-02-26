"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(productId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    const existingItem = await db.savedItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existingItem) {
      // Remove from wishlist
      await db.savedItem.delete({
        where: { id: existingItem.id }
      });
      revalidatePath("/account/wishlist");
      revalidatePath("/products");
      revalidatePath("/");
      return { success: true, isHearted: false };
    } else {
      // Add to wishlist
      await db.savedItem.create({
        data: {
          userId,
          productId
        }
      });
      revalidatePath("/account/wishlist");
      revalidatePath("/products");
      revalidatePath("/");
      return { success: true, isHearted: true };
    }
  } catch (error) {
    console.error("Failed to toggle wishlist item:", error);
    return { error: "Failed to update wishlist. Please try again." };
  }
}
