import CardLayananPaspor from "@/app/service/_components/card-layanan-paspor";
import { dbAppointment } from "@/lib/db-appointment";
import { bookedServiceStatusToRoute } from "@/routes";
import Link from "next/link";
import Card from "../service/_components/card";
import ListLayananCategory from "../service/_components/list-layanan-category";
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
            <div>
              <p>Anda belum mempunyai riwayat pengajuan layanan</p>
              <p>Silakan pilih layanan yang tersedia di bawah ini</p>
            </div>
          ) : (
            <div>
              <BookedServiceTable data={bookedService} />
            </div>
          )}
        </div>
      </Card>

      <div className="w-full md:grid md:grid-cols-3 gap-8">
        <div>
          <Card title="Layanan Paspor">
            <div>
              <div className="flex flex-col">
                <ListLayananCategory categoryId="paspor" />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Layanan Dokumen">
            <div>
              <div className="flex flex-col">
                <ListLayananCategory categoryId="suket" />
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Layanan Legalisasi">
            <div>
              <div className="flex flex-col">
                <ListLayananCategory categoryId="legalisasi" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookedServicePage;
