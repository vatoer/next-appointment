import FormContainer from "@/components/form-container";
import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import BookedServiceIdContainer from "../_components/container";
import AppointmentForm from "./_components/appointment-form";

const AppointmentIdPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <AppointmentForm bookedServiceId={bookedService.id} />
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default AppointmentIdPage;
