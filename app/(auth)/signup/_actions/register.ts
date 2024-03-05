"use server";
import * as z from "zod";

import { Prisma } from "@/prisma/db-auth/generated/client";
import { DEFAULT_ROUTE_AFTER_LOGIN } from "@/routes";
import { AuthError } from "next-auth";
import { userCreate } from "../../_data/user";
import { RegisterSchema } from "../_schema/register";
type TRegister = z.infer<typeof RegisterSchema>;

export const register = async (data: TRegister) => {
  console.log(data);
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid data", data: validateFields.error };
  }

  const { email, password } = validateFields.data;

  const newUser = await userCreate(data);
  if (newUser instanceof Prisma.PrismaClientKnownRequestError) {
    return { error: "Email already exists" };
  }

  if (newUser instanceof Error) {
    return { error: "Unknown error" };
  }

  return { user: newUser };

  // try {
  //   const newUser = await userCreate(data);
  //   return { user: newUser };
  // } catch (error) {
  //   console.log("[error userCreate]", Object.prototype.toString.call(error));
  //   if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //     return { error: "Email already exists" };
  //   }
  //   return { error: "Unknown error" };
  // }
};
