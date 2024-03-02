import { dbAppointment } from "@/lib/db-appointment";
import { StatusSipil, statusSipilToText } from "@/lib/zod/spri";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { format } from "date-fns";
import { promises } from "fs";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import {
  BlendMode,
  PDFAcroComboBox,
  PDFDocument,
  PDFDropdown,
  PDFPage,
  StandardFonts,
  degrees,
  rgb,
} from "pdf-lib";
import { z } from "zod";

type TFormData = z.infer<typeof wnGandaSchema>;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);

  let formData: TFormData;
  let isFinal = false;

  try {
    const filledForm = await dbAppointment.filledForm.findFirst({
      where: {
        formId: "wn-ganda",
        bookedServiceId: params.id,
      },
    });

    if (!filledForm) {
      return new NextResponse("not found", { status: 400 });
    }

    const formDataJson = await wnGandaSchema.spa(filledForm?.formDataJson);

    if (formDataJson.success !== true) {
      console.log(formDataJson.error);
      return new NextResponse("error", { status: 400 });
    }
    formData = formDataJson.data;
    isFinal = filledForm.status === "final";
  } catch (error) {
    console.log(error);
    return new NextResponse("error", { status: 400 });
  }

  try {
    //check if the template is a valid pdf and exist
    const templatePath = "./pdf-template/wn-ganda.pdf";
    const templateExists = await promises
      .access(templatePath)
      .then(() => true)
      .catch(() => false);

    if (!templateExists) {
      return new NextResponse("PDF template not found, contact administrator", {
        status: 400,
      });
    }

    const template = await readFile(templatePath);
    const pdfDoc = await PDFDocument.load(template);
    if (!pdfDoc) {
      return new NextResponse("Invalid PDF template", { status: 400 });
    }

    const form = pdfDoc.getForm();

    const fields = form.getFields().map((field) => field.getName());

    console.log("fields", fields);

    for (const [key, value] of Object.entries(formData)) {
      console.log(`${key}: ${value}`);

      if (fields.includes(key)) {
        let fieldValue: string;
        if (value instanceof Date) {
          fieldValue = format(value, "dd-MM-yyyy");
        } else {
          fieldValue = value;
        }

        if (key === "jenisKelamin") {
          fieldValue = value === "1" ? "Laki-laki" : "Perempuan";
        }

        if (key === "ortuStatusPerkawinan") {
          fieldValue = statusSipilToText(value as StatusSipil);
        }

        //form.getTextField(key).setFontSize(11);
        form.getTextField(key).setText(fieldValue);
      }
    }

    // if draft, add watermark
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    if (!isFinal) {
      const { width, height } = firstPage.getSize();
      firstPage.drawText("DRAFT", {
        x: 50,
        y: height / 2 + 100,
        size: 100,
        rotate: degrees(45),
        //color: [0.7, 0.7, 0.7],
        color: rgb(0.7, 0.7, 0.7),
        blendMode: BlendMode.Multiply,
      });
    }

    form.flatten();

    const pdfBytes = await pdfDoc.save();
    //await writeFile("./pdf-template/f1ex.pdf", pdfBytes);
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        //"Content-Disposition": 'attachment; filename="f1.pdf"',
      },
    });
  } catch (error) {
    return new NextResponse("E0003", { status: 400 });
  }
}
