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
  if ("error" in newUser) {
    return { error: newUser.error };
  }

  delete (newUser as any).password;
  return { user: newUser };
};
