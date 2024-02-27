"use client";
import { Button } from "@/components/ui/button";
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

  if (obj.filled < obj.totalForms) {
    return (
      <Button className="" variant={"default"} disabled>
        Please fill all forms
      </Button>
    );
  } else {
    return (
      <Button className="" variant={"default"} onClick={handleSubmit}>
        Confirm Form
      </Button>
    );
  }
};

export default ButtonConfirm;
