import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "https://e-shopping-lemon.vercel.app",
  ],
});
