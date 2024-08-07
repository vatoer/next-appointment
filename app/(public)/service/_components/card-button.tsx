"use client";
import { bookService } from "@/app/booked-service/_actions";
import { Button } from "@/components/ui/button";
import { bookedServiceStatusToRoute } from "@/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ICardButtonProps {
  serviceId: string;
  title: string;

  //onClick: () => void;
}

const CardButton = ({ serviceId, title }: ICardButtonProps) => {
  const router = useRouter();
  const handleApply = async () => {
    console.log("Apply");
    const bs = await bookService(serviceId);
    if (bs.errors) {
      console.log("Error", bs.errors);
    } else {
      if (!bs.payload.data) {
        toast.error("Failed to book service");
        return;
      }
      router.push(
        bookedServiceStatusToRoute(bs.payload.data.id, bs.payload.data.status)
      );
      //router.push(`/booked-service/${bs.payload.data?.id}/form`);
    }
  };
  return (
    <Button className="w-full my-5" onClick={handleApply} variant={"default"}>
      {title}
    </Button>
  );
};

export default CardButton;
