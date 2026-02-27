"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./auth-actions";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: "all" | "active" | "draft" | "out-of-stock";
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  category: string;
  images?: string[];
  isFeatured?: boolean;
  isArchived?: boolean;
  tags?: string[];
}

export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Get products with pagination, search, and filters
 */
export async function getProducts(filters: ProductFilters = {}) {
  await requireAdmin();

  const {
    page = 1,
    limit = 10,
    search,
    category,
    status,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: Record<string, unknown> = {};

  // Search filter
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Category filter
  if (category && category !== "all") {
    where.category = category;
  }

  // Status filter
  if (status && status !== "all") {
    switch (status) {
      case "active":
        where.isArchived = false;
        where.stock = { gt: 0 };
        break;
      case "draft":
        where.isArchived = true;
        break;
      case "out-of-stock":
        where.stock = 0;
        break;
    }
  }

  // Fetch products and total count
  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string) {
  await requireAdmin();

  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      orderItems: {
        take: 10,
        include: {
          order: {
            select: {
              id: true,
              status: true,
              createdAt: true,
            },
          },
        },
      },
    },
  });

  return product;
}

/**
 * Create a new product
 */
export async function createProduct(data: ProductFormData) {
  await requireAdmin();

  try {
    // Validate SKU uniqueness
    const existingProduct = await db.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingProduct) {
      return {
        success: false,
        error: "SKU already exists. Please use a unique SKU.",
      };
    }

    // Map category string to enum
    const categoryMap: Record<string, string> = {
      "electronics": "HEADPHONES",
      "headphones": "HEADPHONES",
      "speakers": "SPEAKERS",
      "accessories": "ACCESSORIES",
      "wearables": "WEARABLES",
      "smartphones": "SMARTPHONES",
      "tablets": "TABLETS",
      "fashion": "ACCESSORIES",
      "home-garden": "ACCESSORIES",
      "sports": "ACCESSORIES",
    };

    const productCategory = categoryMap[data.category.toLowerCase()] || "ACCESSORIES";

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        salePrice: data.salePrice || null,
        sku: data.sku,
        stock: data.stock,
        category: productCategory as any,
        images: data.images || [],
        isFeatured: data.isFeatured || false,
        isArchived: data.isArchived || false,
      },
    });

    revalidatePath("/admin/products");
    
    return {
      success: true,
      data: product,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(productId: string, data: Partial<ProductFormData>) {
  await requireAdmin();

  try {
    // Validate SKU uniqueness if changing SKU
    if (data.sku) {
      const existingProduct = await db.product.findFirst({
        where: {
          sku: data.sku,
          NOT: { id: productId },
        },
      });

      if (existingProduct) {
        return {
          success: false,
          error: "SKU already exists. Please use a unique SKU.",
        };
      }
    }

    // Map category string to enum if provided
    let updateData: Record<string, unknown> = { ...data };
    
    if (data.category) {
      const categoryMap: Record<string, string> = {
        "electronics": "HEADPHONES",
        "headphones": "HEADPHONES",
        "speakers": "SPEAKERS",
        "accessories": "ACCESSORIES",
        "wearables": "WEARABLES",
        "smartphones": "SMARTPHONES",
        "tablets": "TABLETS",
        "fashion": "ACCESSORIES",
        "home-garden": "ACCESSORIES",
        "sports": "ACCESSORIES",
      };
      updateData.category = categoryMap[data.category.toLowerCase()] || "ACCESSORIES";
    }

    const product = await db.product.update({
      where: { id: productId },
      data: updateData,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      data: product,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string) {
  await requireAdmin();

  try {
    await db.product.delete({
      where: { id: productId },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    };
  }
}

/**
 * Toggle product featured status
 */
export async function toggleProductFeatured(productId: string) {
  await requireAdmin();

  try {
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    await db.product.update({
      where: { id: productId },
      data: { isFeatured: !product.isFeatured },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}

/**
 * Toggle product archive status
 */
export async function toggleProductArchive(productId: string) {
  await requireAdmin();

  try {
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    await db.product.update({
      where: { id: productId },
      data: { isArchived: !product.isArchived },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error toggling archive status:", error);
    return {
      success: false,
      error: "Failed to update product",
    };
  }
}

/**
 * Upload product image
 */
export async function uploadProductImage(formData: FormData): Promise<UploadResponse> {
  await requireAdmin();

  try {
    const file = formData.get("image") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: "Invalid file type. Please upload JPEG, PNG, GIF, or WebP." };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: "File size exceeds 5MB limit." };
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "products");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `product-${timestamp}-${randomString}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return the URL path
    const url = `/uploads/products/${filename}`;

    return { success: true, url };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload image",
    };
  }
}

/**
 * Remove product image
 */
export async function removeProductImage(imagePath: string): Promise<UploadResponse> {
  await requireAdmin();

  try {
    // Note: In production, you might want to actually delete the file
    // For now, we just return success
    return { success: true };
  } catch (error) {
    console.error("Error removing image:", error);
    return {
      success: false,
      error: "Failed to remove image",
    };
  }
}

/**
 * Get product categories (from Prisma enum)
 */
export async function getProductCategories() {
  return [
    { value: "HEADPHONES", label: "Headphones" },
    { value: "SPEAKERS", label: "Speakers" },
    { value: "ACCESSORIES", label: "Accessories" },
    { value: "WEARABLES", label: "Wearables" },
    { value: "SMARTPHONES", label: "Smartphones" },
    { value: "TABLETS", label: "Tablets" },
  ];
}

/**
 * Export products to CSV
 */
export async function exportProductsToCSV(filters?: ProductFilters) {
  await requireAdmin();

  try {
    const { products } = await getProducts({ ...filters, limit: 10000 });

    const headers = [
      "ID",
      "Name",
      "SKU",
      "Category",
      "Price",
      "Sale Price",
      "Stock",
      "Status",
      "Featured",
      "Created At",
    ];

    const rows = products.map((product) => [
      product.id,
      `"${product.name.replace(/"/g, '""')}"`,
      product.sku,
      product.category,
      product.price,
      product.salePrice || "",
      product.stock,
      product.isArchived ? "Draft" : product.stock === 0 ? "Out of Stock" : "Active",
      product.isFeatured ? "Yes" : "No",
      product.createdAt.toISOString(),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    return {
      success: true,
      data: csv,
    };
  } catch (error) {
    console.error("Error exporting products:", error);
    return {
      success: false,
      error: "Failed to export products",
    };
  }
}
