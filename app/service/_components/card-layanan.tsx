"use client";
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
import { useRouter } from "next/navigation";
import { bookService } from "../_actions";
import Card from "./card";
import CardButton from "./card-button";
import CardContent from "./card-content";
import CardListSyarat from "./card-list-syarat";

interface ICardLayananProps {
  layanan: Service;
  syarat: ServiceRequirement[];
}

export const CardLayanan = ({ layanan, syarat }: ICardLayananProps) => {
  const router = useRouter();
  const handleApply = async () => {
    console.log("Apply");
    const bs = await bookService(layanan.id);

    if (bs.errors) {
      console.log("Error");
    } else {
      const data = bs.payload.data;
      console.log(bs.payload);
      //router.push(`/form/${data?.id}/spri`);
    }
  };
  return (
    <Card title={layanan.name}>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Documen yang harus diserahkan</AccordionTrigger>
            <AccordionContent>
              <CardListSyarat syarat={syarat} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <CardButton title="Apply" onClick={handleApply} />
      </CardContent>
    </Card>
  );
};

export default CardLayanan;
