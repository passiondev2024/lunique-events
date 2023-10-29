"use client";

import {
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  RotateCwIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { paths } from "@/routes/paths";
import { useSignOut } from "@/hooks/use-sign-out";
import { Badge } from "../ui/badge";

interface AccountMenuProps {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

export const AccountMenu = ({ name, email, image }: AccountMenuProps) => {
  const { mutate, isLoading } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {image && <AvatarImage src={image} />}
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 -top-1">
        <div className="p-2">
          {name && <p className="font-medium">{name}</p>}
          {email && <p className="text-sm text-zinc-500">{email}</p>}
        </div>
        <DropdownMenuSeparator />
        <Link href={paths.dashboard.root}>
          <DropdownMenuItem>
            <LayoutDashboardIcon className="mr-1.5 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href={paths.dashboard.account}>
          <DropdownMenuItem>
            <UserIcon className="mr-1.5 h-4 w-4" />
            Account
          </DropdownMenuItem>
        </Link>
        <Link href={paths.dashboard.billing}>
          <DropdownMenuItem>
            <CreditCardIcon className="mr-1.5 h-4 w-4" />
            Billing
            <Badge className="ml-auto">Free</Badge>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            disabled={isLoading}
            onClick={() => mutate()}
            className="flex w-full items-center"
          >
            {!isLoading && <LogOutIcon className="mr-1.5 h-4 w-4" />}
            {isLoading && <RotateCwIcon className="mr-1.5 h-4 w-4" />}
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
