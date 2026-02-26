import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, publicRoutes, apiAuthPrefix, adminRoutes, userRoutes } from "./routes";

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  // Skip Next.js internals, static files, and API auth routes
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionCookie;

  // Handle auth routes (login, signup)
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  if (isAuthRoute) {
    if (isAuthenticated) {
      // Redirect authenticated users to their dashboard
      // Role-based redirect will be handled server-side
      return NextResponse.redirect(new URL("/account", nextUrl));
    }
    return NextResponse.next();
  }

  // Handle admin routes - only check authentication, not role
  // Role checking happens server-side in the layout
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow request through - role check happens in server layout
    return NextResponse.next();
  }

  // Handle user/customer routes - only check authentication, not role
  // Role checking happens server-side in the layout
  const isUserRoute = userRoutes.some(route => pathname.startsWith(route));
  if (isUserRoute) {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to login
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // Allow request through - role check happens in server layout
    return NextResponse.next();
  }

  // Public routes - allow access to everyone
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
