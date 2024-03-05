/**
 * An array of public routes.
 * These routes are accessible to all users.
 *
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are use for authentication.
 *
 * @type {string[]}
 */
export const authRoutes: string[] = ["/signin", "/signup"];

/**
 * The prefix for the API routes.
 * This is route will always open to the public because it is used for authentication.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default route for the application after a user logs in.
 * @type {string}
 */
export const DEFAULT_ROUTE_AFTER_LOGIN: string = "/settings";
