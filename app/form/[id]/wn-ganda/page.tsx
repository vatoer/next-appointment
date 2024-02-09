import FormContainer from "@/components/form-container";
import WnGandaForm from "./_components/form-wn-ganda";

const WnGandaPage = () => {
  return (
    <main className="flex flex-col items-center">
      <FormContainer>
        <WnGandaForm />
      </FormContainer>
    </main>
  );
};

export default WnGandaPage;
