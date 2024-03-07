import { StepName } from "./prisma/db-appointment/generated/client";

/**
 * An array of public routes.
 * These routes are accessible to all users.
 *
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/service"];

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

export const ROUTE_BOOKED_SERVICE = "/booked-service";

export const bookedServiceStatusToRoute = (id: string, status: StepName) => {
  const base = ROUTE_BOOKED_SERVICE + `/` + id + `/`;
  switch (status) {
    case StepName.FORM_FILLING:
      return base + "form";
    case StepName.FORM_CONFIRMATION:
      return base + "form";
    case StepName.APPOINTMENT:
      return base + "appointment";
    case StepName.DOCUMENT_UPLOAD:
      return base + "upload";
    case StepName.PAYMENT:
      return base + "payment";
    case StepName.VISIT:
      return base + "visit";
    case StepName.COMPLETED:
      return base + "completed";
    default:
      return "/service";
  }
};
