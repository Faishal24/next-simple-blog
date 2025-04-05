import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/app/utils/supabase/getCurrentUser";
import { signOutAction } from "@/app/actions";

export default async function Header() {
  const user = await getCurrentUser();

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
            <Button onClick={signOutAction}>Logout</Button>
          </nav>
        )}
      </div>
    </header>
  );
}
