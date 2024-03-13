import { Navbar } from "@/components/navigations/navbar";

const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="bg-blue-900 backdrop-blur  h-[48px] fixed inset-y-0 w-full z-50 shadow-lg flex flex-col items-center">
        <div className="w-full lg:w-5/6 2xl:w-7/12 text-white p-2">
          <Navbar />
        </div>
      </div>
      <main className="pt-[48px] flex flex-col items-center w-full h-full ">
        <div className="bg-blue-100/10 w-full pb-12 lg:w-5/6 2xl:w-7/12 shadow-lg h-full rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FormLayout;
