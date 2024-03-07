import { Button } from "@/components/ui/button";
import {
  BookedService,
  StepName,
} from "@/prisma/db-appointment/generated/client";
import { bookedServiceStatusToRoute } from "@/routes";
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
    <Button disabled={!enabled}>
      <Link
        href={bookedServiceStatusToRoute(
          bookedService.id,
          bookedService.status
        )}
      >
        Buat Janji temu
      </Link>
    </Button>
  );
};

export default ButtonAppointment;
