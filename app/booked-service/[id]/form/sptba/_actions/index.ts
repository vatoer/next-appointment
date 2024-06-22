"use server";
import { fillForm } from "@/app/booked-service/[id]/form/_actions";
import { dbAppointment } from "@/lib/db-appointment";
import { sptbaSchema } from "@/lib/zod/sptba";
import { Prisma } from "@prisma-appointmendDb/client";
import { revalidatePath } from "next/cache";

import { z } from "zod";

type TFormData = z.infer<typeof sptbaSchema>;

export const createFilledFormSptba = async (
  data: TFormData,
  bookedServiceId: string
) => {
  // remove unnecessary data
  const currentDate = new Date();
  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate()
  );

  data.alasanKeterlambatan =
    data.pasporBerlakuHingga < threeMonthsAgo
      ? data.alasanKeterlambatan
      : undefined;

  const filledForm = await fillForm<TFormData>("sptba", data, bookedServiceId);
  revalidatePath(`/form/${bookedServiceId}`);
  return filledForm;
};
