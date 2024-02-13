import { dbAppointment } from "@/lib/db-appointment";
import { JenisKelamin, StatusSipil } from "@/lib/zod/spri";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";

async function main() {
  const category = await dbAppointment.category.createMany({
    data: [
      {
        id: "paspor",
        name: "Paspor",
      },
      {
        id: "suket",
        name: "Surat Keterangan",
      },
    ],
  });

  const service = await dbAppointment.service.createMany({
    data: [
      {
        categoryId: "paspor",
        id: "paspor-dewasa",
        description: "Permohonan Paspor Dewasa",
        name: "Paspor Dewasa",
      },
      {
        categoryId: "paspor",
        id: "wn-ganda",
        description: "Permohonan Paspor Anak Berkewarganegaraan Ganda",
        name: "Paspor Anak Berkewarganegaraan Ganda",
      },
      {
        categoryId: "paspor",
        id: "paspor-anak",
        description: "Permohonan Paspor Anak WNI",
        name: "Paspor Anak WNI",
      },
      {
        categoryId: "suket",
        id: "certificate-de-coutume",
        description: "Certificate de Coutume",
        name: "Certificate de Coutume",
      },
      {
        categoryId: "suket",
        id: "catat-lahir",
        description: "Pencatatan Kelahiran",
        name: "Pencatatan Kelahiran",
      },
      {
        categoryId: "suket",
        id: "catat-kawin",
        description: "Pencatatatan Perkawinan",
        name: "Pencatatatan Perkawinan",
      },
      {
        categoryId: "suket",
        id: "catat-cerai",
        description: "Pencatatan Perceraian",
        name: "Pencatatan Perceraian",
      },
      {
        categoryId: "suket",
        id: "catat-kematian",
        description: "Pencatatan Kematian",
        name: "Pencatatan Kematian",
      },
      {
        categoryId: "suket",
        id: "barang-pindahan",
        description: "Surat Keterangan Barang Pindahan",
        name: "Surat Keterangan Barang Pindahan",
      },
    ],
  });

  const form = await dbAppointment.form.createMany({
    data: [
      {
        id: "spri",
        description: "Formulir Surat Perjalanan Republik Indonesia",
        name: "spri",
      },
      {
        id: "wn-ganda",
        description: "Formulir permohonan kewarganegaraan ganda",
        name: "wn-ganda",
      },
      {
        id: "pernyataan-kewarganegaraan",
        description: "Surat Pernyataan Tidak Berkewarganegaraan Asing",
        name: "pernyataan-kewarganegaraan",
      },
    ],
  });

  const formsForService = await dbAppointment.formsForService.createMany({
    data: [
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "wn-ganda",
      },
      {
        formId: "wn-ganda",
        formOrder: 1,
        serviceId: "wn-ganda",
      },
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "paspor-anak",
      },
      {
        formId: "pernyataan-kewarganegaraan",
        formOrder: 1,
        serviceId: "paspor-anak",
      },
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "paspor-dewasa",
      },
      {
        formId: "pernyataan-kewarganegaraan",
        formOrder: 2,
        serviceId: "paspor-dewasa",
      },
    ],
  });

  type TFormWnGanda = z.infer<typeof wnGandaSchema>;

  const formWnGanda: TFormWnGanda = {
    namaLengkap: "John Doe",
    nomorPaspor: "123456789",
    tempatLahir: "Jakarta",
    tanggalLahir: new Date(1990, 1, 1),
    jenisKelamin: JenisKelamin.LAKI_LAKI,
    alamat: "Jl. Jendral Sudirman No. 1",
    ibuNama: "Jane Doe",
    ibuKewarganegaraan: "Indonesia",
    ayahNama: "John Doe Sr.",
    ayahKewarganegaraan: "Indonesia",
    ortuStatusPerkawinan: StatusSipil.KAWIN,
  };

  const parsing = await wnGandaSchema.parseAsync(formWnGanda);
  console.log(parsing);

  const filledForm = await dbAppointment.filledForm.createMany({
    data: [
      {
        formId: "wn-ganda",
        createdBy: "John Doe",
        formDataJson: formWnGanda,
      },
    ],
  });
}

main();
