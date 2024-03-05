import { dbAppointment } from "@/lib/db-appointment";
import { cn } from "@/lib/utils";
import { AccordionLayanan } from "./accordion-layanan";

export const ListLayananPaspor = async () => {
  const layananPaspor = await dbAppointment.service.findMany({
    where: {
      categoryId: "paspor",
    },
    include: {
      serviceRequirements: true,
    },
  });

  return (
    <div className={cn("w-full grid gap-2")}>
      {layananPaspor.map((service) => (
        <AccordionLayanan
          key={service.id}
          layanan={service}
          syarat={service.serviceRequirements}
        />
      ))}
    </div>
  );
};

export default ListLayananPaspor;
