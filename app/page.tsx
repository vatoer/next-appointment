import React from "react";
import LoginForm from "./(auth)/signin/_components/login-form";
import CardLayananPaspor from "./service/_components/card-layanan-paspor";

const LandingPage = () => {
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
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 flex items-center justify-center bg-blue-900 bg-opacity-70 p-10">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to Online Passport Service
              </h1>
              <p className="text-white mb-4">
                Online Passport Service is a service that allows you to make an
                appointment to manage your passport.
              </p>
              <a
                href="/apply"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Apply Now
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex items-center justify-center p-10 bg-gray-100 bg-opacity-70 shadow-sm">
            <LoginForm />
          </div>
        </div>
        <div className="flex gap-10 p-10 bg-gray-200 bg-opacity-70">
          <CardLayananPaspor />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
