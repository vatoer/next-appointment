import { dbAppointment } from "@/lib/db-appointment";
import Card from "./_components/card";
import CardContent from "./_components/card-content";
import CardLayanan from "./_components/card-layanan";
import CardWnGanda from "./_components/card-wn-ganda";
import SyaratUmum from "./_components/syarat-umum";

const ServicePage = async () => {
  const layananPaspor = await dbAppointment.service.findMany({
    where: {
      categoryId: "paspor",
    },
    include: {
      serviceRequirements: true,
    },
  });

  //console.log(layananPaspor);

  return (
    <div className="w-full items-center">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900">Pelayanan Paspor</h1>
        <h1 className="text-xl font-bold text-gray-900 m-5">
          Persyaratan Umum
        </h1>
        <SyaratUmum />
      </div>
      <h1 className="text-center text-xl font-bold text-gray-900 m-10">
        Pilih layanan yang anda butuhkan
      </h1>
      <div className="w-full grid md:grid-cols-3 gap-8 ">
        {layananPaspor.map((service) => (
          <CardLayanan
            key={service.id}
            layanan={service}
            syarat={service.serviceRequirements}
          />
        ))}
      </div>
      <h1 className="text-center text-xl font-bold text-gray-900 m-10">
        Biaya Layanan
      </h1>
    </div>
  );
};
export default ServicePage;
