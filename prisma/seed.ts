import { dbAppointment } from "@/lib/db-appointment";
import { StepName } from "@prisma-appointmendDb/client";

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
      {
        id: "legalisasi",
        name: "Legalisasi",
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
      {
        categoryId: "legalisasi",
        id: "apostille-akte-kelahiran",
        description:
          "Legalisasi-Apostille Akte Kelahiran/Kutipan Akte Kelahiran/Surat Keterangan Lahir/Surat Kenal Lahir/Akte Pernikahan dari Indonesia",
        name: "Legalisasi-Apostille Akte Kelahiran",
      },
      {
        categoryId: "legalisasi",
        id: "legalisasi-surat-kuasa",
        description: "Legalisasi Surat Kuasa (WNI ke WNI)",
        name: "Legalisasi Surat Kuasa",
      },
      {
        categoryId: "legalisasi",
        id: "legalisasi-dokumen-setempat",
        description: "Legalisasi Dokumen Setempat",
        name: "Legalisasi Dokumen Setempat",
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
        id: "sptba",
        description: "Surat Pernyataan Tidak Berkewarganegaraan Asing",
        name: "surat-pernyataan-tidak-berkewarganegaraan-asing",
      },
    ],
  });

  const serviceStep = await dbAppointment.step.createMany({
    data: [
      {
        serviceId: "paspor-dewasa",
        sequence: 5,
        name: StepName.FORM_FILLING,
        description: "Pengisian Formulir",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 10,
        name: StepName.FORM_CONFIRMATION,
        description: "Konfirmasi Formulir",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 15,
        name: StepName.DOCUMENT_UPLOAD,
        description: "Unggah Dokumen",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 20,
        name: StepName.APPOINTMENT,
        description: "Pembuatan Janji Temu",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 25,
        name: StepName.VISIT,
        description: "Kunjungan ke Perwakilan RI",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 30,
        name: StepName.PROCESSING,
        description: "Proses",
      },
      {
        serviceId: "paspor-dewasa",
        sequence: 35,
        name: StepName.COMPLETED,
        description: "Selesai",
      },
      {
        serviceId: "paspor-anak",
        sequence: 5,
        name: StepName.FORM_FILLING,
        description: "Pengisian Formulir",
      },
      {
        serviceId: "paspor-anak",
        sequence: 10,
        name: StepName.FORM_CONFIRMATION,
        description: "Konfirmasi Formulir",
      },
      {
        serviceId: "paspor-anak",
        sequence: 15,
        name: StepName.DOCUMENT_UPLOAD,
        description: "Unggah Dokumen",
      },
      {
        serviceId: "paspor-anak",
        sequence: 20,
        name: StepName.APPOINTMENT,
        description: "Pembuatan Janji Temu",
      },
      {
        serviceId: "paspor-anak",
        sequence: 25,
        name: StepName.VISIT,
        description: "Kunjungan ke Perwakilan RI",
      },
      {
        serviceId: "paspor-anak",
        sequence: 30,
        name: StepName.PROCESSING,
        description: "Proses",
      },
      {
        serviceId: "paspor-anak",
        sequence: 35,
        name: StepName.COMPLETED,
        description: "Selesai",
      },
      {
        serviceId: "wn-ganda",
        sequence: 5,
        name: StepName.FORM_FILLING,
        description: "Pengisian Formulir",
      },
      {
        serviceId: "wn-ganda",
        sequence: 10,
        name: StepName.FORM_CONFIRMATION,
        description: "Konfirmasi Formulir",
      },
      {
        serviceId: "wn-ganda",
        sequence: 15,
        name: StepName.DOCUMENT_UPLOAD,
        description: "Unggah Dokumen",
      },
      {
        serviceId: "wn-ganda",
        sequence: 20,
        name: StepName.APPOINTMENT,
        description: "Pembuatan Janji Temu",
      },
      {
        serviceId: "wn-ganda",
        sequence: 25,
        name: StepName.VISIT,
        description: "Kunjungan ke Perwakilan RI",
      },
      {
        serviceId: "wn-ganda",
        sequence: 30,
        name: StepName.PROCESSING,
        description: "Proses",
      },
      {
        serviceId: "wn-ganda",
        sequence: 35,
        name: StepName.COMPLETED,
        description: "Selesai",
      },
    ],
  });

  const serviceForm = await dbAppointment.serviceForm.createMany({
    data: [
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "wn-ganda",
      },
      {
        formId: "wn-ganda",
        formOrder: 2,
        serviceId: "wn-ganda",
      },
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "paspor-anak",
      },
      {
        formId: "sptba",
        formOrder: 2,
        serviceId: "paspor-anak",
      },
      {
        formId: "spri",
        formOrder: 1,
        serviceId: "paspor-dewasa",
      },
      {
        formId: "sptba",
        formOrder: 2,
        serviceId: "paspor-dewasa",
      },
    ],
  });

  const serviceRequirement = await dbAppointment.serviceRequirement.createMany({
    data: [
      {
        serviceId: "wn-ganda",
        name: "form-spri",
        type: "form",
        description: "Formulir Permohonan Paspor RI yang sudah diisi lengkap.",
        required: true,
      },
      {
        serviceId: "wn-ganda",
        name: "form-wn-ganda",
        description:
          "Formulir WN Ganda yang sudah diisi lengkap sebagai permohonan kewarganegaraan ganda terbatas dan ditandangani kedua orang tua.",
        type: "form",
        required: true,
      },
      {
        serviceId: "wn-ganda",
        name: "surat-pernyataan-dari-ayah-ibu-wna",
        description:
          "Surat pernyataan dari Ayah atau Ibu WNA bahwa menyetujui anaknya memperoleh paspor Indonesia sampai batas umur 18 tahun (kecuali orang tua sudah bercerai).",
        type: "form",
        required: true,
      },
      {
        serviceId: "wn-ganda",
        name: "paspor-lama",
        description: "Paspor RI lama (bila sudah memiliki paspor RI).",
        type: "document",
        required: false,
      },
      {
        serviceId: "wn-ganda",
        name: "fotokopi-akta-kelahiran-anak",
        description: "Fotokopi Akta Kelahiran anak.",
        type: "copy",
        required: false,
      },
      {
        serviceId: "wn-ganda",
        name: "fotokopi-akta-perkawinan-orang-tua",
        description: "Fotokopi Akta Perkawinan orang tua.",
        type: "copy",
        required: false,
      },
      {
        serviceId: "wn-ganda",
        name: "fotokopi-paspor-orang-tua",
        description:
          "Fotokopi paspor orang tua (halaman identitas dan catatan resmi).",
        type: "copy",
        required: false,
      },
      {
        serviceId: "wn-ganda",
        name: "fotokopi-kartu-izin-tinggal-orang-tua-wni",
        description: "Fotokopi bolak-balik kartu izin tinggal orang tua WNI.",
        type: "copy",
        required: false,
      },

      {
        serviceId: "paspor-anak",
        name: "form-spri",
        type: "form",
        description: "Formulir Permohonan Paspor RI yang sudah diisi lengkap.",
        required: true,
      },
      {
        serviceId: "paspor-anak",
        name: "form-sptba",
        description:
          "Surat Pernyataan Tidak Berkewarganegaraan Asing yang sudah diisi lengkap.",
        type: "form",
        required: true,
      },
      {
        serviceId: "paspor-anak",
        name: "paspor-lama",
        description: "Paspor RI lama (bila sudah memiliki paspor RI).",
        type: "document",
        required: false,
      },
      {
        serviceId: "paspor-anak",
        name: "fotokopi-akta-kelahiran-anak",
        description: "Fotokopi Akta Kelahiran anak.",
        type: "copy",
        required: true,
      },
      {
        serviceId: "paspor-anak",
        name: "fotokopi-akta-perkawinan-orang-tua",
        description: "Fotokopi Akta Perkawinan orang tua.",
        type: "copy",
        required: true,
      },
      {
        serviceId: "paspor-anak",
        name: "fotokopi-paspor-orang-tua",
        description:
          "Fotokopi paspor orang tua (halaman identitas dan catatan resmi).",
        type: "copy",
        required: true,
      },
      {
        serviceId: "paspor-anak",
        name: "fotokopi-kartu-izin-tinggal-orang-tua-wni",
        description: "Fotokopi bolak-balik kartu izin tinggal orang tua WNI.",
        type: "copy",
        required: true,
      },
      {
        serviceId: "paspor-dewasa",
        name: "form-spri",
        description: "Formulir Permohonan Paspor RI yang sudah diisi lengkap.",
        type: "form",
        required: true,
      },
      {
        serviceId: "paspor-dewasa",
        name: "form-sptba",
        description:
          "Surat Pernyataan Tidak Berkewarganegaraan Asing yang sudah diisi lengkap.",
        type: "form",
        required: true,
      },
      {
        serviceId: "paspor-dewasa",
        name: "paspor-lama",
        description: "Paspor RI lama (bila sudah memiliki paspor RI).",
        type: "document",
        required: true,
      },
      {
        serviceId: "paspor-dewasa",
        name: "fotokopi-akta-kelahiran",
        description: "Fotokopi Akta Kelahiran.",
        type: "copy",
        required: true,
      },

      {
        serviceId: "paspor-dewasa",
        name: "fotokopi-kartu-izin-tinggal",
        description: "Fotokopi bolak-balik kartu izin tinggal.",
        type: "copy",
        required: true,
      },
      {
        serviceId: "paspor-dewasa",
        name: "fotokopi-akta-perkawinan-akta-perceraian",
        description:
          "Fotokopi akta perkawinan atau akta perceraian (untuk yang menikah/cerai).",
        type: "copy",
        required: true,
      },
    ],
  });
}

main();
