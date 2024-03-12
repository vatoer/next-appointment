import { dbAppointment } from "@/lib/db-appointment";

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
