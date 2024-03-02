"use server";
import { fillForm } from "@/app/form/_actions";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { revalidatePath } from "next/cache";

import { z } from "zod";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

export const createFilledFormWnGanda = async (
  data: TFormWnGanda,
  bookedServiceId: string
) => {
  const filledForm = await fillForm<TFormWnGanda>(
    "wn-ganda",
    data,
    bookedServiceId
  );
  revalidatePath(`/form/${bookedServiceId}`);
  return filledForm;
};
