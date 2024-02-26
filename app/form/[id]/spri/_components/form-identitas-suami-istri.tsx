import InputDatePicker from "@/components/date-picker/input-date-picker";
import FormRow from "@/components/form-row";
import InputForm from "@/components/input-form";
import { Separator } from "@/components/ui/separator";
import { spriSchema } from "@/lib/zod/spri";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from "zod";

type TFormData = z.infer<typeof spriSchema>;

interface IFormIdentitasSuamiIstriProps {
  statusSipil: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<TFormData>;
}
const FormIdentitasSuamiIstri = ({
  statusSipil,
  register,
  setValue,
  errors,
}: IFormIdentitasSuamiIstriProps) => {
  if (statusSipil !== "1") {
    return null;
  }
  return (
    <>
      <Separator />
      <h1 className="text-md font-semibold">Identitas Suami/istri</h1>
      <FormRow>
        <InputForm
          label="Nama Suami/Istri"
          register={register}
          name="suamiIstriNama"
          error={errors.suamiIstriNama}
          className="md:w-2/3"
        />
        <InputForm
          label="Kewarganegaraan"
          register={register}
          name="suamiIstriKewarganegaraan"
          error={errors.suamiIstriKewarganegaraan}
          className="md:w-1/3"
        />
      </FormRow>
      <FormRow>
        <InputForm
          label="Tempat Lahir"
          register={register}
          name="suamiIstriTempatLahir"
          error={errors.suamiIstriTempatLahir}
          className="md:w-2/3"
        />
        <InputDatePicker
          label="Tanggal Lahir"
          register={register}
          setValue={setValue}
          name="suamiIstriTanggalLahir"
          error={errors.suamiIstriTanggalLahir}
          className="md:w-1/3"
        />
      </FormRow>
      <FormRow>
        <InputForm
          label="Alamat"
          register={register}
          name="suamiIstriAlamat"
          error={errors.suamiIstriAlamat}
        />
      </FormRow>
    </>
  );
};

export default FormIdentitasSuamiIstri;
