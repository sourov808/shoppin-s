/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/products"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users based on their role
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/signup"
];

/**
 * An array of routes that are restricted to admin users only
 * Regular users will be redirected to /account
 * @type {string[]}
 */
export const adminRoutes = [
  "/admin",
  "/admin/analytics",
  "/admin/orders",
  "/admin/products"
];

/**
 * An array of routes that are restricted to regular users only
 * Admin users will be redirected to /admin
 * @type {string[]}
 */
export const userRoutes = [
  "/account",
  "/account/orders",
  "/account/wishlist",
  "/checkout",
  "/onboarding",
  "/cart"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * Regular users -> /account
 * Admin users -> /admin
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/account";
export const ADMIN_LOGIN_REDIRECT = "/admin";
