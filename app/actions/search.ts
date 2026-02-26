"use server";

import { db } from "@/lib/db";

export async function searchProducts(query: string) {
  if (!query || query.trim() === "") {
    return [];
  }

  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Failed to search products:", error);
    return [];
  }
}
