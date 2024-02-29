"use client";
import { scheduleAppointment } from "../_actions";
import SlotPicker from "./slot-picker";

const AppointmentForm = ({ bookedServiceId }: { bookedServiceId: string }) => {
  const onSchedule = async (slotPicked: Date) => {
    const schedule = await scheduleAppointment(bookedServiceId, slotPicked);
    console.log(schedule);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <SlotPicker onSchedule={onSchedule} />
    </div>
  );
};

export default AppointmentForm;
