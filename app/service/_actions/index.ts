"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { Prisma } from "@/prisma/db-appointment/generated/client";

export const bookService = async () => {
  console.log("Book Service");
  try {
    const bookedService = await dbAppointment.bookedService.create({
      data: {
        serviceId: "wn-ganda",
        createdBy: "tes",
      },
    });

    const formToFill = await dbAppointment.formsForService.findMany({
      where: {
        serviceId: "wn-ganda",
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
