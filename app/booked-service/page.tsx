import { getBookedServiceByUserId } from "@/data/booked-service";
import { auth } from "../(auth)/auth";
import Card from "../(public)/service/_components/card";
import ListLayananCategory from "../(public)/service/_components/list-layanan-category";
import BookedServiceTable from "./_components/booked-service-table";

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

      <div className="bg-pickled-bluewood-50  flex flex-col  items-center justify-center rounded-lg p-0 pb-28">
        <h1 className="h-[48px] text-lg text-center text-primary font-semibold">
          Daftar Layanan Tersedia
        </h1>
        <div className="w-full md:grid md:grid-cols-3 gap-8 flexf flex-col">
          <div className="my-1">
            <Card title="Layanan Paspor">
              <div>
                <div className="flex flex-col">
                  <ListLayananCategory categoryId="paspor" />
                </div>
              </div>
            </Card>
          </div>
          <div className="my-1">
            <Card title="Layanan Dokumen">
              <div>
                <div className="flex flex-col">
                  <ListLayananCategory categoryId="suket" />
                </div>
              </div>
            </Card>
          </div>
          <div className="my-1">
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
    </div>
  );
};

export default BookedServicePage;
