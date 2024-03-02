"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        className=""
        variant={"default"}
        onClick={handleSubmit}
        disabled={
          !(obj.filled === obj.totalForms) || obj.final === obj.totalForms
        }
      >
        Konfirmasi formulir
      </Button>

      <Button
        className=""
        variant={"default"}
        onClick={() => {}}
        disabled={!(obj.final === obj.totalForms)}
      >
        <Link href={`appointment`}>Buat Janji Temu</Link>
      </Button>
    </div>
  );
};

export default ButtonConfirm;
