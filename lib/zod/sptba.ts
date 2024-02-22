import { z } from "zod";
import { jenisKelaminSchema } from "./spri";

/*
sptba = SURAT PERNYATAAN TIDAK BERKEWARGANEGARAAN ASING
*/
export const sptbaSchema = z.object({
  namaLengkap: z.string().min(3),
  tempatLahir: z.string().min(3),
  tanggalLahir: z.coerce.date(),
  jenisKelamin: jenisKelaminSchema,
  agama: z.string().min(3),
  pekerjaan: z.string().min(3),
  lnAlamat: z.string().min(10),
  indonesiaTelp: z.string(),
  pekerjaanTelp: z.string(),
  lnTelp: z.string().min(6),
  email: z.string().email(),
  pasporNomor: z.string().min(5).max(16), // asumsi KTP
  pasporTanggalDikeluarkan: z.coerce.date(),
  pasporTempatDikeluarkan: z.string().min(3),
  pasporBerlakuHingga: z.coerce.date(),
  visaStatus: z.string().min(3).max(25),
  permanentResidentNomor: z.string().min(3).max(25).optional(),
  //isTerlambat: z.boolean().default(false),
  alasanKeterlambatan: z.string().min(4).optional(),
});
