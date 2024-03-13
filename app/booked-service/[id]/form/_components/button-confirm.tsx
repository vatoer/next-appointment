"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GiConfirmed } from "react-icons/gi";
import { confirmFilledForms } from "../_actions";
import { IFilledForm } from "../_actions/queries/filledForm";

interface IButtonConfirmProps {
  bookedServiceId: string;
  filledForm: string;
}
const ButtonConfirm = ({
  bookedServiceId,
  filledForm,
}: IButtonConfirmProps) => {
  const obj: IFilledForm = JSON.parse(filledForm);
  console.log(obj);

  const handleSubmit = async () => {
    console.log("submitting form");
    const cfmFilledForms = await confirmFilledForms(bookedServiceId);
    console.log(cfmFilledForms);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        className={cn(
          "flex flex-row gap-2",
          !(obj.filled === obj.totalForms) || obj.final === obj.totalForms
            ? "bg-muted-foreground"
            : ""
        )}
        variant={"default"}
        onClick={handleSubmit}
        disabled={
          !(obj.filled === obj.totalForms) || obj.final === obj.totalForms
        }
      >
        <GiConfirmed />
        <span>Konfirmasi formulir</span>
      </Button>
    </div>
  );
};

export default ButtonConfirm;
