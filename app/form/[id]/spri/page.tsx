import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import SpriForm from "./_components/form";

import FormContainer from "@/components/form-container";
import { dummySpri } from "@/lib/zod/dummy/spri";

const SpriPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);

  // TODO
  // 1. check user
  // 2. check if the form is available for the user

  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  console.log(bookedService);

  return (
    <main className="flex flex-col items-center">
      <FormContainer>
        <SpriForm bookedServiceId={bookedService.id} spriData={dummySpri} />
      </FormContainer>
    </main>
  );
};

export default SpriPage;
