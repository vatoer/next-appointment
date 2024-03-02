"use client";
import { useRouter } from "next/navigation";
import { scheduleAppointment } from "../_actions";
import SlotPicker from "./slot-picker";

const AppointmentForm = ({ bookedServiceId }: { bookedServiceId: string }) => {
  const router = useRouter();
  const onSchedule = async (slotPicked: Date) => {
    const schedule = await scheduleAppointment(bookedServiceId, slotPicked);
    console.log(schedule);
    if (!schedule.errors) {
      // redirect to appointment page
      router.push(`visit`);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <SlotPicker onSchedule={onSchedule} />
    </div>
  );
};

export default AppointmentForm;
