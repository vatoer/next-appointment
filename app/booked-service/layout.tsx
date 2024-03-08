import { Navbar } from "@/components/navigations/navbar";
import { Steps } from "./[id]/_components/step";

const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full flex flex-col items-center bg-gray-100">
      <div className="bg-blue-900 h-[48px] fixed inset-y-0 w-full z-50 shadow-lg flex flex-col items-center">
        <div className="w-full lg:w-5/6 2xl:w-7/12 text-white">
          <Navbar />
        </div>
      </div>
      <main className="pt-[48px] flex flex-col items-center w-full h-full ">
        <div className="w-full min-h-[800px] pb-12 lg:w-5/6 2xl:w-7/12 shadow-lg bg-white rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FormLayout;
