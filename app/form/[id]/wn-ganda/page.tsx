import FormContainer from "@/components/form-container";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";
import WnGandaForm from "./_components/form-wn-ganda";

import { dbAppointment } from "@/lib/db-appointment";
import { dummyWnGanda } from "@/lib/zod/dummy/wn-ganda";
import { redirect } from "next/navigation";
import FormUpsertWnGanda from "./_components/form-upsert-wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

const WnGandaPage = async ({ params }: { params: { id: string } }) => {
  let wnGandaData: TFormWnGanda | undefined;

  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
    include: {
      FilledForm: {
        where: {
          formId: "wn-ganda",
        },
      },
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  // check if the service has a form to be filled
  const formForService = await dbAppointment.formsForService.findFirst({
    where: {
      serviceId: bookedService.serviceId,
      formId: "wn-ganda",
    },
  });

  if (!formForService) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.FilledForm.length > 0) {
    const formDataJson = await wnGandaSchema.spa(
      bookedService.FilledForm[0].formDataJson
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
    <main className="flex flex-col items-center">
      <FormContainer>
        <FormUpsertWnGanda
          bookedServiceId={bookedService.id}
          wnGandaData={wnGandaData}
        />
      </FormContainer>
    </main>
  );
};

export default WnGandaPage;
