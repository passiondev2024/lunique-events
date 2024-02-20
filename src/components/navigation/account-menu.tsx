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
        <Avatar className="h-9 w-9">
          {image && <AvatarImage src={image} className="h-9 w-9" />}
          <AvatarFallback className="h-9 w-9">A</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5">
        <div className="p-2">
          {name && <p className="font-medium">{name}</p>}
          {email && <p className="text-sm text-zinc-500">{email}</p>}
        </div>
        <DropdownMenuSeparator />
        <Link href={paths.events.root}>
          <DropdownMenuItem>
            <LayoutDashboardIcon className="mr-1.5 h-4 w-4" />
            Events
          </DropdownMenuItem>
        </Link>
        <Link href={paths.account.settings}>
          <DropdownMenuItem>
            <UserIcon className="mr-1.5 h-4 w-4" />
            Account
          </DropdownMenuItem>
        </Link>
        <Link href={paths.account.billing}>
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
            {isLoading && (
              <RotateCwIcon className="mr-1.5 h-4 w-4 animate-spin" />
            )}
            Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
