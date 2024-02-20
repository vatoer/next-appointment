import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import SpriForm from "./_components/form";

import FormContainer from "@/components/form-container";
import { dummySpri } from "@/lib/zod/dummy/spri";
import { spriSchema } from "@/lib/zod/spri";
import { z } from "zod";
import FormUpsertSpri from "./_components/form-upsert-spri";

type TFormData = z.infer<typeof spriSchema>;

const SpriPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  let spriData: TFormData | undefined;

  // TODO
  // 1. check user
  // 2. check if the form is available for the user

  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
    include: {
      FilledForm: {
        where: {
          formId: "spri",
        },
      },
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  //jika sudah ada form yang diisi sebelumnya maka tampilkan form yang sudah diisi
  if (bookedService.FilledForm.length > 0) {
    const formDataJson = await spriSchema.spa(
      bookedService.FilledForm[0].formDataJson
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
    <main className="flex flex-col items-center">
      <FormContainer>
        <FormUpsertSpri
          bookedServiceId={bookedService.id}
          spriData={spriData}
        />
      </FormContainer>
    </main>
  );
};

export default SpriPage;
