"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface IUserButtonProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
const UserButtonDropdown = ({ user }: IUserButtonProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="items-center flex outline-none">
      <Avatar className="w-6 h-6">
        <AvatarImage src={user.image ?? "/images/avatar.svg"} sizes="9" />
        <AvatarFallback className="w-6 h-6 text-sm">CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        {user.name ?? user.email ?? "Unknown"}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex items-center gap-x-2 hover:cursor-pointer">
          <UserIcon size={9} />
          <span>Profile</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          className="flex items-center gap-x-2 hover:cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut size={9} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserButtonDropdown;
