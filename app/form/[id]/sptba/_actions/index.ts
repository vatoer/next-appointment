"use server";
import { fillForm } from "@/app/form/_actions";
import { dbAppointment } from "@/lib/db-appointment";
import { sptbaSchema } from "@/lib/zod/sptba";
import { Prisma } from "@/prisma/db-appointment/generated/client";
import { revalidatePath } from "next/cache";

import { z } from "zod";

type TFormData = z.infer<typeof sptbaSchema>;

export const createFilledFormSptba = async (
  data: TFormData,
  bookedServiceId: string
) => {
  const filledForm = await fillForm<TFormData>("sptba", data, bookedServiceId);
  revalidatePath(`/form/${bookedServiceId}`);
  return filledForm;
};
