import { dbAppointment } from "@/lib/db-appointment";
import {
  FilledForm,
  Form,
  ServiceForm,
} from "@/prisma/db-appointment/generated/client";
import { redirect } from "next/navigation";
import { isAllrequiredFormFilled } from "./_actions/queries/filledForm";
import ButtonAppointment from "./_components/button-appointment";
import ButtonConfirm from "./_components/button-confirm";
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

  const serviceForms = await dbAppointment.serviceForm.findMany({
    where: {
      serviceId: bookedService.serviceId,
    },
    include: {
      form: {
        include: {
          filledForms: { where: { bookedServiceId: bookedService.id } },
        },
      },
    },
  });

  const isAllRequiredFormsFilled = await dbAppointment.serviceForm.findMany({
    where: {
      serviceId: bookedService.serviceId,
      form: {
        filledForms: {
          some: {
            status: "final",
          },
        },
      },
    },
    include: {
      form: {
        include: {
          filledForms: {
            where: { bookedServiceId: bookedService.id },
          },
        },
      },
    },
  });

  const filledForms = await isAllrequiredFormFilled(bookedService.id);

  console.log("filledForms", filledForms);

  return (
    <div>
      <h1>Silakan mengisi formulir berikut</h1>
      <div>
        <ListFormsForService
          forms={serviceForms}
          bookedServiceId={bookedService.id}
          serviceId={bookedService.serviceId}
        />
        <ButtonConfirm bookedServiceId={bookedService.id} />
        <ButtonAppointment bookedServiceId={bookedService.id} />
      </div>
    </div>
  );
};

export default FormIdPage;
