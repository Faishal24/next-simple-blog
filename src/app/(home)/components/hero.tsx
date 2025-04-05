import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="py-32">
      <div className="frame flex flex-col gap-2">
        <h1 className="font-bold text-6xl">Welcome to Blogify</h1>
        <h2 className="text-gray-500">Discover and share captivating blog</h2>
        <Link href="/sign-up">
          <Button className="mt-3 w-max" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
