import { Navbar } from "@/components/navigations/navbar";

const PublicLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="relative min-h-screen items-center flex flex-col">
      {/* Ensure the parent div takes up at least the height of the viewport */}
      <div className="w-full lg:w-2/3 p-2 backdrop-blur h-[64px] fixed inset-y-0 z-50 bg-blue-900 text-white">
        {/* Make navbar fixed to the top */}
        <Navbar />
      </div>
      <div className="pt-[62px] flex flex-col items-center w-full min-h-screen \">
        {/* Add padding to top equal to navbar height */}
        <div className="w-full pb-12 h-full rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
