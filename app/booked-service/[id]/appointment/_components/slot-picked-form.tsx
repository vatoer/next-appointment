import { Button } from "@/components/ui/button";

interface ISlotPickedFormProps {
  slotPicked: Date | null;
  onSchedule: (slotPicked: Date) => void;
}

export const SlotPickedForm = ({
  slotPicked,
  onSchedule,
}: ISlotPickedFormProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      {slotPicked ? (
        <>
          <span>
            {slotPicked.toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <div>
            <Button onClick={() => onSchedule(slotPicked)}>
              Schedule my appointment
            </Button>
          </div>
        </>
      ) : (
        <>
          <span>Pick a slot to schedule an appointment</span>
          <div>
            <Button disabled={slotPicked ? false : true}>
              Schedule my appointment
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SlotPickedForm;
