import { dbAppointment } from "@/lib/db-appointment";
import { cn } from "@/lib/utils";
import { random } from "lodash";

//https://dev.to/jetthoughts/how-to-create-triangles-in-tailwindcss-2in

interface IStepProps {
  active: boolean;
  label: string | number;
}
export const Step = ({ active, label }: IStepProps) => {
  return (
    <div className="w-full flex flex-row ">
      {/* <div
        className={cn(
          `w-0 h-0 
          border-t-[40px] border-t-pickled-bluewood-200
          border-l-[50px] border-l-transparent
          border-b-[40px] border-b-pickled-bluewood-200`,
          active && "border-t-pickled-bluewood-500 border-b-pickled-bluewood-500"
        )}
      /> */}
      <div
        className={cn(
          " flex items-center pl-2 relative",
          active && "bg-pickled-bluewood-500"
        )}
      >
        <span className="font-semibold text-wrap text-slate-800 ">{label}</span>
      </div>
      <div
        className={cn(
          `w-0 h-0 
          border-t-[32px] border-t-transparent 
          border-l-[15px] border-l-pickled-bluewood-200
          border-b-[32px] border-b-transparent`,
          active && "border-l-pickled-bluewood-500"
        )}
      />
    </div>
  );
};

export const Steps = async ({
  bookedServiceId,
}: {
  bookedServiceId: string;
}) => {
  const bookedService = await dbAppointment.bookedService.findUnique({
    where: {
      id: bookedServiceId,
    },
    include: {
      service: {
        select: {
          steps: true,
        },
      },
    },
  });

  const active = [true, false, false, false, false, false, false];
  //const randomActives = steps.map(() => random(0, 1) === 1);
  return (
    <div className="hidden md:w-full md:max-w-full md:flex gap-0 flex-wrap flex-row items-center bg-pickled-bluewood-200">
      {bookedService?.service.steps.map((step, i) => (
        <div key={i} className={`w-1/${bookedService?.service.steps.length}`}>
          <Step
            active={bookedService.status == step.name}
            label={step.description}
          />
        </div>
      ))}
    </div>
  );
};
