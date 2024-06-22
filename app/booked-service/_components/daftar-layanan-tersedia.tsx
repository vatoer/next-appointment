import Card from "@/app/(public)/service/_components/card";
import ListLayananCategory from "@/app/(public)/service/_components/list-layanan-category";

const DaftarLayananTersedia = () => {
  return (
    <div className="  flex flex-col  items-center justify-center rounded-lg  pb-28">
      <h1 className=" p-2 rounded-t-lg rounded-b-none w-full h-[48px] text-lg text-center  font-semibold">
        Daftar Layanan Tersedia
      </h1>
      <div className="w-full md:grid md:grid-cols-3 gap-8 flexf flex-col p-4">
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
  );
};

export default DaftarLayananTersedia;
