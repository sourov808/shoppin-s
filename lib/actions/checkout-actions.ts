"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreateOrderInput {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  userId?: string;
}

export async function createOrder(input: CreateOrderInput) {
  try {
    const shippingAddress = `${input.firstName} ${input.lastName}, ${input.address}${input.apartment ? ', ' + input.apartment : ''}, ${input.city}, ${input.state} ${input.zipCode}, ${input.country}`;

    const order = await db.order.create({
      data: {
        userId: input.userId,
        email: input.email,
        phone: input.phone,
        shippingAddress,
        billingAddress: shippingAddress,
        totalAmount: input.totalAmount,
        shippingCost: input.shippingCost,
        taxAmount: input.taxAmount,
        status: "PENDING",
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    for (const item of input.items) {
      await db.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    revalidatePath("/admin/orders");
    revalidatePath("/account/orders");

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}
