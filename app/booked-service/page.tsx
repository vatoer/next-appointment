import CardLayananPaspor from "@/app/service/_components/card-layanan-paspor";
import { dbAppointment } from "@/lib/db-appointment";
import { bookedServiceStatusToRoute } from "@/routes";
import Link from "next/link";
import Card from "../service/_components/card";
import ListLayananPaspor from "../service/_components/list-layanan-paspor";

const BookedServicePage = async () => {
  const bookedService = await dbAppointment.bookedService.findMany({
    include: {
      service: true,
    },
  });

  return (
    <div className="p-2 flex flex-col gap-8">
      <Card title="Layanan yang telah dibooking">
        <div>
          {bookedService.length === 0 ? (
            <div>Anda belum mempunyai riwayat pengajuan layanan</div>
          ) : (
            <div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="w-1/3 p-2 border">Nomor Permohonan</div>
                  <div className="w-1/3 p-2 border">Layanan</div>
                  <div className="w-1/3 p-2 border">Status</div>
                </div>
                {bookedService.map((bs) => {
                  const firstPart = bs.id.split("-")[0];
                  const href = bookedServiceStatusToRoute(bs.id, bs.status);
                  return (
                    <div key={bs.id} className="flex flex-row">
                      <div className="w-1/3 p-2 border">{firstPart}</div>

                      <div className="w-1/3 p-2 border">
                        <Link className="text-blue-500 underline" href={href}>
                          <div>{bs.service.description}</div>
                        </Link>
                      </div>
                      <div className="w-1/3 p-2 border">{bs.status}</div>
                    </div>
                  );
                })}
              </div>
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
