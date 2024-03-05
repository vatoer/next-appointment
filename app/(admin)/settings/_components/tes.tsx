import { signOut } from "@/app/(auth)/auth";
import { Button } from "@/components/ui/button";

const Tes = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Unavailable without auth</h2>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Log Out</Button>
      </form>
    </div>
  );
};

export default Tes;
