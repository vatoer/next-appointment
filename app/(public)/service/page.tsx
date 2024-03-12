import { auth } from "@/app/(auth)/auth";
import RegisterForm from "@/app/(auth)/signup/_components/register-form";
import { Navbar } from "@/components/navigations/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Card from "./_components/card";
import CardLayananCategory from "./_components/card-layanan-category";
import ListLayananCategory from "./_components/list-layanan-category";

const LandingPage = async () => {
  const session = await auth();
  const user = session?.user;
  const isLogin = !!user;
  return (
    <div className="w-full flex flex-col">
      <div className="w-full min-h-[900px] md:grid md:grid-cols-3 gap-8 p-8  bg-blue-900 bg-opacity-70">
        <div className="py-1">
          <Card title="Layanan Paspor">
            <div>
              <div className="flex flex-col">
                <ListLayananCategory categoryId="paspor" />
              </div>
            </div>
          </Card>
        </div>
        <div className="py-1">
          <Card title="Layanan Dokumen">
            <div>
              <div className="flex flex-col">
                <ListLayananCategory categoryId="suket" />
              </div>
            </div>
          </Card>
        </div>
        <div className="py-1">
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

export default LandingPage;
