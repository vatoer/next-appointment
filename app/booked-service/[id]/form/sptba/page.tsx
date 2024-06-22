import FormContainer from "@/components/form-container";
import { z } from "zod";

import { dbAppointment } from "@/lib/db-appointment";
import { dummySptba } from "@/lib/zod/dummy/sptba";
import { sptbaSchema } from "@/lib/zod/sptba";
import { FormStatus } from "@/prisma/db-appointment/generated/client";
import { redirect } from "next/navigation";
import {
  getBookedService,
  getServiceForm,
} from "../../../../../data/booked-service";
import BookedServiceIdContainer from "../../_components/container";
import FormUpsertSptba from "./_components/form-upsert-sptba";

type TFormSptba = z.infer<typeof sptbaSchema>;

const SptbaPage = async ({ params }: { params: { id: string } }) => {
  let sptbaData: TFormSptba | undefined;

  const bookedService = await getBookedService(params.id, "sptba");

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  // check if the service has a form to be filled
  const serviceForm = await getServiceForm(bookedService.serviceId, "sptba");

  // check if the service has a form to be filled
  if (!serviceForm) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.filledForms.length > 0) {
    //jika sudah final maka redirect ke halaman download
    if (bookedService.filledForms[0].status === FormStatus.FINAL) {
      redirect(`/booked-service/${bookedService.id}/form/sptba/download`);
    }

    const formDataJson = await sptbaSchema.spa(
      bookedService.filledForms[0].formDataJson
    );

    if (formDataJson.success) {
      sptbaData = formDataJson.data;
    } else {
      console.log(formDataJson.error);
    }
  } else {
    //TODO remove this dummy data when the form is ready to be used
    sptbaData = dummySptba;
  }

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <FormUpsertSptba
          bookedServiceId={bookedService.id}
          sptbaData={sptbaData}
        />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default SptbaPage;
