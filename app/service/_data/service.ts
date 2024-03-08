import { dbAppointment } from "@/lib/db-appointment";

export const getServiceByCategory = async (categoryId: string) => {
  const service = await dbAppointment.service.findMany({
    where: {
      categoryId,
    },
    include: {
      serviceRequirements: true,
    },
  });
  return service;
};
