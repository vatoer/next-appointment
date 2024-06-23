import FormContainer from "@/components/form-container";
import { getBookedServiceForms } from "@/data/filledForm";
import { dbAppointment } from "@/lib/db-appointment";
import { StepName } from "@prisma-appointmendDb/client";
import { format, formatDistance } from "date-fns";
import { id } from "date-fns/locale";

import { bookedServiceStatusToRoute } from "@/routes";
import { redirect } from "next/navigation";
import BookedServiceIdContainer from "../_components/container";
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

  //check if bookedService is in visit status
  if (bookedService.status !== StepName.VISIT) {
    redirect(
      bookedServiceStatusToRoute(bookedService.id, bookedService.status)
    );
  }

  const sfs = await getBookedServiceForms(bookedService.id);

  return (
    <BookedServiceIdContainer bookedServiceId={bookedService.id}>
      <FormContainer>
        <div className="py-4">
          <p>
            Anda telah membuat janji temu pada tanggal{" "}
            <span className="font-semibold">
              {format(bookedService.appointmentDate!, "PPP HH:mm", {
                locale: id,
              })}
            </span>
            <span>
              {"("}
              {formatDistance(bookedService.appointmentDate!, new Date(), {
                locale: id,
              })}{" "}
              lagi.{")"}
            </span>
          </p>
          <p>
            Silakan donwload formulir yang telah diisi, dan bawa ke KBRI pada
            hari yang telah ditentukan.
          </p>
        </div>
        <ListServiceForm
          bookedServiceId={bookedService.id}
          serviceForms={sfs}
        />

        <div className="py-4">
          Jangan lupa membawa dokumen pendukung lainnya.
        </div>
      </FormContainer>
    </BookedServiceIdContainer>
  );
};

export default VisitPage;
