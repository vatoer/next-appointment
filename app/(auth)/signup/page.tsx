import { Suspense } from "react";
import RegisterForm from "./_components/register-form";

export default async function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
