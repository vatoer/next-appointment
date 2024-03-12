"use server";
import { auth } from "@/app/(auth)/auth";
import { dbAppointment } from "@/lib/db-appointment";
import { Prisma, StepName } from "@/prisma/db-appointment/generated/client";

export interface IBookServiceParams {
  serviceId: string;
}

export const bookService = async (serviceId: string) => {
  console.log("Book Service");
  const session = await auth();
  const user = session?.user;
  console.log("User", user);

  if (!user?.id) {
    return {
      type: "CREATE_BOOKING",
      payload: {},
      errors: "UNAUTHORIZED",
    };
  }
  try {
    const bookedService = await dbAppointment.bookedService.create({
      data: {
        serviceId,
        createdBy: user.id,
        status: StepName.FORM_FILLING,
      },
    });

    const formToFill = await dbAppointment.serviceForm.findMany({
      where: {
        serviceId,
      },
      orderBy: {
        formOrder: "asc",
      },
      select: {
        formId: true,
      },
    });

    return {
      type: "CREATE_BOOKING",
      payload: {
        data: bookedService,
        formToFill,
      },
      errors: false,
    };
  } catch (error) {
    console.log(error);
    let errorCode = "UNKNOWN_ERROR";
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      //errorMessage = error.message;
      errorCode = error.code;
    }

    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log(error);
      errorCode = "URE001";
    }

    return {
      type: "CREATE_BOOKING",
      payload: {},
      errors: errorCode,
    };
  }
};
