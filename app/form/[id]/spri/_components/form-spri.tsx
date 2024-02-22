"use client";
import InputDatePicker from "@/components/date-picker.tsx/input-date-picker";
import FormRow from "@/components/form-row";
import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { JenisPermohonon, StatusSipil, spriSchema } from "@/lib/zod/spri";
import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createFilledFormSpri, updateSpri } from "../_actions";
import OptionsJenisKelamin from "./options-jenis-kelamin";
import OptionsJenisPermohonan from "./options-jenis-permohonan";
import OptionsStatusSipil from "./options-status-sipil";
import CheckboxPersetujuan from "./persetujuan";

type TFormData = z.infer<typeof spriSchema>;

interface ISpriFormProps {
  bookedServiceId: string;
  spriData?: TFormData;
  onSubmit: (data: TFormData) => void;
}
const SpriForm = ({ bookedServiceId, spriData, onSubmit }: ISpriFormProps) => {
  const [jenisPermohonan, setJenisPermohonan] = useState<JenisPermohonon>(
    spriData?.jenisPermohonan ?? ("0" as JenisPermohonon)
  );

  const [statusSipil, setStatusSipil] = useState(spriData?.statusSipil ?? "0");

  //setiap kali form diakse maka status setuju akan di reset ulang

  if (spriData?.setuju) {
    spriData.setuju = false;
  }

  const router = useRouter();
  const {
    register,
    setValue,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(spriSchema),
    defaultValues: spriData,
    mode: "all",
  });

  return (
    <div className="py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border shadow-lg p-6 rounded-md"
        noValidate
      >
        <h1 className="text-2xl font-semibold mb-4 w-full text-center">
          Formulir Surat Perjalanan Republik Indonesia untuk Warga Negara
          Indonesia di Luar Negeri
        </h1>
        <Separator />
        <h1 className="text-md font-semibold">Data Pemohon</h1>
        <FormRow>
          <SelectForm
            label="Jenis Permohonan"
            name="jenisPermohonan"
            error={errors.jenisPermohonan}
            register={register}
            className="md:w-1/2"
            onChange={(e) =>
              setJenisPermohonan(e.target.value as JenisPermohonon)
            }
          >
            <OptionsJenisPermohonan />
          </SelectForm>
        </FormRow>
        <FormRow>
          <InputForm
            label="Nama Lengkap"
            register={register}
            name="namaLengkap"
            error={errors.namaLengkap}
            className="md:w-9/12"
          />
          <InputForm
            label="Alias"
            register={register}
            name="alias"
            error={errors.alias}
            className="md:w-3/12"
          />
        </FormRow>
        <FormRow>
          <SelectForm
            label="Jenis Kelamin"
            name="jenisKelamin"
            error={errors.jenisKelamin}
            register={register}
            className="md:w-3/12"
          >
            <OptionsJenisKelamin />
          </SelectForm>
          <InputForm
            label="Tinggi Badan (cm)"
            register={register}
            name="tinggiBadan"
            error={errors.tinggiBadan}
            className="md:w-1/4"
            pattern="[0-9]*"
          />
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
        </FormRow>
        <FormRow>
          <InputForm
            label="Nomor Identitas"
            register={register}
            name="identitasNomor"
            error={errors.identitasNomor}
            className="md:w-1/4"
            maxLength={16}
          />
          <InputForm
            label="Tempat dikeluarkan"
            register={register}
            name="identitasTempatDikeluarkan"
            error={errors.identitasTempatDikeluarkan}
            className="md:w-1/4"
          />
          <InputDatePicker
            fromDate={new Date(2000, 1, 1)}
            label="Tanggal dikeluarkan"
            register={register}
            setValue={setValue}
            name="identitasTanggalDikeluarkan"
            error={errors.identitasTanggalDikeluarkan}
            className="md:w-1/4"
            calendarOptions={{
              fromDate: new Date(1945, 1, 1),
              toDate: new Date(),
            }}
          />
          <InputDatePicker
            fromDate={new Date(2000, 1, 1)}
            label="Berlaku hingga"
            register={register}
            setValue={setValue}
            name="identitasBerlakuHingga"
            error={errors.identitasBerlakuHingga}
            className="md:w-1/3"
            calendarOptions={{
              fromDate: new Date(getYear(Date()) - 25, 1, 1),
              toDate: new Date(getYear(Date()) + 11, 1, 1),
            }}
          />
        </FormRow>

        <FormRow>
          <InputForm
            label="Pekerjaan"
            register={register}
            name="pekerjaan"
            error={errors.pekerjaan}
            className="md:w-1/4"
          />
          <InputForm
            label="Alamat Pekerjaan/Perguruan Tinggi"
            register={register}
            name="pekerjaanAlamat"
            error={errors.pekerjaanAlamat}
            className="md:w-2/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="pekerjaanTelp"
            error={errors.pekerjaanTelp}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Tempat Tinggal di Indonesia"
            register={register}
            name="indonesiaAlamat"
            error={errors.indonesiaAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="indonesiaTelp"
            error={errors.indonesiaTelp}
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
            label="Telp/hp"
            register={register}
            name="lnTelp"
            error={errors.lnTelp}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Email"
            register={register}
            name="email"
            error={errors.email}
            className="md:w-full"
          />
          <SelectForm
            label="Status Sipil"
            name="statusSipil"
            error={errors.statusSipil}
            register={register}
            className="md:w-1/2"
            //value={statusSipil}
            onChange={(e) => {
              // setValue("statusSipil", e.target.value as StatusSipil, {
              //   shouldValidate: true,
              // });
              setStatusSipil(e.target.value);
            }}
          >
            <OptionsStatusSipil />
          </SelectForm>
        </FormRow>
        <Separator />
        <h1 className="text-md font-semibold">Identitas Orang Tua</h1>
        <FormRow title="Identitas Ibu">
          <InputForm
            label="Nama Ibu"
            register={register}
            name="ibuNama"
            error={errors.ibuNama}
            className="md:w-1/4"
          />
          <InputForm
            label="Kewarganegaraan "
            register={register}
            name="ibuKewarganegaraan"
            error={errors.ibuKewarganegaraan}
            className="md:w-1/4"
          />
          <InputForm
            label="Tempat Lahir "
            register={register}
            name="ibuTempatLahir"
            error={errors.ibuTempatLahir}
            className="md:w-1/4"
          />
          <InputDatePicker
            label="Tanggal Lahir "
            register={register}
            setValue={setValue}
            name="ibuTanggalLahir"
            error={errors.ibuTanggalLahir}
            className="md:w-1/4"
            calendarOptions={{
              date: new Date(getYear(Date()) - 17, 0, 1),
              fromDate: new Date(getYear(Date()) - 150, 1, 1),
              toDate: new Date(getYear(Date()) - 14, 1, 1),
            }}
          />
        </FormRow>
        <FormRow title="Identitas Ayah">
          <InputForm
            label="Nama Ayah"
            register={register}
            name="ayahNama"
            error={errors.ayahNama}
            className="md:w-1/4"
          />
          <InputForm
            label="Kewarganegaraan "
            register={register}
            name="ayahKewarganegaraan"
            error={errors.ayahKewarganegaraan}
            className="md:w-1/4"
          />
          <InputForm
            label="Tempat Lahir "
            register={register}
            name="ayahTempatLahir"
            error={errors.ayahTempatLahir}
            className="md:w-1/4"
          />
          <InputDatePicker
            label="Tanggal Lahir "
            register={register}
            setValue={setValue}
            name="ayahTanggalLahir"
            error={errors.ayahTanggalLahir}
            className="md:w-1/4"
            calendarOptions={{
              date: new Date(getYear(Date()) - 18, 1, 1),
              fromDate: new Date(getYear(Date()) - 150, 1, 1),
              toDate: new Date(getYear(Date()) - 14, 1, 1),
            }}
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Alamat Orang Tua"
            register={register}
            name="ortuAlamat"
            error={errors.ortuAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="ortuTelp"
            error={errors.ortuTelp}
            className="md:w-1/4"
          />
        </FormRow>
        {statusSipil === "1" && (
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
        )}

        {jenisPermohonan && jenisPermohonan.charAt(0) === "C" && (
          <>
            <Separator />
            <h1 className="text-md font-semibold">
              Diisi untuk Permohonan Perubahan
            </h1>
            <FormRow>
              <InputForm
                label="Nama"
                register={register}
                name="perubahanNama"
                error={errors.perubahanNama}
              />
            </FormRow>
            <FormRow>
              <InputForm
                label="Alamat"
                register={register}
                name="perubahanAlamat"
                error={errors.perubahanAlamat}
                className="md:w-2/3"
              />
              <InputForm
                label="Telp/hp"
                register={register}
                name="perubahanTelp"
                error={errors.perubahanTelp}
                className="md:w-1/3"
              />
            </FormRow>
          </>
        )}

        <Separator />
        <h1 className="text-md font-semibold">
          Bila terjadi permasalahan, Harap Hubungi
        </h1>

        <FormRow title="Kontak di Luar Negeri">
          <InputForm
            label="Nama"
            register={register}
            name="darurat1Nama"
            error={errors.darurat1Nama}
            className="md:w-1/4"
          />
          <InputForm
            label="Alamat Tinggal di Luar Negeri"
            register={register}
            name="darurat1Alamat"
            error={errors.darurat1Alamat}
            className="md:w-2/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="darurat1Hp"
            error={errors.darurat1Hp}
            className="md:w-1/4"
          />
        </FormRow>

        <FormRow title="Kontak di Indonesia">
          <InputForm
            label="Nama"
            register={register}
            name="darurat2Nama"
            error={errors.darurat2Nama}
            className="md:w-1/4"
          />
          <InputForm
            label="Alamat Tinggal di Indonesia"
            register={register}
            name="darurat2Alamat"
            error={errors.darurat2Alamat}
            className="md:w-2/4"
          />
          <InputForm
            label="hp"
            register={register}
            name="darurat2Hp"
            error={errors.darurat2Hp}
            className="md:w-1/3"
          />
        </FormRow>

        <Separator />
        <FormRow title="Pernyataan keterangan">
          <CheckboxPersetujuan
            name="setuju"
            register={register}
            trigger={trigger}
            setValue={setValue}
            getValue={getValues}
            error={errors.setuju}
          >
            Saya menyatakan bahwa data yang saya isi adalah benar dan menyetujui
            syarat dan ketentuan yang berlaku
          </CheckboxPersetujuan>
        </FormRow>

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

export default SpriForm;
