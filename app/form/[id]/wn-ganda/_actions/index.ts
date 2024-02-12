"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { Prisma } from "@/prisma/db-appointment/generated/client";

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

  try {
    const filledForm = await dbAppointment.filledForm.create({
      data: {
        formId: "wn-ganda",
        formDataJson: data,
        createdBy: "tes",
      },
    });

    return {
      type: "WNGANDA_CREATE",
      payload: {
        data: filledForm,
      },
      errors: false,
    };
  } catch (error) {
    //every time we change this code, we must re run pnpm dev
    // todo create codesanbox untuk ditanyain ke forum
    let errorCode;
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
      type: "WNGANDA_CREATE",
      payload: {
        data: {
          data,
        },
      },
      errors: errorCode,
    };
  }
};
