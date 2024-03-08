import { UserButton } from "../user-button";
import { TopNavigationMenu } from "./navigation-menu";

export const Navbar = () => {
  return (
    <nav className="p-2 flex w-full">
      <div className="grow">
        <TopNavigationMenu />
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};
