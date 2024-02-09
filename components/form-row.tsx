const FormRow = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <div className="has-[:focus]:bg-gray-200 flex flex-col px-2 ">
    {title && <h3 className="text-sm font-semibold">{title}</h3>}
    <div className="flex flex-col md:flex-row md:gap-2 rounded-sm">
      {children}
    </div>
  </div>
);

export default FormRow;
