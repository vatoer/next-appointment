"use server";
import { spriSchema } from "@/lib/zod/spri";
import { z } from "zod";

type TFormData = z.infer<typeof spriSchema>;

const createSpri = async (data: TFormData) => {
  const parse = await spriSchema.spa(data);
  console.log(parse);
  return {
    type: "SPRI_CREATE",
    payload: {
      data: {
        data,
        parse: JSON.stringify(parse),
      },
    },
  };
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
