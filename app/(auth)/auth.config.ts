import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { dbAppointment } from "@/lib/db-appointment";
import { getUserByEmail } from "./_data/user";
import { LoginSchema } from "./signin/_schema/login";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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

          //return user;
          return {
            ...user,
            perwakilan: "perwakilan", // bagaimana cara mendapatkan perwakilan dari user?
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user || !account) {
        throw new Error("Invalid sign in");
      }

      if (account.provider === "google" && profile) {
        const { name, email, image } = profile;
        if (!email || !name) {
          throw new Error("Google account missing email");
        }
        const img = (image as string) ?? "no-image.png";
        const gUser = await dbAppointment.user.upsert({
          where: {
            email,
          },
          create: {
            email,
            name,
            image: img,
            updatedAt: new Date(),
          },
          update: {
            name: profile.name,
          },
        });
        user.id = gUser.id;
        //user.perwakilan = "perwakilan google"; // bagaimana cara set mendapatkan perwakilan klo login dari google?
        //console.log("user", user);
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      //console.log("session", session);
      //console.log("token", token);
      session.user.id = token.sub as string;
      session.user.perwakilan = token.perwakilan as string;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      //console.log("[jwt] token", token);
      //console.log("[jwt] account", account);
      if (user) {
        //token.id = user.id;
        token.perwakilan = user.perwakilan;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
