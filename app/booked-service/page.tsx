import { getBookedServiceByUserId } from "@/data/booked-service";
import { auth } from "../(auth)/auth";
import Card from "../(public)/service/_components/card";
import BookedServiceTable from "./_components/booked-service-table";
import DaftarLayananTersedia from "./_components/daftar-layanan-tersedia";

const BookedServicePage = async () => {
  const session = await auth();
  const userId = session?.user?.id!; // pasti ada karena sudah di auth
  //console.log("userId", session?.user?.id);

  const bookedService = await getBookedServiceByUserId(userId);

  return (
    <div className="p-2 flex flex-col justify-between gap-8 ">
      <div className="">
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
      </div>
      <DaftarLayananTersedia />
    </div>
  );
};

export default BookedServicePage;
