import { Separator } from "@/components/ui/separator";
import { FormEventHandler } from "react";

interface IFormProps {
  title: string;
  subTitle?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
}

const Form = ({ title, subTitle, onSubmit, children }: IFormProps) => {
  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold mb-4 w-full text-center">
          {title}
        </h1>
        <Separator />
        {subTitle && <h1 className="text-md font-semibold">{subTitle}</h1>}
      </div>
      {children}
    </form>
  );
};

export default Form;
