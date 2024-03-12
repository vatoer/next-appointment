"use server";
import {
  getCategories,
  getServiceByCategory,
  getServices,
} from "@/app/(public)/service/_data/service";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
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
