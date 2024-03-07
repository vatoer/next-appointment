import CardLayananPaspor from "@/app/service/_components/card-layanan-paspor";
import { dbAppointment } from "@/lib/db-appointment";
import { bookedServiceStatusToRoute } from "@/routes";
import Link from "next/link";
import Card from "../service/_components/card";
import ListLayananPaspor from "../service/_components/list-layanan-paspor";
import BookedServiceTable from "./_components/booked-service-table";

const BookedServicePage = async () => {
  const bookedService = await dbAppointment.bookedService.findMany({
    include: {
      service: true,
    },
  });

  return (
    <div className="p-2 flex flex-col gap-8">
      <Card title="Daftar Pengajuan Layanan">
        <div>
          {bookedService.length === 0 ? (
            <div>Anda belum mempunyai riwayat pengajuan layanan</div>
          ) : (
            <div>
              <BookedServiceTable data={bookedService} />
            </div>
          )}
        </div>
      </Card>

      <div className="w-full md:grid grid-cols-2 gap-8">
        <div>
          <Card title="Layanan Paspor">
            <div>
              <div className="flex flex-col">
                <ListLayananPaspor />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Layanan Kekonsuleran">
            <div>
              <div className="flex flex-col">
                <ListLayananPaspor />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookedServicePage;
