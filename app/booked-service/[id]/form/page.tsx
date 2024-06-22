import FormContainer from "@/components/form-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateTotalForms, getBookedServiceForms } from "@/data/filledForm";
import { dbAppointment } from "@/lib/db-appointment";
import { StepName } from "@prisma-appointmendDb/client";
import { redirect } from "next/navigation";
import { FaRegHandPointRight } from "react-icons/fa6";
import BookedServiceIdContainer from "../_components/container";
import ButtonAppointment from "./_components/button-appointment";

import ButtonConfirm from "./_components/button-confirm";
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

  const sfs = await getBookedServiceForms(bookedService.id);
  //console.log("serviceForms", sfs);

  const ffs = await calculateTotalForms(bookedService.id);

  //console.log("filledForms", ffs);
  const parsedFfs = JSON.stringify(ffs);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <Alert className="mb-4">
          <FaRegHandPointRight className="h-4 w-4" />
          <AlertTitle>Petunjuk!</AlertTitle>
          <AlertDescription>
            <h1>Silakan Isi Formulir Berikut</h1>
          </AlertDescription>
        </Alert>

        <div className="mb-4">
          <ListServiceForm
            bookedServiceId={bookedService.id}
            serviceForms={sfs}
          />
        </div>

        <div className="flex flex-row gap-4">
          <ButtonConfirm
            active={bookedService.status === StepName.FORM_CONFIRMATION}
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
