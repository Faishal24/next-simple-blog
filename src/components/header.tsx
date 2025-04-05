import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center w-full border-b border-black py-7">
      <div className="frame flex items-center justify-between">
        <Link href="/">
          <p className="font-bold text-2xl">Blogify</p>
        </Link>
        <nav className="hidden lg:flex gap-14 items-center">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Explore</Link>
            <Link href="/">About</Link>
            <Link href="/">
              <Button>Get Started</Button>
            </Link>
        </nav>
      </div>
    </header>
  );
}
