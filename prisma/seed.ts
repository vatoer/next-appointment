import { dbAppointment } from "@/lib/db-appointment";
import { JenisKelamin, StatusSipil } from "@/lib/zod/spri";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";

async function main() {
  // const form = await dbAppointment.form.createMany({
  //   data: [
  //     {
  //       id: "spri",
  //       description: "Formulir Surat Perjalanan Republik Indonesia",
  //       name: "spri",
  //     },
  //     {
  //       id: "wn-ganda",
  //       description: "Formulir permohonan kewarganegaraan ganda",
  //       name: "wn-ganda",
  //     },
  //   ],
  // });

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
