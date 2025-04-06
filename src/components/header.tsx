import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentDbUser } from "@/app/utils/supabase/getCurrentDbUser";
import Image from "next/image";

export default async function Header() {
  const user = await getCurrentDbUser();
  return (
    <header className="flex items-center w-full border-b border-black py-7">
      <div className="frame flex items-center justify-between">
        <Link href="/">
          <p className="font-bold text-2xl">Blogify</p>
        </Link>
        {!user ? (
          <nav className="hidden lg:flex gap-14 items-center">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Explore</Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        ) : (
          <nav className="hidden lg:flex gap-14 items-center">
            <Link href="/write">Write</Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={signOutAction} className="w-full">Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        )}
      </div>
    </header>
  );
}
