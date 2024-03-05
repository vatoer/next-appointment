import { dbAuth } from "@/lib/db-auth";
import bcrypt from "bcryptjs";
import { TRegister } from "../signup/_schema/register";

export const getUserByEmail = async (email: string) => {
  const user = await dbAuth.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const userCreate = async (data: TRegister) => {
  try {
    const password = await bcrypt.hash(data.password, 10);
    const user = await dbAuth.user.create({
      data: {
        email: data.email,
        name: data.name,
        password,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};
