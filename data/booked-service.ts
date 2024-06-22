import { dbAppointment } from "@/lib/db-appointment";

/**
 *
 * @param id
 * @param formId
 * @returns
 */
export const getBookedService = async (id: string, formId: string) => {
  const bookedService = await dbAppointment.bookedService.findFirst({
    where: {
      id,
    },
    include: {
      filledForms: {
        where: {
          formId,
        },
      },
    },
  });
  return bookedService;
};

// check if the service has a form to be filled
export const getServiceForm = async (serviceId: string, formId: string) => {
  const serviceForm = await dbAppointment.serviceForm.findFirst({
    where: {
      serviceId,
      formId,
    },
  });
  return serviceForm;
};

export const getFilledForm = async (
  bookedServiceId: string,
  formId: string
) => {
  const filledForms = await dbAppointment.filledForm.findUnique({
    where: {
      formId_bookedServiceId: {
        formId: formId,
        bookedServiceId: bookedServiceId,
      },
    },
  });
  return filledForms;
};

export const getBookedServiceByUserId = async (userId: string) => {
  const services = await dbAppointment.bookedService.findMany({
    include: {
      service: true,
    },
    where: {
      createdBy: userId,
    },
  });
  return services;
};
