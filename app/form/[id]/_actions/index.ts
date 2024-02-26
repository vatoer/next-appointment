"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { revalidatePath } from "next/cache";

export const confirmFilledForms = async (bookedServiceId: string) => {
  //TODO implement user authentication
  //TODO check if all required forms are filled
  try {
    const filledForms = await dbAppointment.filledForm.updateMany({
      where: {
        bookedServiceId: bookedServiceId,
      },
      data: {
        status: "final",
      },
    });
    revalidatePath(`/form/${bookedServiceId}`);
    return {
      type: "CONFIRM_FORMS_FOR_SERVICE",
      payload: {
        data: filledForms,
      },
      errors: false,
    };
  } catch (error) {
    console.log(error);
    return {
      type: "CONFIRM_FORMS_FOR_SERVICE",
      payload: {
        data: undefined,
      },
      errors: "Failed to confirm filled forms",
    };
  }

  return null;
};
