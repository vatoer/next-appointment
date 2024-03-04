"use server";

import { IReturnAction } from "@/app/booked-service/[id]/form/_actions";
import { dbAppointment } from "@/lib/db-appointment";
import { FilledForm } from "@/prisma/db-appointment/generated/client";
import { revalidatePath } from "next/cache";

export const getFilledForms = async (bookedServiceId: string) => {
  const filledForms = await dbAppointment.service.findMany();
  return filledForms;
};

export const setStatusFilledForm = async (filledFormId: string) => {
  const filledForm = await dbAppointment.filledForm.update({
    where: {
      id: filledFormId,
    },
    data: {
      status: "FINAL",
    },
  });
  return filledForm;
};

export const setStatusAllFilledForm = async (
  bookedServiceId: string,
  status: "draft" | "final"
): Promise<IReturnAction<string>> => {
  //console.log(bookedServiceId);
  try {
    const filledForms = await dbAppointment.filledForm.updateMany({
      where: {
        bookedServiceId: bookedServiceId,
      },
      data: {
        status,
      },
    });
    revalidatePath(`/form/${bookedServiceId}/confirmation`);

    return {
      type: "filled-form",
      payload: { data: status },
      errors: false,
    };
  } catch (error) {
    return {
      type: "filled-form",
      payload: { data: undefined },
      errors: "error",
    };
  }
};
