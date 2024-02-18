"use server";
import { fillForm } from "@/app/form/_actions";
import { spriSchema } from "@/lib/zod/spri";
import { z } from "zod";

type TFormData = z.infer<typeof spriSchema>;

interface IReturnAction<T> {
  type: string;
  payload: { data: T };
  errors: string | false | Array<string>;
}

const createSpri = async (data: TFormData, bookedServiceId: string) => {
  const filledForm = await fillForm<TFormData>("spri", data, bookedServiceId);
  return filledForm;
};

const updateSpri = async (data: TFormData) => {
  return {
    type: "SPRI_UPDATE",
    payload: {
      data,
    },
  };
};

export { createSpri, updateSpri };
