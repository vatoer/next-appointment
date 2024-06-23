"use client";
import { Button } from "@/components/ui/button";
import { confirmFilledForms } from "../_actions";

interface IButtonConfirmProps {
  active: boolean;
  bookedServiceId: string;
}
const ButtonConfirm = ({ active, bookedServiceId }: IButtonConfirmProps) => {
  if (!active) return null;

  const handleSubmit = async () => {
    console.log("submitting form");
    const cfmFilledForms = await confirmFilledForms(bookedServiceId);
    console.log(cfmFilledForms);
  };

  return (
    <Button className="" variant={"default"} onClick={handleSubmit}>
      Konfirmasi formulir
    </Button>
  );
};

export default ButtonConfirm;
