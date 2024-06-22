import Card from "@/app/(public)/service/_components/card";
import ListLayananCategory from "@/app/(public)/service/_components/list-layanan-category";

const DaftarLayananTersedia = () => {
  return (
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
  );
};

export default DaftarLayananTersedia;
