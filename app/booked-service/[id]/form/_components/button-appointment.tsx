import { Button } from "@/components/ui/button";
import { bookedServiceStatusToRoute } from "@/routes";
import { BookedService } from "@prisma-appointmendDb/client";
import Link from "next/link";

interface IButtonAppointmentProps {
  active: boolean;

  bookedService: BookedService;
}
const ButtonAppointment = ({
  active,
  bookedService,
}: IButtonAppointmentProps) => {
  if (!active) return null;
  return (
    // create button to link to appointment page
    <Button>
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
