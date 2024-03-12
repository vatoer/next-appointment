import { auth } from "@/app/(auth)/auth";
import { dbAppointment } from "@/lib/db-appointment";
import { cn } from "@/lib/utils";
import { getServiceByCategory } from "../_data/service";
import { AccordionLayanan } from "./accordion-layanan";

interface IListLayananCategoryProps {
  categoryId: string;
}
export const ListLayananCategory = async ({
  categoryId,
}: IListLayananCategoryProps) => {
  const layanan = await getServiceByCategory(categoryId);
  const session = await auth();
  const user = session?.user;

  return (
    <div className={cn("w-full grid gap-2")}>
      {layanan.map((service) => (
        <AccordionLayanan
          isLogin={!!user}
          key={service.id}
          layanan={service}
          syarat={service.serviceRequirements}
        />
      ))}
    </div>
  );
};

export default ListLayananCategory;
