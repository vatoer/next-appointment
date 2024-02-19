"use server";
import { fillForm } from "@/app/form/_actions";
import { StatusSipil, spriSchema } from "@/lib/zod/spri";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type TFormData = z.infer<typeof spriSchema>;

interface IReturnAction<T> {
  type: string;
  payload: { data: T };
  errors: string | false | Array<string>;
}

const createSpri = async (data: TFormData, bookedServiceId: string) => {
  // remove unnecessary data
  if (data.jenisPermohonan.charAt(0) === "C") {
    delete data.perubahanNama;
    delete data.perubahanAlamat;
    delete data.perubahanTelp;
  }

  if (data.statusSipil !== StatusSipil.KAWIN) {
    delete data.suamiIstriNama;
    delete data.suamiIstriTempatLahir;
    delete data.suamiIstriTanggalLahir;
    delete data.suamiIstriAlamat;
    delete data.suamiIstriKewarganegaraan;
  }

  const filledForm = await fillForm<TFormData>("spri", data, bookedServiceId);
  revalidatePath(`/form/${bookedServiceId}`);
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
