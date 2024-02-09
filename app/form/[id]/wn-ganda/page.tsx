import FormContainer from "@/components/form-container";
import { wnGandaSchema } from "@/lib/zod/wn-ganda";
import { z } from "zod";
import FormCreateWnGanda from "./_components/form-create-wn-ganda";
import WnGandaForm from "./_components/form-wn-ganda";

type TFormWnGanda = z.infer<typeof wnGandaSchema>;

const WnGandaPage = () => {
  return (
    <main className="flex flex-col items-center">
      <FormContainer>
        <FormCreateWnGanda />
      </FormContainer>
    </main>
  );
};

export default WnGandaPage;
