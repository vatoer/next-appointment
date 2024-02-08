import { Checkbox } from "@/components/ui/checkbox";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

interface ICheckboxPersetujuanProps {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error: FieldError | undefined;
  trigger: UseFormTrigger<any>;
  children: React.ReactNode;
}
const CheckboxPersetujuan = ({
  name,
  register,
  setValue,
  error,
  trigger,
  children,
}: ICheckboxPersetujuanProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2 mt-4">
        <Checkbox
          id={name}
          {...register(name, { required: true })}
          onCheckedChange={async (e: boolean) => {
            console.log("e", e);
            setValue(name, e, { shouldValidate: true });
            await trigger(name);
          }}
        />
        <label
          htmlFor={name}
          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {children}
        </label>
      </div>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default CheckboxPersetujuan;
