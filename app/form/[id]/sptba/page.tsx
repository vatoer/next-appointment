import FormContainer from "@/components/form-container";
import { z } from "zod";

import { dbAppointment } from "@/lib/db-appointment";
import { dummySptba } from "@/lib/zod/dummy/sptba";
import { sptbaSchema } from "@/lib/zod/sptba";
import { redirect } from "next/navigation";
import FormUpsertSptba from "./_components/form-upsert-sptba";

type TFormSptba = z.infer<typeof sptbaSchema>;

const SptbaPage = async ({ params }: { params: { id: string } }) => {
  let sptbaData: TFormSptba | undefined;

  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
    include: {
      FilledForm: {
        where: {
          formId: "sptba",
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
      formId: "sptba",
    },
  });

  if (!formForService) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.FilledForm.length > 0) {
    const formDataJson = await sptbaSchema.spa(
      bookedService.FilledForm[0].formDataJson
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
    <main className="flex flex-col items-center">
      <FormContainer>
        <FormUpsertSptba
          bookedServiceId={bookedService.id}
          sptbaData={sptbaData}
        />
      </FormContainer>
    </main>
  );
};

export default SptbaPage;
