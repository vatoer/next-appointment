const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <div className="flex flex-col items-center">
        <div className="w-full px-5 lg:w-5/6 2xl:w-7/12">{children}</div>
        <div>another div</div>
      </div>
    </main>
  );
};

export default FormLayout;
