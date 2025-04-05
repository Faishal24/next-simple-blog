import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex items-center py-7 border-t border-black">
      <ul className="frame flex flex-col gap-4 text-gray-500 items-center justify-center w-full h-min lg:flex-row">
        <Link href="/">Help</Link>
        <Link href="/">About</Link>
        <Link href="/">Blog</Link>
        <Link href="/">Terms</Link>
      </ul>
    </footer>
  );
}
