//https://transform.tools/typescript-to-zod
import z, { addIssueToContext } from "zod";

export enum JenisPermohonon {
  "BARU_PASPOR_48" = "A1",
  "BARU_PASPOR_24" = "A2",
  "BARU_SPLP" = "A3",
  "GANTI_HABIS" = "B1",
  "GANTI_PENUH" = "B2",
  "GANTI_HILANG" = "B3",
  "GANTI_RUSAK" = "B4",
  "GANTI_LAIN" = "B5",
  "PERUBAHAN_NAMA" = "C1",
  "PERUBAHAN_ALAMAT" = "C2",
  "PERUBAHAN_LAIN" = "C3",
}

export enum StatusSipil {
  "KAWIN" = "1",
  "TIDAK_KAWIN" = "2",
  "CERAI_MATI" = "3",
  "CERAI_HIDUP" = "4",
}

export enum JenisKelamin {
  "LAKI_LAKI" = "1",
  "PEREMPUAN" = "2",
}

export const jenisPermohononSchema = z.nativeEnum(JenisPermohonon, {
  errorMap: (issue, ctx) => ({ message: "Pilih Jenis Permohonan" }),
});

export const statusSipilSchema = z.nativeEnum(StatusSipil, {
  errorMap: (issue, ctx) => ({ message: "Pilih status Sipil" }),
});

export const jenisKelaminSchema = z.nativeEnum(JenisKelamin, {
  errorMap: (issue, ctx) => ({ message: "Pilih Jenis kelamin" }),
});

export const genericStringSchema = z.string().min(3).max(25);

// export const genericTanggalSchema = z
//   .string()
//   .min(10, {
//     message: "Please select a date",
//   })
//   .pipe(
//     z.coerce
//       .date({
//         required_error: "Please select a date",
//         invalid_type_error: "That's not a date!",
//       })
//       .min(new Date("1900-01-01"), { message: "Too old" })
//   );

export const genericTanggalSchema = z.coerce
  .date()
  .min(new Date("1900-01-01"), { message: "Too old" });

export const perubahanNamaSchema = z.string().min(3).max(25);

export const checkStatusSipilSchema = z.string().min(3).max(255);

export const spriSchema = z
  .object({
    perwakilan: z.string().min(3).optional(),
    jenisPermohonan: jenisPermohononSchema,
    namaLengkap: z.string().min(3),
    jenisKelamin: jenisKelaminSchema,
    alias: z.string().optional(),
    tinggiBadan: z.coerce.number().min(20).max(250),
    tempatLahir: z.string().min(3),
    tanggalLahir: genericTanggalSchema,
    identitasNomor: z.string().min(5).max(16), // asumsi KTP
    identitasTanggalDikeluarkan: z.coerce.date(),
    identitasTempatDikeluarkan: z.string().min(3),
    identitasBerlakuHingga: z.coerce.date(),
    pekerjaan: z.string().min(3),
    pekerjaanAlamat: z.string().min(10),
    pekerjaanTelp: z.string(),
    indonesiaAlamat: z.string().min(10),
    indonesiaTelp: z.string(),
    lnAlamat: z.string().min(10),
    lnTelp: z.string(),
    email: z.string().email(),
    statusSipil: statusSipilSchema,
    ibuNama: z.string().min(3),
    ibuKewarganegaraan: z.string().min(3),
    ibuTempatLahir: z.string().min(3),
    ibuTanggalLahir: z.coerce.date(),
    ayahNama: z.string().min(3),
    ayahKewarganegaraan: z.string().min(3),
    ayahTempatLahir: z.string().min(3),
    ayahTanggalLahir: z.coerce.date(),
    ortuAlamat: z.string().min(10),
    ortuTelp: z.string(),
    suamiIstriNama: z.string().optional(),
    suamiIstriTempatLahir: z.string().optional(),
    suamiIstriTanggalLahir: z.coerce.date().optional(),
    suamiIstriKewarganegaraan: z.string().optional(),
    suamiIstriAlamat: z.string().optional(),
    perubahanNama: z.string().optional(),
    perubahanAlamat: z.string().optional(),
    perubahanTelp: z.string().optional(),
    darurat1Nama: z.string(),
    darurat1Alamat: z.string(),
    darurat1Telp: z.string().optional(),
    darurat1Hp: z.string(),
    darurat2Nama: z.string(),
    darurat2Alamat: z.string(),
    darurat2Telp: z.string().optional(),
    darurat2Hp: z.string(),
    setuju: z.literal<boolean>(true, {
      errorMap: () => ({
        message:
          "untuk melanjutkan, Anda harus menyetujui syarat dan ketentuan",
      }),
    }),
  })
  .superRefine(({ jenisPermohonan, perubahanNama, perubahanAlamat }, ctx) => {
    if (jenisPermohonan.charAt(0) === "C") {
      if (perubahanNama === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Data tidak valid`,
          path: ["perubahanNama"],
        });
        return false;
      }

      const checkPerubahanNama = perubahanNamaSchema.safeParse(perubahanNama);

      if (checkPerubahanNama.success === false) {
        checkPerubahanNama.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: ["perubahanNama"],
          });
        });
        return false;
      }
    }

    return z.NEVER;
  })
  .superRefine(
    (
      {
        statusSipil,
        suamiIstriNama,
        suamiIstriKewarganegaraan,
        suamiIstriTempatLahir,
        suamiIstriTanggalLahir,
        suamiIstriAlamat,
      },
      ctx
    ) => {
      if (statusSipil === "1") {
        const checksuamiIstriNama =
          genericStringSchema.safeParse(suamiIstriNama);

        if (checksuamiIstriNama.success === false) {
          checksuamiIstriNama.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["suamiIstriNama"],
            });
          });
          return false;
        }

        const checksuamiIstriKewarganegaraan = genericStringSchema.safeParse(
          suamiIstriKewarganegaraan
        );

        if (checksuamiIstriKewarganegaraan.success === false) {
          checksuamiIstriKewarganegaraan.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["suamiIstriKewarganegaraan"],
            });
          });
          return false;
        }

        const checksuamiIstriTempatLahir = genericStringSchema.safeParse(
          suamiIstriTempatLahir
        );

        if (checksuamiIstriTempatLahir.success === false) {
          checksuamiIstriTempatLahir.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["suamiIstriTempatLahir"],
            });
          });
          return false;
        }

        const checksuamiIstriTanggalLahir = genericTanggalSchema.safeParse(
          suamiIstriTanggalLahir
        );

        if (checksuamiIstriTanggalLahir.success === false) {
          checksuamiIstriTanggalLahir.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["suamiIstriTanggalLahir"],
            });
          });
          return false;
        }

        const checksuamiIstriAlamat =
          genericStringSchema.safeParse(suamiIstriAlamat);

        if (checksuamiIstriAlamat.success === false) {
          checksuamiIstriAlamat.error.issues.forEach((issue) => {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: issue.message,
              path: ["suamiIstriAlamat"],
            });
          });
          return false;
        }
      }

      return z.NEVER;
    }
  );
// .refine(
//   (data) => {
//     if (
//       data.jenisPermohonan.charAt(0) === "C" &&
//       data.perubahanNama !== undefined &&
//       data.perubahanNama.length < 3
//     ) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "Data tidak valid",
//     path: ["perubahanNama"],
//   }
// );
