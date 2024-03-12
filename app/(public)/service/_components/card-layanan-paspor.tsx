import { dbAppointment } from "@/lib/db-appointment";
import { cn } from "@/lib/utils";
import { getServiceByCategory } from "../_data/service";
import CardLayanan from "./card-layanan";

export const CardLayananPaspor = async () => {
  const layananPaspor = await getServiceByCategory("paspor");

  return (
    <div className={cn("w-full grid md:grid-cols-3 gap-2")}>
      {layananPaspor.map((service) => (
        <CardLayanan
          key={service.id}
          layanan={service}
          syarat={service.serviceRequirements}
        />
      ))}
    </div>
  );
};

export default CardLayananPaspor;
