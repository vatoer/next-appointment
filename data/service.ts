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

export const getServiceById = async (id: string) => {
  const service = await dbAppointment.service.findUnique({
    where: {
      id,
    },
    include: {
      serviceRequirements: true,
    },
  });
  return service;
};

export const getServices = async () => {
  const services = await dbAppointment.service.findMany({
    include: {
      category: true,
    },
  });
  return services;
};

export const getCategories = async () => {
  const categories = await dbAppointment.category.findMany({
    include: {
      services: true,
    },
  });
  return categories;
};
