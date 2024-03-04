"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { Prisma, StepName } from "@/prisma/db-appointment/generated/client";

export interface IReturnAction<TData> {
  type: string;
  payload: { data?: TData | undefined };
  errors: string | false | Array<string> | undefined;
}

export const scheduleAppointment = async (
  bookedServiceId: string,
  date: Date
) => {
  //TODO check user dll

  console.log("bookedServiceId", bookedServiceId);

  try {
    const appointmentDate = await dbAppointment.bookedService.update({
      where: { id: bookedServiceId },
      data: {
        appointmentDate: date,
        status: StepName.VISIT, // next step is visit
        updatedAt: new Date(),
      },
    });

    return {
      type: "SCHEDULE_APPOINTMENT",
      payload: { data: appointmentDate },
      errors: false,
    };
  } catch (error) {
    let errors: string | Array<string> | undefined = "UNKNOWN_ERROR";
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
      errors = error.message;
    }
    return {
      type: "SCHEDULE_APPOINTMENT",
      payload: { data: undefined },
      errors,
    };
  }
};
