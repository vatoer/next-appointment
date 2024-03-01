"use client";
import { cn } from "@/lib/utils";
import { random } from "lodash";

//https://dev.to/jetthoughts/how-to-create-triangles-in-tailwindcss-2in
export const Step = ({ active, next }: { active: boolean; next: boolean }) => {
  return (
    <div className="flex flex-row">
      <div
        className={cn(
          `w-0 h-0 
          border-t-[40px] border-t-slate-400
          border-l-[50px] border-l-transparent
          border-b-[40px] border-b-slate-400`,
          active && "border-t-slate-500 border-b-slate-500"
        )}
      />
      <div className={cn(" flex items-center pl-2", active && "bg-slate-500")}>
        <span>schedule an Apppointment long text</span>
      </div>
      <div
        className={cn(
          `w-0 h-0 
          border-t-[40px] border-t-transparent 
          border-l-[50px] border-l-slate-400
          border-b-[40px] border-b-transparent`,
          active && "border-l-slate-500"
        )}
      />
    </div>
  );
};

export const Steps = () => {
  const actives = [false, false, true, false];
  return (
    <div className="hidden md:flex flex-row items-center bg-slate-400">
      {actives.map((active, i) => (
        <Step key={i} active={active} next={actives[i + 1]} />
      ))}
    </div>
  );
};
