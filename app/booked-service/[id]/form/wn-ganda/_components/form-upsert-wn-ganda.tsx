"use client";

import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createFilledFormWnGanda } from "../_actions";
import WnGandaForm from "./form-wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

interface IFormUpsertWnGandaProps {
  bookedServiceId: string;
  wnGandaData?: TFormWnGanda;
}

const FormUpsertWnGanda = ({
  bookedServiceId,
  wnGandaData,
}: IFormUpsertWnGandaProps) => {
  const router = useRouter();
  const onSubmit = async (data: TFormWnGanda) => {
    const filledForm = await createFilledFormWnGanda(data, bookedServiceId);
    if (filledForm.errors) {
      console.log(filledForm.errors);
      return;
    }

    //console.log(filledForm.payload.data);
    toast.success("Form berhasil disimpan");
    router.push(`.`);
  };

  return (
    <div>
      <WnGandaForm
        bookedServiceId={bookedServiceId}
        defaultValues={wnGandaData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FormUpsertWnGanda;
