import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: "https://e-shopping-lemon.vercel.app",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  trustedOrigins: [
    "http://localhost:3000",
    "https://e-shopping-lemon.vercel.app",
  ],
});
