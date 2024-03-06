import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "./_data/user";
import { LoginSchema } from "./signin/_schema/login";

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
            return null;
          }

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
