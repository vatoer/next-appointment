"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";

type TFormData = z.infer<typeof wnGandaSchema>;

export const createFilledFormWnGanda = async (data: TFormData) => {
  //data.ayahNama = "1";
  const parse = await wnGandaSchema.spa(data);

  if (parse.success === false) {
    return {
      type: "WNGANDA_CREATE",
      payload: {
        data: {
          data,
        },
      },
      errors: parse.error.issues,
    };
  }

  const filledForm = await dbAppointment.filledForm.createMany({
    data: [
      {
        formId: "wn-ganda",
        createdBy: "John Doe",
        formDataJson: data,
      },
    ],
  });

  return {
    type: "WNGANDA_CREATE",
    payload: {
      data: filledForm,
    },
  };
};
