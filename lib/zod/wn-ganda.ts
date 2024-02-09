import { z } from "zod";
import {
  genericTanggalSchema,
  jenisKelaminSchema,
  statusSipilSchema,
} from "./spri";

export const wnGandaSchema = z.object({
  namaLengkap: z.string().min(3),
  jenisKelamin: jenisKelaminSchema,
  tempatLahir: z.string().min(3),
  tanggalLahir: genericTanggalSchema,
  alamat: z.string().min(10),
  nomorPaspor: z.string().min(5).max(16),

  ibuNama: z.string().min(3),
  ibuKewarganegaraan: z.string().min(3),
  ayahNama: z.string().min(3),
  ayahKewarganegaraan: z.string().min(3),
  ortuStatusPerkawinan: statusSipilSchema,
});
