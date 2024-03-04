const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full items-center flex flex-col">
      <div className="w-full max-w-5xl p-2 pb-10 shadow-lg border rounded-md flex flex-col items-center ">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
