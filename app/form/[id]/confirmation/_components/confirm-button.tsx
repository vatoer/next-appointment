"use client";
import { Button } from "@/components/ui/button";
import { setStatusAllFilledForm } from "../_actions";

interface IConfirmButtonProps {
  bookedServiceId: string;
}
const ConfirmButton = ({ bookedServiceId }: IConfirmButtonProps) => {
  console.log(bookedServiceId);
  const handleConfirm = async () => {
    const confirmFilledForm = await setStatusAllFilledForm(
      bookedServiceId,
      "final"
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
