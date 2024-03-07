import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";

import FormContainer from "@/components/form-container";
import { dummySpri } from "@/lib/zod/dummy/spri";
import { spriSchema } from "@/lib/zod/spri";
import { FormStatus } from "@/prisma/db-appointment/generated/client";
import { z } from "zod";
import BookedServiceIdContainer from "../../_components/container";
import {
  getBookedService,
  getServiceForm,
} from "../_actions/queries/booked-service";
import FormUpsertSpri from "./_components/form-upsert-spri";

type TFormData = z.infer<typeof spriSchema>;

const SpriPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  let spriData: TFormData | undefined;

  // TODO
  // 1. check user
  // 2. check if the form is available for the user
  const bookedService = await getBookedService(params.id, "spri");

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  // check if the service has a form to be filled
  const serviceForm = await getServiceForm(bookedService.serviceId, "spri");

  // check if the service has a form to be filled
  if (!serviceForm) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.filledForms.length > 0) {
    //jika sudah final maka redirect ke halaman download
    if (bookedService.filledForms[0].status === FormStatus.FINAL) {
      redirect(`/booked-service/${bookedService.id}/form/spri/download`);
    }

    const formDataJson = await spriSchema.spa(
      bookedService.filledForms[0].formDataJson
    );

    if (formDataJson.success) {
      spriData = formDataJson.data;
    } else {
      console.log(formDataJson.error);
    }
  } else {
    //TODO remove this dummy data when the form is ready to be used
    spriData = dummySpri;
  }

  console.log(spriData);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <FormUpsertSpri
          bookedServiceId={bookedService.id}
          spriData={spriData}
        />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default SpriPage;
