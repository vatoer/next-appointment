import { z } from "zod";
import { JenisKelamin } from "../spri";
import { sptbaSchema } from "../sptba";
type TFormData = z.infer<typeof sptbaSchema>;

export const dummySptba: TFormData = {
  namaLengkap: "fulan bin fulan",
  tempatLahir: "semanggi",
  tanggalLahir: new Date("2000-01-01"),
  jenisKelamin: JenisKelamin.LAKI_LAKI,
  agama: "islam",
  pekerjaan: "swasta",
  lnAlamat: "dermaga 1",
  IndonesiaTelp: "0812300000",
  pekerjaanTelp: "+662300000",
  lnTelp: "+332300000",
  email: "a@abc.com",
  pasporNomor: "x1234567",
  pasporTanggalDikeluarkan: new Date("2020-01-01"),
  pasporTempatDikeluarkan: "jakarta",
  pasporBerlakuHingga: new Date("2025-01-01"),
  visaStatus: "tourist",
  permanentResidentNomor: "pr1234567",
  alasanKeterlambatan: "lupa",
};
