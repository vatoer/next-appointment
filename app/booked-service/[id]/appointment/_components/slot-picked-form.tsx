import CheckboxPersetujuan from "@/components/checkbox-persetujuan";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "module";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const appointmentSchema = z.object({
  slotPicked: z.date(),
  setuju: z.literal<boolean>(true, {
    errorMap: () => ({
      message:
        "please check the checkbox to confirm that you understand that you cannot change the schedule after you click the button &quot;Schedule my appointment&quot; below",
    }),
  }),
});

type TFormData = z.infer<typeof appointmentSchema>;

interface ISlotPickedFormProps {
  slotPicked: Date | null;
  onSchedule: (data: TFormData) => void;
}

export const SlotPickedForm = ({
  slotPicked,
  onSchedule,
}: ISlotPickedFormProps) => {
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(appointmentSchema),
  });

  useEffect(() => {
    if (slotPicked) {
      setValue("slotPicked", slotPicked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotPicked]);

  return (
    <div className="flex flex-col items-center text-center">
      {slotPicked ? (
        <>
          <span className="font-semibold text-2xl">
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
            {/* 
            create checkbox to confirm to user that he/she is aware that he/she cannot change the schedule after this
            */}
            <form onSubmit={handleSubmit(onSchedule)}>
              <CheckboxPersetujuan
                name="setuju"
                register={register}
                setValue={setValue}
                trigger={trigger}
                error={errors.setuju}
              >
                I understand that I cannot change the schedule after I click the
                button &#34;Schedule my appointment&#34; below
              </CheckboxPersetujuan>
              <div>
                <Button
                  type="submit"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8V4a4 4 0 00-4 4H0v4h4a8 8 0 01-4-8z"
                      ></path>
                    </svg>
                  )}
                  Schedule my appointment
                </Button>
              </div>
              <div>
                {/**
                 * show error message if user doesn't pick the slot
                 * it should never happen because the button should be disabled if the slot is not picked
                 */}
                {errors.slotPicked && (
                  <span className="text-red-500">
                    {errors.slotPicked.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <span className="font-semibold m-2">
            Pick a slot to schedule an appointment
          </span>
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
