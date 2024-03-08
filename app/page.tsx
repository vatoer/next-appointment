import { Navbar } from "@/components/navigations/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { auth } from "./(auth)/auth";
import LoginForm from "./(auth)/signin/_components/login-form";
import RegisterForm from "./(auth)/signup/_components/register-form";
import Card from "./service/_components/card";
import CardLayananCategory from "./service/_components/card-layanan-category";
import CardLayananPaspor from "./service/_components/card-layanan-paspor";
import ListLayananCategory from "./service/_components/list-layanan-category";
import ListLayananPaspor from "./service/_components/list-layanan-paspor";

const LandingPage = async () => {
  const session = await auth();
  const user = session?.user;
  const isLogin = !!user;
  return (
    <div
      style={{
        backgroundImage: `url('https://source.unsplash.com/featured/?indonesia')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="w-full flex flex-col">
        {isLogin && <Navbar />}
        <div className="w-full flex flex-col md:flex-row">
          <div
            className={cn(
              "w-full  flex flex-col items-center justify-center bg-blue-900 bg-opacity-70 p-10 gap-10",
              !isLogin ? "md:w-2/3" : ""
            )}
          >
            <div className="m-2">
              <h1 className="text-4xl font-bold text-white mb-4">
                Online Consular Service
              </h1>
              <p className="text-white mb-4">
                Online Consular Service is a service that allows you to make an
                <span className="font-semibold text-2xl"> appointment</span> for
                Pasport Renewal, Documents and legalization.
              </p>

              <div className="flex gap-4">
                <Button className="bg-green-500 hover:bg-green-700 text-white font-bold">
                  Browse All Service
                </Button>
              </div>
            </div>
            <div className="flex w-full">
              <CardLayananCategory category="paspor" />
            </div>

            <div className="fle w-full"></div>
          </div>
          <div
            className={cn(
              "w-full md:w-1/3 flex items-start justify-center p-10 bg-blue-900 bg-opacity-70 shadow-sm",
              isLogin ? "hidden" : ""
            )}
          >
            <div className="bg-gray-100 shadow-md rounded-lg p-10">
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="w-full md:grid md:grid-cols-3 gap-8 p-8">
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
    </div>
  );
};

export default LandingPage;
