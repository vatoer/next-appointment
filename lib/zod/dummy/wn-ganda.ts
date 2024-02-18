import { z } from "zod";
import { JenisKelamin, StatusSipil } from "../spri";
import { wnGandaSchema } from "../wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

export const dummyWnGanda: TFormWnGanda = {
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
