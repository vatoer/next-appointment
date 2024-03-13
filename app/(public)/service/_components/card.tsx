const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden w-full">
      <div className="px-6 py-3 bg-blue-900/80 border-b border-gray-200">
        <h3 className="text-lg font-medium text-background">{title}</h3>
      </div>
      <div className="flex-1 p-6 bg-blue-50">{children}</div>
    </div>
  );
};

export default Card;
