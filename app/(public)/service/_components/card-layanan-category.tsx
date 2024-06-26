import { cn } from "@/lib/utils";
import { getServiceByCategory } from "../../../../data/service";
import CardLayanan from "./card-layanan";

interface ICardLayananCategorynProps {
  category: string;
}
export const CardLayananCategory = async ({
  category,
}: ICardLayananCategorynProps) => {
  const layananPaspor = await getServiceByCategory(category);

  return (
    <div className={cn("w-full grid md:grid-cols-3 gap-8")}>
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

export default CardLayananCategory;
