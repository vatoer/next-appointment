"use client";
import { Button } from "@/components/ui/button";
import { confirmFilledForms } from "../_actions";

interface IButtonConfirmProps {
  bookedServiceId: string;
}
const ButtonConfirm = ({ bookedServiceId }: IButtonConfirmProps) => {
  const handleSubmit = async () => {
    console.log("submitting form");
    const cfmFilledForms = await confirmFilledForms(bookedServiceId);
    console.log(cfmFilledForms);
  };

  return (
    <Button className="" variant={"default"} onClick={handleSubmit}>
      Confirm Form
    </Button>
  );
};

export default ButtonConfirm;
