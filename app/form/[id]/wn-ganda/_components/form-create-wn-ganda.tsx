"use client";

import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";
import { createFilledFormWnGanda } from "../_actions";
import WnGandaForm from "./form-wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

const FormCreateWnGanda = () => {
  const onSubmit = async (data: TFormWnGanda) => {
    const post = await createFilledFormWnGanda(data);
    console.log(post);
  };

  return (
    <div>
      <WnGandaForm onSubmit={onSubmit} />
    </div>
  );
};

export default FormCreateWnGanda;
