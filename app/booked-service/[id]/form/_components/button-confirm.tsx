"use client";
import { Button } from "@/components/ui/button";
import { FormsTotalResult } from "@/data/filledForm";
import { confirmFilledForms } from "../_actions";

interface IButtonConfirmProps {
  active: boolean;
  bookedServiceId: string;
  filledForm: string;
}
const ButtonConfirm = ({
  active,
  bookedServiceId,
  filledForm,
}: IButtonConfirmProps) => {
  if (!active) return null;

  const obj: FormsTotalResult = JSON.parse(filledForm);
  console.log(obj);

  const handleSubmit = async () => {
    console.log("submitting form");
    const cfmFilledForms = await confirmFilledForms(bookedServiceId);
    console.log(cfmFilledForms);
  };

  const enabled =
    obj.filled === obj.totalForms || obj.confirmed === obj.totalForms;

  if (!enabled) return null;

  return (
    <Button className="" variant={"default"} onClick={handleSubmit}>
      Konfirmasi formulir
    </Button>
  );
};

export default ButtonConfirm;
