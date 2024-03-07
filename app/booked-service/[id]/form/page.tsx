import FormContainer from "@/components/form-container";
import { dbAppointment } from "@/lib/db-appointment";
import {
  FilledForm,
  Form,
  ServiceForm,
  StepName,
} from "@/prisma/db-appointment/generated/client";
import { redirect } from "next/navigation";
import BookedServiceIdContainer from "../_components/container";
import { Steps } from "../_components/step";
import { filledForms, serviceForms } from "./_actions/queries/filledForm";
import ButtonAppointment from "./_components/button-appointment";
import ButtonConfirm from "./_components/button-confirm";
import ListFormsForService from "./_components/list-forms-for-service";
import ListServiceForm from "./_components/list-service-form";

const FormIdPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  // find  service forms

  const sfs = await serviceForms(bookedService.id);
  //console.log("serviceForms", sfs);

  const ffs = await filledForms(bookedService.id);

  //console.log("filledForms", ffs);
  const parsedFfs = JSON.stringify(ffs);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <h1>Silakan mengisi formulir berikut</h1>

        <ListServiceForm
          bookedServiceId={bookedService.id}
          serviceForms={sfs}
        />

        <div className="flex flex-row gap-4">
          <ButtonConfirm
            filledForm={parsedFfs}
            bookedServiceId={bookedService.id}
          />
          <ButtonAppointment bookedService={bookedService} />
        </div>
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default FormIdPage;
