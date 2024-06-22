"use client";
import { Button } from "@/components/ui/button";
import { FormStatus } from "@prisma-appointmendDb/client";
import { setStatusAllFilledForm } from "../_actions";

interface IConfirmButtonProps {
  bookedServiceId: string;
}
const ConfirmButton = ({ bookedServiceId }: IConfirmButtonProps) => {
  console.log(bookedServiceId);
  const handleConfirm = async () => {
    const confirmFilledForm = await setStatusAllFilledForm(
      bookedServiceId,
      FormStatus.CONFIRMED
    );
  };

  return (
    <div className="m-2">
      <Button className="btn btn-primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmButton;
