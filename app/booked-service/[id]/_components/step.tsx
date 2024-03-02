"use client";
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
          border-t-[40px] border-t-slate-400
          border-l-[50px] border-l-transparent
          border-b-[40px] border-b-slate-400`,
          active && "border-t-slate-500 border-b-slate-500"
        )}
      /> */}
      <div
        className={cn(
          " flex items-center pl-2 relative",
          active && "bg-slate-500"
        )}
      >
        <span className="font-semibold text-wrap text-slate-800 ">{label}</span>
      </div>
      <div
        className={cn(
          `w-0 h-0 
          border-t-[32px] border-t-transparent 
          border-l-[15px] border-l-slate-400
          border-b-[32px] border-b-transparent`,
          active && "border-l-slate-500"
        )}
      />
    </div>
  );
};

export const Steps = () => {
  const steps = [
    "Isi Formulir",
    "Konfirmasi Formulir",
    "Buat Janji",
    "Dokumen Pendukung",
    "Datang ke Kantor",
    "Proses",
    "Selesai",
  ];
  const active = [true, false, false, false, false, false, false];
  //const randomActives = steps.map(() => random(0, 1) === 1);
  return (
    <div className="hidden md:w-full md:max-w-full md:flex gap-0 flex-wrap flex-row items-center bg-slate-400">
      {steps.map((step, i) => (
        <div key={i} className={`w-1/${steps.length}`}>
          <Step active={active[i]} label={step} />
        </div>
      ))}
    </div>
  );
};
