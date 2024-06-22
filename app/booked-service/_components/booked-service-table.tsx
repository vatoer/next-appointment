import { bookedServiceStatusToRoute } from "@/routes";
import { BookedService, Service } from "@prisma-appointmendDb/client";
import Link from "next/link";

interface IBookedServiceTableProps {
  data: Array<
    BookedService & {
      service: Service;
    }
  >;
}
const BookedServiceTable = ({ data }: IBookedServiceTableProps) => {
  return (
    <div className="overflow-x-auto bg-white shadow overflow-y-auto relative">
      <div className="hidden md:flex md:flex-row bg-gray-200/40">
        <div className="md:w-1/3 p-2 border">Nomor Permohonan</div>
        <div className="md:w-1/3 p-2 border">Layanan</div>
        <div className="md:w-1/3 p-2 border">Status</div>
      </div>
      {data.map((bs) => {
        const firstPart = bs.id.split("-")[0];
        const href = bookedServiceStatusToRoute(bs.id, bs.status);
        return (
          <div key={bs.id} className="flex flex-row">
            <div className="hidden md:block w-1/3 p-2 border ">{firstPart}</div>

            <div className=" w-2/3 md:w-1/3 p-2 border">
              <Link className="text-blue-500 underline" href={href}>
                <div>{bs.service.description}</div>
              </Link>
            </div>
            <div className="w-1/3 p-2 border">{bs.status}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BookedServiceTable;
