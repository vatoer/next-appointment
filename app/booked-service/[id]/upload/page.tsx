import FormContainer from "@/components/form-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getBookedServiceAndRequirement } from "@/data/booked-service";
import { getBookedServiceForms } from "@/data/filledForm";
import { bookedServiceStatusToRoute } from "@/routes";
import { StepName } from "@prisma-appointmendDb/client";
import { redirect } from "next/navigation";
import { FaRegHandPointRight } from "react-icons/fa6";
import BookedServiceIdContainer from "../_components/container";
import ListServiceForm from "../form/_components/list-service-form";
import FormUploadRequirements from "./_components/form-upload-requirements";

const UploadPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await getBookedServiceAndRequirement(params.id);

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  //check if bookedService is in visit status
  if (bookedService.status !== StepName.DOCUMENT_UPLOAD) {
    redirect(
      bookedServiceStatusToRoute(bookedService.id, bookedService.status)
    );
  }

  const sfs = await getBookedServiceForms(bookedService.id);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <Alert className="mb-4">
          <FaRegHandPointRight className="h-4 w-4" />
          <AlertTitle>Petunjuk!</AlertTitle>
          <AlertDescription>
            <ul className="list-disc">
              <li>Silakan download Formulir Berikut</li>
              <li>Tanda tangani formulir</li>
              <li>Upload formulir yang telah ditandatangani</li>
              <li>Upload dokumen pendukung lainnya</li>
            </ul>
          </AlertDescription>
        </Alert>
        <h1 className="text-l font-bold my-4">Download Formulir</h1>

        <ListServiceForm
          bookedServiceId={bookedService.id}
          serviceForms={sfs}
        />
        <h1 className="text-l font-bold my-4">Upload Dokumen Pendukung</h1>
        <FormUploadRequirements
          maxFileSize={1 * 1024 * 1024}
          requirements={bookedService.service.serviceRequirements}
        />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default UploadPage;
