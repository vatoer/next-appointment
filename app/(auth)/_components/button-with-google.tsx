"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

interface IButtonWithGoogleProps {
  callbackUrl?: string;
}

export const ButtonWithGoogle = ({
  callbackUrl = "/",
}: IButtonWithGoogleProps) => {
  const handleLoginWithGoogle = () => {
    signIn("google", { callbackUrl });
  };
  return (
    <Button
      type="button"
      onClick={handleLoginWithGoogle}
      variant={"outline"}
      className="flex justify-center items-center gap-x-2"
    >
      <FcGoogle className="h-5 w-5" />
      <span className="text-slate-600">Continue with Google</span>
    </Button>
  );
};
