"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BellIcon, LogOutIcon } from "lucide-react";

import { toast } from "sonner";
import Link from "next/link";

// interface User {
//   image?: string;
//   name?: string;
// }

type User = {
  name: string;
  email: string;
  image?: string | null; // ✅ allow null
};

export function DropdownMenuAvatar({ user }: { user: User }) {
  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...");

    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    toast.success("Signed out successfully", { id: toastId });

    // optional redirect
    window.location.href = "/";
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            {user?.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BellIcon />
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
