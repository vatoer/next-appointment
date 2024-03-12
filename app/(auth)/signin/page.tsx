import { Suspense } from "react";
import LoginForm from "./_components/login-form";

export default async function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
