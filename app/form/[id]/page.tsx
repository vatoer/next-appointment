import { dbAppointment } from "@/lib/db-appointment";
import { redirect } from "next/navigation";
import ListFormsForService from "./_components/list-forms-for-service";

const FormIdPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/service"); //todo make not hardcoded
  }

  return (
    <div>
      <h1>Silakan mengisi formulir berikut</h1>
      <div>
        <ListFormsForService
          bookedServiceId={bookedService.id}
          serviceId={bookedService.serviceId}
        />
      </div>
    </div>
  );
};

export default FormIdPage;
