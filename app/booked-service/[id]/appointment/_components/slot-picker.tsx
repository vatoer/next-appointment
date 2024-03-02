"use client";
import DatePicker from "@/components/date-picker/date-picker";
import { Button } from "@/components/ui/button";
import { useDatePicker } from "@/hooks/use-date-picker";
import { useDaysOff } from "@/hooks/use-days-off";
import { useSlot } from "@/hooks/use-slot";
import { scheduleAppointment } from "../_actions";
import SlotPickedForm from "./slot-picked-form";
import WeeklySlotPicker from "./weekly-slot-picker";

const SlotPicker = ({
  onSchedule,
}: {
  onSchedule: (slotPicked: Date) => void;
}) => {
  const datePicked = useDatePicker((state) => state.dt); // using hooks
  const slotPicked = useSlot((state) => state.dt); // using hooks
  //const offDays = useDaysOff(); // using hooks
  const onSelect = useDatePicker((state) => state.setDate); // using hooks
  const handleOnSchedule = (data: { slotPicked: Date }) => {
    console.log(data);
    onSchedule(data.slotPicked);
  };

  // get 6 months from now
  const toDate = new Date();
  toDate.setMonth(toDate.getMonth() + 6);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col items-center gap-2 m-2">
        <SlotPickedForm slotPicked={slotPicked} onSchedule={handleOnSchedule} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <div className="md:float-end">
            <DatePicker
              onSelect={onSelect}
              toDate={toDate}
              fromDate={new Date()}
            />
          </div>
        </div>

        <WeeklySlotPicker startDate={datePicked} />
      </div>
    </div>
  );
};

export default SlotPicker;
