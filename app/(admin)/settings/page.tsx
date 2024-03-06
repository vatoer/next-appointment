import { auth, signOut } from "@/app/(auth)/auth";
import Tes from "./_components/tes";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <h1>Settings</h1>
      {JSON.stringify(session)}
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
