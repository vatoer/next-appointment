"use server";
import { getFilledForm } from "@/data/booked-service";
import { calculateTotalForms } from "@/data/filledForm";
import { dbAppointment } from "@/lib/db-appointment";
import { spriSchema } from "@/lib/zod/spri";
import { sptbaSchema } from "@/lib/zod/sptba";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { FilledForm, FormStatus, StepName } from "@prisma-appointmendDb/client";
import { revalidatePath } from "next/cache";
import { ZodIssue, z } from "zod";

type TSpri = z.infer<typeof spriSchema>;
type TWnGanda = z.infer<typeof wnGandaSchema>;

export type TInput = TSpri | TWnGanda;

export interface IReturnAction<TData> {
  type: string;
  payload: { data?: TData | undefined };
  errors: ZodIssue[] | string | false | Array<string> | undefined;
  prev?: string;
  next?: string;
}

type formOptions = "spri" | "wn-ganda" | "sptba";

export const fillForm = async <TInput>(
  formId: formOptions,
  input: TInput,
  bookedServiceId: string
): Promise<IReturnAction<FilledForm | undefined>> => {
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
    case "sptba":
      parsedData = await sptbaSchema.spa(input);
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

  // check if the form is already confirmed
  const filledForm = await getFilledForm(bookedServiceId, formId);
  if (filledForm?.status == FormStatus.CONFIRMED) {
    return {
      type: formId,
      payload: {
        data: filledForm,
      },
      errors: "Form has been confirmed",
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
        status: FormStatus.DRAFT,
        createdBy: "metoo",
      },
      update: {
        formDataJson: parsedData.data,
        status: FormStatus.DRAFT,
      },
    });

    /**
     * Check if all forms are filled
     * if all forms are filled, update bookedService status to FORM_CONFIRMATION
     */

    if (filledForm) {
      const { filled, totalForms } = await calculateTotalForms(bookedServiceId);
      if (filled.toString() == totalForms.toString()) {
        const updatedBookedService = await dbAppointment.bookedService.update({
          where: {
            id: bookedServiceId,
          },
          data: {
            status: StepName.FORM_CONFIRMATION,
          },
        });
      } else {
        //do not update bookedService status
      }
    }

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
      payload: {
        data: undefined,
      },
      errors: "Failed to create filled form",
    };
  }
};

export const confirmFilledForms = async (bookedServiceId: string) => {
  //TODO implement user authentication
  //TODO check if all required forms are filled
  try {
    let filledForms;

    const transaction = await dbAppointment.$transaction([
      dbAppointment.filledForm.updateMany({
        where: {
          bookedServiceId: bookedServiceId,
        },
        data: {
          status: FormStatus.CONFIRMED,
        },
      }),
      dbAppointment.bookedService.update({
        where: {
          id: bookedServiceId,
        },
        data: {
          status: StepName.DOCUMENT_UPLOAD, // next step will be appointment
        },
      }),
    ]);

    revalidatePath(`.`);
    return {
      type: "CONFIRM_FORMS_FOR_SERVICE",
      payload: {
        data: transaction,
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
