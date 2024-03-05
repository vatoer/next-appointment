"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { DEFAULT_ROUTE_AFTER_LOGIN } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ButtonWithGoogle } from "../../_components/button-with-google";
import InputForm from "../../_components/input-form";
import { login } from "../_actions/login";
import { LoginSchema, TLogin } from "../_schema/login";

const LoginForm = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") ?? "/";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLogin) => {
    startTransition(() => {
      login(data).then((data) => {
        if (data?.error) {
          console.log(data.error);
          return;
        }
        // console.log("Login success");
        router.push(DEFAULT_ROUTE_AFTER_LOGIN);
      });
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={72}
          height={72}
          className="mx-auto rounded-full"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
        noValidate
      >
        <InputForm
          id="email"
          label="Email"
          type="text"
          register={register}
          error={errors.email}
          pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
        />
        <InputForm
          id="password"
          label="password"
          type="password"
          register={register}
          error={errors.password}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        />
        <Button className=" w-full py-6" disabled={isLoading} type="submit">
          Sign in
          {isLoading && (
            <Loader className="ml-2 spin-in" size={24} color="white" />
          )}
        </Button>
        <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <ButtonWithGoogle callbackUrl={callbackUrl} />
        <Link
          href="/signup"
          className={buttonVariants({
            variant: "link",
            className: "gap-1.5 w-full text-blue-500",
          })}
        >
          {`Don't have an account? Sign up`}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </form>
    </>
  );
};

const checkEmailPattern = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const checkComplexity = (password: string): boolean => {
  // Password complexity requirements:
  // At least 8 characters
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

export default LoginForm;
