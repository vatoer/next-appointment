const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center shadow-lg border rounded-md p-6">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
};

export default FormContainer;
