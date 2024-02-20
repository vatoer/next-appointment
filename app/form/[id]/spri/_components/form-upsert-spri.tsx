"use client";
import { spriSchema } from "@/lib/zod/spri";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createFilledFormSpri } from "../_actions";
import SpriForm from "./form-spri";

type TFormSpri = z.infer<typeof spriSchema>;
interface IFormUpsertSpriProps {
  bookedServiceId: string;
  spriData?: TFormSpri;
}
const FormUpsertSpri = ({
  bookedServiceId,
  spriData,
}: IFormUpsertSpriProps) => {
  const router = useRouter();
  const onSubmit = async (data: TFormSpri) => {
    const filledForm = await createFilledFormSpri(data, bookedServiceId);
    if (filledForm.errors) {
      console.log(filledForm.errors);
      return;
    }

    //console.log(filledForm.payload.data);
    toast.success("Form berhasil disimpan");
    router.push(`/form/${bookedServiceId}`);
  };

  return (
    <div>
      <SpriForm
        bookedServiceId={bookedServiceId}
        spriData={spriData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FormUpsertSpri;
