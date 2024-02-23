"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Locale, format, getYear } from "date-fns";
import { enGB, id } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";
import YmPicker from "./ym-date-picker";

//export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export interface ICalendarOptions {
  locale?: Locale;
  date?: Date;
  fromDate?: Date;
  toDate?: Date;
  dateFormat?: string;
}

interface IDatePickerProps {
  calendarOptions?: ICalendarOptions;
  date?: Date;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  error: FieldError | undefined;
  className?: string;
  withYmPicker?: boolean;
  onSelect?: (date: Date) => void;
}

export type InputDatePickerProps = IDatePickerProps & CalendarProps;

export const defaultCalendarOptions: ICalendarOptions = {
  locale: id,
  date: new Date(),
  fromDate: new Date(getYear(new Date()), 0, 1),
  toDate: new Date(getYear(new Date()), 11, 31),
  dateFormat: "yyyy-MM-dd", // 'dd-MM-yyyy' or 'yyyy-MM-dd
};
const InputDatePicker = ({
  calendarOptions = defaultCalendarOptions,
  label,
  register,
  setValue,
  name,
  error,
  type = "text",
  className,
  withYmPicker = true,
  onSelect,
  ...props
}: InputDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(calendarOptions.date);
  const [ymDate, setYmDate] = useState<Date | undefined>(date);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSelect: SelectSingleEventHandler = (newDate) => {
    setDate(newDate ?? date);
    setIsPopoverOpen(false);
    if (newDate) {
      const newDateStr = format(
        newDate,
        calendarOptions?.dateFormat ?? "yyyy-MM-dd",
        {
          locale: calendarOptions.locale,
        }
      );
      setValue(name, newDateStr, { shouldValidate: true });
      onSelect && onSelect(newDate);
    }
  };

  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);

  return (
    <div className={cn("flex flex-col mb-2", className && className)}>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className={cn("flex flex-col w-full ")}>
            <label htmlFor={name} className="text-sm">
              {label}
            </label>
            <div className="relative group">
              <CalendarIcon className="absolute top-2 ml-2 text-gray-300" />
              <input
                placeholder="yyyy-mm-dd"
                readOnly
                required
                pattern="\d{4}-\d{2}-\d{2}"
                type={"text"}
                id={name}
                {...register(name, {
                  onChange: (e) => {
                    console.log("e", e);
                  },
                })}
                className={cn(
                  "form-control block w-full px-1 pl-10 py-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none peer"
                )}
              />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {withYmPicker && (
            <YmPicker
              fromDate={calendarOptions.fromDate}
              toDate={calendarOptions.toDate}
              onSelect={setYmDate}
              date={date}
              locale={calendarOptions.locale}
            />
          )}
          <Calendar
            mode="single"
            locale={calendarOptions.locale}
            selected={date}
            onSelect={handleSelect}
            fromDate={calendarOptions.fromDate}
            toDate={calendarOptions.toDate}
            month={ymDate ?? date}
            onMonthChange={setYmDate}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputDatePicker;
