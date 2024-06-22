import { dbAppointment } from "@/lib/db-appointment";
import { bookedServiceStatusToRoute } from "@/routes";
import { StepName } from "@prisma-appointmendDb/client";
import { redirect } from "next/navigation";

/**
 * this page is used to redirect to the booked service according to the status of the booked service
 * @param param0
 * @returns
 */
const BookedServiceIdPage = async ({ params }: { params: { id: string } }) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!bookedService) {
    redirect("/booked-service"); //todo make not hardcoded
  }

  //console.log("bookedService", bookedService);

  redirect(bookedServiceStatusToRoute(bookedService.id, bookedService.status));

  // if (bookedService.status === StepName.FORM_FILLING) {
  //   redirect("./form"); //todo make not hardcoded
  // }

  return null;
};

export default BookedServiceIdPage;
