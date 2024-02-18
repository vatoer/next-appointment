"use server";
import { dbAppointment } from "@/lib/db-appointment";
import { spriSchema } from "@/lib/zod/spri";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { FilledForm } from "@/prisma/db-appointment/generated/client";
import { ZodIssue, z } from "zod";

type TSpri = z.infer<typeof spriSchema>;
type TWnGanda = z.infer<typeof wnGandaSchema>;

export type TInput = TSpri | TWnGanda;

interface IReturnAction<TData> {
  type: string;
  payload: { data?: TData | undefined };
  errors: ZodIssue[] | string | false | Array<string> | undefined;
  prev?: string;
  next?: string;
}

type formOptions = "spri" | "wn-ganda";

export const fillForm = async <TInput>(
  formId: formOptions,
  input: TInput,
  bookedServiceId: string
): Promise<IReturnAction<FilledForm>> => {
  let parsedData: {
    success: boolean;
    data?: any;
    error?: {
      errors: Array<ZodIssue>;
    };
  };

  switch (formId) {
    case "spri":
      parsedData = await spriSchema.spa(input);
      break;
    case "wn-ganda":
      parsedData = await wnGandaSchema.spa(input);
      break;
    default:
      throw new Error("Invalid formId");
      break;
  }

  if (!parsedData.success) {
    console.log(parsedData.error?.errors);
    return {
      type: formId,
      payload: { data: undefined },
      errors: parsedData.error?.errors,
    };
  }

  try {
    const filledForm = await dbAppointment.filledForm.upsert({
      where: {
        formId_bookedServiceId: {
          formId: formId,
          bookedServiceId: bookedServiceId,
        },
      },
      create: {
        formId: formId,
        formDataJson: parsedData.data,
        bookedServiceId: bookedServiceId,
        status: "draft",
        createdBy: "metoo",
      },
      update: {
        formDataJson: parsedData.data,
        status: "draft",
      },
    });
    return {
      type: formId,
      payload: {
        data: filledForm,
      },
      errors: false,
    };
  } catch (error) {
    console.log(error);
    return {
      type: formId,
      payload: {},
      errors: "Failed to create filled form",
    };
  }
};
