import { Navbar } from "@/components/navigations/navbar";
import { Steps } from "./[id]/_components/step";

const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="bg-slate-500 h-[36px] fixed inset-y-0 w-full z-50 shadow-lg flex flex-col items-center">
        <div className="w-full lg:w-5/6 2xl:w-7/12">
          <Navbar />
        </div>
      </div>
      <main className="pt-[36px] flex flex-col items-center w-full h-full ">
        <div className="w-full lg:w-5/6 2xl:w-7/12 shadow-lg pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FormLayout;
