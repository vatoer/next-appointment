import { auth } from "@/app/(auth)/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Service, ServiceRequirement } from "@prisma-appointmendDb/client";
import Link from "next/link";
import Card from "./card";
import CardButton from "./card-button";
import CardContent from "./card-content";
import CardListSyarat from "./card-list-syarat";

interface ICardLayananProps {
  layanan: Service;
  syarat: ServiceRequirement[];
}

export const CardLayanan = async ({ layanan, syarat }: ICardLayananProps) => {
  const session = await auth();
  const user = session?.user;

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
        <div className="flex flex-row gap-2">
          {user && <CardButton serviceId={layanan.id} title="Apply" />}
          <Button className="my-5" variant={"outline"}>
            <Link href={`/service/${layanan.id}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardLayanan;
