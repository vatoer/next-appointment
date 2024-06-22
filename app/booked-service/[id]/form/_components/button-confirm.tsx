"use client";
import { Button } from "@/components/ui/button";
import { FormsTotalResult } from "@/data/filledForm";
import Link from "next/link";
import { confirmFilledForms } from "../_actions";

interface IButtonConfirmProps {
  bookedServiceId: string;
  filledForm: string;
}
const ButtonConfirm = ({
  bookedServiceId,
  filledForm,
}: IButtonConfirmProps) => {
  const obj: FormsTotalResult = JSON.parse(filledForm);
  console.log(obj);

  const handleSubmit = async () => {
    console.log("submitting form");
    const cfmFilledForms = await confirmFilledForms(bookedServiceId);
    console.log(cfmFilledForms);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        className=""
        variant={"default"}
        onClick={handleSubmit}
        disabled={
          !(obj.filled === obj.totalForms) || obj.confirmed === obj.totalForms
        }
      >
        Konfirmasi formulir
      </Button>
    </div>
  );
};

export default ButtonConfirm;
