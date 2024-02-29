import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
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
    <div className="flex flex-col items-center text-center">
      <h1>Appointment Page</h1>
      <p>This is the appointment page</p>
      <div className="w-full flex">
        <AppointmentForm bookedServiceId={bookedService.id} />
      </div>
    </div>
  );
};

export default AppointmentIdPage;
