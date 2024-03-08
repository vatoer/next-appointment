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
import CardButton from "./card-button";
import ListSyarat from "./list-syarat";

interface IAccordionLayananProps {
  layanan: Service;
  syarat: ServiceRequirement[];
  isLogin: boolean;
}

export const AccordionLayanan = ({
  layanan,
  syarat,
  isLogin,
}: IAccordionLayananProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="" value="item-1">
        <AccordionTrigger className="text-start">
          {layanan.name}
        </AccordionTrigger>
        <AccordionContent>
          <ListSyarat syarat={syarat} />
          {isLogin && <CardButton serviceId={layanan.id} title="Apply" />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
