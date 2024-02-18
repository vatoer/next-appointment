import FormContainer from "@/components/form-container";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";

import { dbAppointment } from "@/lib/db-appointment";
import { dummySptba } from "@/lib/zod/dummy/sptba";
import { redirect } from "next/navigation";
import FormUpsertSptba from "./_components/form-upsert-sptba";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

const SptbaPage = async ({ params }: { params: { id: string } }) => {
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
        <FormUpsertSptba
          bookedServiceId={bookedService.id}
          sptbaData={dummySptba}
        />
      </FormContainer>
    </main>
  );
};

export default SptbaPage;
