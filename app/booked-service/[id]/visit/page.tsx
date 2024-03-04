import FormContainer from "@/components/form-container";
import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import BookedServiceIdContainer from "../_components/container";
import { serviceForms } from "../form/_actions/queries/filledForm";
import ListServiceForm from "../form/_components/list-service-form";

const VisitPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  const sfs = await serviceForms(bookedService.id);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <div className="py-4">
          Anda telah membuat janji temu, silakan donwload formulir yang telah
          diisi, dan bawa ke KBRI pada hari yang telah ditentukan. jangan lupa
          membawa dokumen pendukung lainnya.
        </div>
        <ListServiceForm
          bookedServiceId={bookedService.id}
          serviceForms={sfs}
        />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default VisitPage;
