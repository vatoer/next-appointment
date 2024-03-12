import { auth } from "@/app/(auth)/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import UserButtonDropdown from "./user-button-dropdown";

export const UserButton = async () => {
  const session = await auth();
  //console.log("[USER BUTTON ] Session", session);

  // if (!session) {
  //   return <UserButton.Skeleton />;
  // }

  const user = session?.user;

  if (!user) {
    return <UserButton.Login />;
  }

  return <UserButtonDropdown user={user} />;
};

UserButton.Login = function UserButtonLogin() {
  return (
    <Button variant={"ghost"}>
      <Link href="/signin" className="flex items-center gap-x-2 rounded-md">
        <User size={16} />
        <span>Sign in</span>
      </Link>
    </Button>
  );
};

UserButton.Skeleton = function UserButtonSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      <Skeleton className="w-16 h-16 rounded-full" />
    </div>
  );
};
