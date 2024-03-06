import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { dbAuth } from "@/lib/db-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(dbAuth),
  session: { strategy: "jwt" },
  ...authConfig,
});
