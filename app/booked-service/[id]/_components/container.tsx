import { Steps } from "./step";

const BookedServiceIdContainer = ({
  children,
  bookedServiceId,
}: {
  children: React.ReactNode;
  bookedServiceId: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <Steps bookedServiceId={bookedServiceId} />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default BookedServiceIdContainer;
