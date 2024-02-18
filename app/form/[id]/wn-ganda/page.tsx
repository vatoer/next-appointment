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
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  return (
    <main className="flex flex-col items-center">
      <FormContainer>
        <FormUpsertWnGanda
          bookedServiceId={bookedService.id}
          wnGandaData={dummyWnGanda}
        />
      </FormContainer>
    </main>
  );
};

export default WnGandaPage;
