"use client";

import { sptbaSchema } from "@/lib/zod/sptba";
import { toast } from "sonner";
import { z } from "zod";
import { createFilledFormSptba } from "../_actions";
import SptbaForm from "./form-sptba";

type TFormsptba = z.infer<typeof sptbaSchema>;

interface IFormUpsertSptbaProps {
  bookedServiceId: string;
  sptbaData?: TFormsptba;
}

const FormUpsertSptba = ({
  bookedServiceId,
  sptbaData,
}: IFormUpsertSptbaProps) => {
  const onSubmit = async (data: TFormsptba) => {
    const filledForm = await createFilledFormSptba(data, bookedServiceId);
    if (filledForm.errors) {
      console.log(filledForm.errors);
      return;
    }

    console.log(filledForm.payload.data);
    toast.success("Form berhasil disimpan");
  };

  return (
    <div>
      <SptbaForm
        bookedServiceId={bookedServiceId}
        defaultValues={sptbaData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FormUpsertSptba;
