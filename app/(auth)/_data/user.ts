import { dbAppointment as dbAuth } from "@/lib/db-appointment";
import { Prisma, User } from "@prisma-appointmendDb/client";
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

export const userCreate = async (
  data: TRegister
): Promise<User | { error: string }> => {
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
    // what object is error?
    //console.log("[error]", Object.prototype.toString.call(error));
    console.log("[error]", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //console.log(error.code);
      return { error: "Email already exists" };
    }

    return { error: "Unknown error" };
  }
};
