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
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof spriSchema>;

const SpriForm = () => {
  const [jenisPermohonan, setJenisPermohonan] = useState<JenisPermohonon>(
    "0" as JenisPermohonon
  );

  const [statusSipil, setStatusSipil] = useState(0);

  //setJenisPermohonan("C1");
  const router = useRouter();
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      isValid,
      isSubmitted,
    },
  } = useForm<FormData>({
    resolver: zodResolver(spriSchema),
    //reValidateMode: "onChange",
    mode: "all",
  });

  const onSubmit = async (data: FormData) => {
    console.log("oie");
    console.log(data);
  };

  return (
    <div className="py-10">
      <form
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
            //value={jenisPermohonan}
            onChange={(e) =>
              setJenisPermohonan(e.target.value as JenisPermohonon)
            }
          >
            <option value="0">Pilih Jenis Permohonan</option>
            <option value="A1">Pembuatan Paspor Baru 48 Halaman</option>
            <option value="A2">Pembuatan Paspor Baru 24 Halaman</option>
            <option value="A3">Pembuatan SPLP</option>
            <option value="B1">
              Pergantian Paspor karena habis masa berlaku
            </option>
            <option value="B2">Pergantian Paspor karena penuh</option>
            <option value="B3">Pergantian Paspor karena hilang</option>
            <option value="B4">Pergantian Paspor karena rusak</option>
            <option value="C1">Perubahan Nama</option>
            <option value="C2">Perubahan Alamat</option>
            <option value="C3">Perubahan Lain</option>
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
            <option value="0">Pilih Jenis Kelamin</option>
            <option value="1">Laki-laki</option>
            <option value="2">Perempuan</option>
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
            fromDate={new Date(1900, 1, 1)}
            toDate={new Date()}
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
          />
          <InputDatePicker
            fromDate={new Date(2000, 1, 1)}
            label="Berlaku hingga"
            register={register}
            setValue={setValue}
            name="identitasBerlakuHingga"
            error={errors.identitasBerlakuHingga}
            className="md:w-1/3"
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
            name="pekejerjaanAlamat"
            error={errors.pekejerjaanAlamat}
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
            name="IndonesiaAlamat"
            error={errors.IndonesiaAlamat}
            className="md:w-3/4"
          />
          <InputForm
            label="Telp/hp"
            register={register}
            name="IndonesiaTelp"
            error={errors.IndonesiaTelp}
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
            name="alamatEmail"
            error={errors.alamatEmail}
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
              setStatusSipil(Number(e.target.value));
              //trigger("statusSipil");
              // setValue("statusSipil", e.target.value as StatusSipil, {
              //   shouldValidate: true,
              // });
            }}
          >
            <option value="0">Pilih Status Sipil</option>
            <option value="1">Kawin</option>
            <option value="2">Tidak Kawin</option>
            <option value="3">Cerai Mati</option>
            <option value="4">Cerai Hidup</option>
          </SelectForm>
        </FormRow>
        <Separator />
        <h1 className="text-md font-semibold">Identitas Orang Tua</h1>
        <FormRow>
          <InputForm
            label="Nama Ibu"
            register={register}
            name="ibuNama"
            error={errors.ibuNama}
            className="md:w-1/4"
          />
          <InputForm
            label="Kewarganegaraan Ibu"
            register={register}
            name="ibuKewarganegaraan"
            error={errors.ibuKewarganegaraan}
            className="md:w-1/4"
          />
          <InputForm
            label="Tempat Lahir Ibu"
            register={register}
            name="ibuTempatLahir"
            error={errors.ibuTempatLahir}
            className="md:w-1/4"
          />
          <InputDatePicker
            label="Tanggal Lahir Ibu"
            register={register}
            setValue={setValue}
            name="ibuTanggalLahir"
            error={errors.ibuTanggalLahir}
            className="md:w-1/4"
          />
        </FormRow>
        <FormRow>
          <InputForm
            label="Nama Ayah"
            register={register}
            name="ayahNama"
            error={errors.ayahNama}
            className="md:w-1/4"
          />
          <InputForm
            label="Kewarganegaraan Ayah"
            register={register}
            name="ayahKewarganegaraan"
            error={errors.ayahKewarganegaraan}
            className="md:w-1/4"
          />
          <InputForm
            label="Tempat Lahir Ayah"
            register={register}
            name="ayahTempatLahir"
            error={errors.ayahTempatLahir}
            className="md:w-1/4"
          />
          <InputDatePicker
            label="Tanggal Lahir Ayah"
            register={register}
            setValue={setValue}
            name="ayahTanggalLahir"
            error={errors.ayahTanggalLahir}
            className="md:w-1/4"
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
        {statusSipil === 1 && (
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

        <h1 className="text-sm font-semibold">Kontak di Luar Negeri</h1>
        <FormRow>
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

        <h1 className="text-sm font-semibold">Kontak di Indonesia</h1>
        <FormRow>
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
        <h1 className="text-sm font-semibold">Pernyataan keterangan</h1>

        <div className="flex flex-row gap-2 mt-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Seluruh keterangan dan data yang saya nyatakan dalam formulir ini
            adalah sah dan sesuai dengan keadaan yang sebenarnya, dan apabila
            dikemudian hari ternyata pernyataan ini tidak benar, saya bersedia
            dituntut sesuai dengan ketentuan peraturan perundang-undangan yang
            berlaku.
          </label>
        </div>
        <FormRow>
          <Button
            className=" w-full py-6 mt-6 "
            disabled={isSubmitting}
            type="button"
            onClick={() => {
              console.log("submitting");
              console.log(
                isDirty,
                isValid,
                isSubmitted,
                isSubmitSuccessful,
                isValid
              );
              handleSubmit(onSubmit)();
            }}
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
