const FormLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <div className="flex flex-col items-center">
        <div className="w-full px-5 md:w-1/2">{children}</div>
        <div>another div</div>
      </div>
    </main>
  );
};

export default FormLayout;
