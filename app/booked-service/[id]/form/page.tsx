import FormContainer from "@/components/form-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import { FaRegHandPointRight } from "react-icons/fa6";
import BookedServiceIdContainer from "../_components/container";
import { filledForms, serviceForms } from "./_actions/queries/filledForm";
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

  const sfs = await serviceForms(bookedService.id);
  //console.log("serviceForms", sfs);

  const ffs = await filledForms(bookedService.id);

  //console.log("filledForms", ffs);
  const parsedFfs = JSON.stringify(ffs);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <Alert className="mb-4">
          <FaRegHandPointRight className="h-4 w-4" />
          <AlertTitle>Petunjuk!</AlertTitle>
          <AlertDescription>
            <ol className="list-decimal">
              <li>Isi semua formulir berikut</li>
              <li>Konfirmasi formulir yang telah diisi</li>
              <li>Buat janji temu</li>
            </ol>
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
