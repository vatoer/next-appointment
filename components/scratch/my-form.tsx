"use client";
import DatePicker from "@/components/date-picker.tsx/date-picker";
import InputDatePicker from "@/components/date-picker.tsx/input-date-picker";
import InputForm from "@/components/input-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const genericDateSchema = z.coerce.date();
export const spriSchema = z.object({
  name: z.string().min(3).max(255),
  birthDate: genericDateSchema,
  journeyDate: genericDateSchema,
});

type FormData = z.infer<typeof spriSchema>;

const MyForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(spriSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("oie");
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputForm
        label="Name"
        name="name"
        register={register}
        error={errors.name}
      />

      <InputDatePicker
        fromDate={new Date("2021-01-01")}
        label="Birth Date"
        name="birthDate"
        register={register}
        setValue={setValue}
        error={errors.birthDate}
      />

      <InputDatePicker
        fromDate={new Date("2021-01-01")}
        label="Journe Date"
        name="journeyDate"
        register={register}
        setValue={setValue}
        error={errors.journeyDate}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default MyForm;
