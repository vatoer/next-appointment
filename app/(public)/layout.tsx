import { Navbar } from "@/components/navigations/navbar";

const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      style={{
        backgroundImage: `url('https://source.unsplash.com/featured/?indonesia')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="bg-primary backdrop-blur  h-[48px] fixed inset-y-0 w-full z-50 shadow-lg flex flex-col items-center">
        <div className="w-full bg-blue-900  text-white p-2">
          <Navbar />
        </div>
      </div>
      <main className="pt-[48px] flex flex-col items-center w-full h-full ">
        <div className="w-full pb-12 shadow-lg bg-pickled-bluewood-50 h-full rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FormLayout;
