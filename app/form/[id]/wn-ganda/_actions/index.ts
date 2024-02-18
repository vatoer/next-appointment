"use server";
import { fillForm } from "@/app/form/_actions";
import { dbAppointment } from "@/lib/db-appointment";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { Prisma } from "@/prisma/db-appointment/generated/client";

import { z } from "zod";

type TFormData = z.infer<typeof wnGandaSchema>;

export const createFilledFormWnGanda = async (
  data: TFormData,
  bookedServiceId: string
) => {
  const filledForm = await fillForm<TFormData>(
    "wn-ganda",
    data,
    bookedServiceId
  );
  return filledForm;
};
