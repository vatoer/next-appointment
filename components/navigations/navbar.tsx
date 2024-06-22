"use server";
import { getCategories } from "@/data/service";
import { UserButton } from "../user-button";
import { TopNavigationMenu } from "./navigation-menu";

export const Navbar = async () => {
  const categories = await getCategories();
  return (
    <nav className="flex w-full ">
      <div className="grow">
        <TopNavigationMenu categories={categories} />
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};
