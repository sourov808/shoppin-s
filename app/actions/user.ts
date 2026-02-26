"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserAddress(data: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    // Check if user already has an address
    const existingAddress = await db.address.findFirst({
      where: { userId }
    });

    if (existingAddress) {
      // Update existing
      await db.address.update({
        where: { id: existingAddress.id },
        data: {
          ...data,
          isDefault: true // Ensure it's marked as default
        }
      });
    } else {
      // Create new
      await db.address.create({
        data: {
          ...data,
          userId,
          isDefault: true
        }
      });
    }

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Failed to update address:", error);
    return { error: "Failed to update address. Please try again." };
  }
}

export async function updateUserProfile(data: {
  name: string;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name
      }
    });

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile. Please try again." };
  }
}
