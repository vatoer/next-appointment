import {
  DEFAULT_ROUTE_AFTER_LOGIN,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";
import authConfig from "./app/(auth)/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // console.log("[MIDDLEWARE]", req.nextUrl.pathname);
  // console.log("[IS LOGGED IN]", isLoggenIn);

  const { nextUrl } = req;
  const isLoggenIn = !!req.auth;

  console.log("[MIDDLEWARE]", nextUrl.pathname);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggenIn) {
      return Response.redirect(new URL(DEFAULT_ROUTE_AFTER_LOGIN, nextUrl));
    }
    return;
  }

  if (!isLoggenIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
