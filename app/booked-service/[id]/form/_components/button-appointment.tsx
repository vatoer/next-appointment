import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BookedService,
  StepName,
} from "@/prisma/db-appointment/generated/client";
import { bookedServiceStatusToRoute } from "@/routes";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface IButtonAppointmentProps {
  bookedService: BookedService;
}
const ButtonAppointment = ({ bookedService }: IButtonAppointmentProps) => {
  const enabled =
    bookedService.status === StepName.APPOINTMENT &&
    bookedService.appointmentDate === null;
  return (
    // create button to link to appointment page
    <Button
      className={cn(!enabled ? "bg-muted-foreground" : "")}
      disabled={!enabled}
    >
      <Link
        href={bookedServiceStatusToRoute(
          bookedService.id,
          bookedService.status
        )}
        className="flex flex-row gap-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Buat Janji temu</span>
      </Link>
    </Button>
  );
};

export default ButtonAppointment;
