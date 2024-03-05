import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Service,
  ServiceRequirement,
} from "@/prisma/db-appointment/generated/client";
import ListSyarat from "./list-syarat";

interface IAccordionLayananProps {
  layanan: Service;
  syarat: ServiceRequirement[];
}

export const AccordionLayanan = ({
  layanan,
  syarat,
}: IAccordionLayananProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="" value="item-1">
        <AccordionTrigger className="text-start">
          {layanan.name}
        </AccordionTrigger>
        <AccordionContent>
          <ListSyarat syarat={syarat} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
