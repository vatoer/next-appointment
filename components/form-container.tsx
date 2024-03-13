const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full items-center flex flex-col mt-2">
      <div className="w-full max-w-5xl p-4 md:p-2 pb-10 2xl:shadow-lg 2xl:border rounded-md flex flex-col items-center ">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
