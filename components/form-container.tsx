const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full items-center flex flex-col">
      <div className="p-2 pb-10 shadow-lg border rounded-md max-w-5xl">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
