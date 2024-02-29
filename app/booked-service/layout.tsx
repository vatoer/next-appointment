const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full">
      <div className="bg-slate-500 h-[36px] lg:pl-56 fixed inset-y-0 w-full z-50">
        navbar
      </div>
      <main className="lg:pl-56 pt-[42px] flex flex-col items-center">
        {children}
      </main>
      ;
    </div>
  );
};

export default FormLayout;
