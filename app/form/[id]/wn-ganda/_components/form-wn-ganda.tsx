"use client";
import InputDatePicker from "@/components/date-picker/input-date-picker";
import Form from "@/components/form";
import FormRow from "@/components/form-row";
import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDate, getDay, getMonth, getYear } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

interface IWnGandaFormProps {
  bookedServiceId: string;
  defaultValues?: TFormWnGanda;
  onSubmit: (data: TFormWnGanda) => void;
}

const WnGandaForm = ({
  bookedServiceId,
  defaultValues,
  onSubmit,
}: IWnGandaFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormWnGanda>({
    resolver: zodResolver(wnGandaSchema),
    defaultValues,
    mode: "all",
  });

  const today = new Date();

  return (
    <Form
      title="Formulir Pendaftaran untuk mendapatkan Fasilitas Keimigrasian sebagai WNI yang berkewarganegaraan ganda hingga 18 tahun"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow>
        <InputForm
          name="namaLengkap"
          type="text"
          label="Nama Lengkap Anak"
          error={errors.namaLengkap}
          register={register}
          className="md:w-2/3"
        />
        <InputForm
          name="nomorPaspor"
          type="text"
          label="Nomor Paspor"
          error={errors.nomorPaspor}
          register={register}
          className="md:w-1/3"
        />
      </FormRow>
      <FormRow>
        <InputForm
          label="Tempat Lahir"
          register={register}
          name="tempatLahir"
          error={errors.tempatLahir}
          className="md:w-1/2"
        />
        <InputDatePicker
          label="Tanggal Lahir"
          register={register}
          setValue={setValue}
          name="tanggalLahir"
          error={errors.tanggalLahir}
          className="md:w-1/4"
          calendarOptions={{
            fromDate: new Date(
              getYear(today) - 18,
              getMonth(today),
              getDate(today)
            ),
            toDate: today,
          }}
        />
        <SelectForm
          label="Jenis Kelamin"
          name="jenisKelamin"
          error={errors.jenisKelamin}
          register={register}
          className="md:w-1/4"
        >
          <option value="0">Pilih Jenis Kelamin</option>
          <option value="1">Laki-laki</option>
          <option value="2">Perempuan</option>
        </SelectForm>
      </FormRow>
      <FormRow>
        <InputForm
          label="Alamat"
          register={register}
          name="alamat"
          error={errors.alamat}
        />
      </FormRow>
      <Separator />
      <FormRow>
        <InputForm
          label="Nama Ibu"
          register={register}
          name="ibuNama"
          error={errors.ibuNama}
          className="md:w-1/2"
        />
        <InputForm
          label="Kewarganegaraan Ibu"
          register={register}
          name="ibuKewarganegaraan"
          error={errors.ibuKewarganegaraan}
          className="md:w-1/2"
        />
      </FormRow>
      <FormRow>
        <InputForm
          label="Nama Ayah"
          register={register}
          name="ayahNama"
          error={errors.ayahNama}
          className="md:w-1/2"
        />
        <InputForm
          label="Kewarganegaraan Ayah"
          register={register}
          name="ayahKewarganegaraan"
          error={errors.ayahKewarganegaraan}
          className="md:w-1/2"
        />
      </FormRow>
      <FormRow>
        <SelectForm
          label="Status Perkawinan Orang Tua"
          name="ortuStatusPerkawinan"
          error={errors.ortuStatusPerkawinan}
          register={register}
          className="md:w-1/2"
        >
          <option value="0">Pilih Status Perkawinan</option>
          <option value="1">Kawin</option>
          <option value="2">Belum Kawin</option>
          <option value="3">Cerai Mati</option>
          <option value="4">Cerai Hidup</option>
        </SelectForm>
      </FormRow>
      <div className="p-2">
        <Button type="submit" className=" w-full py-6 mt-6 ">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default WnGandaForm;
