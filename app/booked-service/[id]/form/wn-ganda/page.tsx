import FormContainer from "@/components/form-container";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";
import WnGandaForm from "./_components/form-wn-ganda";

import { dbAppointment } from "@/lib/db-appointment";
import { dummyWnGanda } from "@/lib/zod/dummy/wn-ganda";
import { FormStatus } from "@/prisma/db-appointment/generated/client";
import { redirect } from "next/navigation";
import BookedServiceIdContainer from "../../_components/container";
import {
  getBookedService,
  getServiceForm,
} from "../_actions/queries/booked-service";
import FormUpsertWnGanda from "./_components/form-upsert-wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

const WnGandaPage = async ({ params }: { params: { id: string } }) => {
  let wnGandaData: TFormWnGanda | undefined;

  const bookedService = await getBookedService(params.id, "wn-ganda");

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  // check if the service has a form to be filled
  const serviceForm = await getServiceForm(bookedService.serviceId, "wn-ganda");

  // check if the service has a form to be filled
  if (!serviceForm) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.filledForms.length > 0) {
    //jika sudah final maka redirect ke halaman download
    if (bookedService.filledForms[0].status === FormStatus.FINAL) {
      redirect(`/booked-service/${bookedService.id}/form/wn-ganda/download`);
    }
    const formDataJson = await wnGandaSchema.spa(
      bookedService.filledForms[0].formDataJson
    );

    if (formDataJson.success) {
      wnGandaData = formDataJson.data;
    } else {
      console.log(formDataJson.error);
    }
  } else {
    //TODO remove this dummy data when the form is ready to be used
    wnGandaData = dummyWnGanda;
  }

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <FormUpsertWnGanda
          bookedServiceId={bookedService.id}
          wnGandaData={wnGandaData}
        />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default WnGandaPage;
