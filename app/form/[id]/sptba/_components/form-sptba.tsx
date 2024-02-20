"use client";

import InputDatePicker from "@/components/date-picker.tsx/input-date-picker";
import FormRow from "@/components/form-row";
import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sptbaSchema } from "@/lib/zod/sptba";
import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TFormData = z.infer<typeof sptbaSchema>;

interface ISptbaFormProps {
  bookedServiceId: string;
  defaultValues?: TFormData;
  onSubmit: (data: TFormData) => void;
}
const SptbaForm = ({
  bookedServiceId,
  defaultValues,
  onSubmit,
}: ISptbaFormProps) => {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(sptbaSchema),
    defaultValues,
    mode: "all",
  });

  const [isTerlambat, setIsTerlambat] = useState(false);
  const [berlakuHingga, setBerlakuHingga] = useState<Date | null>(null);

  useEffect(() => {
    if (berlakuHingga) {
      const currentDate = new Date();
      const threeMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 3,
        currentDate.getDate()
      );

      if (berlakuHingga < threeMonthsAgo) {
        setIsTerlambat(true);
      } else {
        setIsTerlambat(false);
      }
    } else {
      setIsTerlambat(false);
    }
  }, [berlakuHingga]);

  return (
    <div className="py-10">
      <form
        className="flex flex-col gap-2 border shadow-lg p-6 rounded-md"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-semibold mb-4 w-full text-center">
          Formulir SURAT PERNYATAAN TIDAK BERKEWARGANEGARAAN ASING
        </h1>
        <Separator />

        <FormRow>
          <InputForm
            label="Nama Lengkap"
            register={register}
            name="namaLengkap"
            error={errors.namaLengkap}
            className="md:w-9/12"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Tempat Lahir"
            register={register}
            name="tempatLahir"
            error={errors.tempatLahir}
            className="md:w-1/3"
          />
          <InputDatePicker
            label="Tanggal Lahir"
            register={register}
            setValue={setValue}
            name="tanggalLahir"
            error={errors.tanggalLahir}
            className="md:w-1/4"
            calendarOptions={{
              fromDate: new Date(getYear(Date()) - 100, 1, 1),
              toDate: new Date(),
            }}
          />
          <SelectForm
            label="Jenis Kelamin"
            name="jenisKelamin"
            error={errors.jenisKelamin}
            register={register}
            className="md:w-3/12"
          >
            <option value="0">Pilih Jenis Kelamin</option>
            <option value="1">Laki-laki</option>
            <option value="2">Perempuan</option>
          </SelectForm>
          <InputForm
            label="Agama"
            register={register}
            name="agama"
            error={errors.agama}
            className="md:w-1/4"
          />
        </FormRow>

        <FormRow>
          <InputForm
            label="Alamat Tempat Tinggal di Luar Negeri"
            register={register}
            name="lnAlamat"
            error={errors.lnAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Pekerjaan"
            register={register}
            name="pekerjaan"
            error={errors.pekerjaan}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow title="Kontak Telepon/email">
          <InputForm
            label="Rumah"
            register={register}
            name="IndonesiaTelp"
            error={errors.IndonesiaTelp}
            className="md:w-1/4"
          />
          <InputForm
            label="Kantor"
            register={register}
            name="pekerjaanTelp"
            error={errors.pekerjaanTelp}
            className="md:w-1/4"
          />
          <InputForm
            label="Telepon Genggam"
            register={register}
            name="lnTelp"
            error={errors.lnTelp}
            className="md:w-1/4"
          />
          <InputForm
            label="Email"
            register={register}
            name="email"
            error={errors.email}
            className="md:w-1/4"
          />
        </FormRow>

        <FormRow title="Pemegang Paspor">
          <InputForm
            label="Paspor RI Nomor"
            register={register}
            name="pasporNomor"
            error={errors.pasporNomor}
            className="md:w-1/4"
            maxLength={16}
          />
          <InputForm
            label="Tempat dikeluarkan"
            register={register}
            name="pasporTempatDikeluarkan"
            error={errors.pasporTempatDikeluarkan}
            className="md:w-1/4"
          />
          <InputDatePicker
            fromDate={new Date(2000, 1, 1)}
            label="Tanggal dikeluarkan"
            register={register}
            setValue={setValue}
            name="pasporTanggalDikeluarkan"
            error={errors.pasporTanggalDikeluarkan}
            className="md:w-1/4"
            calendarOptions={{
              fromDate: new Date(1945, 1, 1),
              toDate: new Date(),
            }}
          />
          <InputDatePicker
            fromDate={new Date(2000, 1, 1)}
            label="Berlaku hingga tanggal"
            register={register}
            setValue={setValue}
            name="pasporBerlakuHingga"
            error={errors.pasporBerlakuHingga}
            className="md:w-1/4"
            calendarOptions={{
              fromDate: new Date(getYear(Date()) - 25, 1, 1),
              toDate: new Date(getYear(Date()) + 10, 1, 1),
            }}
            onSelect={(date) => {
              setBerlakuHingga(date);
            }}
          />
        </FormRow>
        <FormRow title="Visa">
          <InputForm
            label="Status Visa"
            register={register}
            name="visaStatus"
            error={errors.visaStatus}
            className="md:w-1/2"
          />
          <InputForm
            label="Nomor Izin Tetap"
            register={register}
            name="permanentResidentNomor"
            error={errors.permanentResidentNomor}
            className="md:w-1/2"
          />
        </FormRow>

        {isTerlambat && (
          <FormRow
            title="Bagi paspor yang masa berlakunya telah habis lebih dari 3 (tiga) bulan, agar memberikan penjelasan
alasan keterlambatan pengajuan penggantian paspor baru"
          >
            <InputForm
              label="Alasan Keterlambatan"
              register={register}
              name="alasanKeterlambatan"
              error={errors.alasanKeterlambatan}
              className="w-full"
            />
          </FormRow>
        )}

        <FormRow>
          <Button
            className=" w-full py-6 mt-6 "
            disabled={isSubmitting}
            type="submit"
          >
            Simpan dan Lanjutkan
            {isSubmitting && (
              <Loader className="ml-2 spin-in" size={24} color="white" />
            )}
          </Button>
        </FormRow>
      </form>
    </div>
  );
};

export default SptbaForm;
