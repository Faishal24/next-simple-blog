import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <section className="bg-primary py-12">
      <div className="frame flex flex-col gap-2 items-center justify-between">
        <p className="text-xl font-semibold">
          &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quas.&quot;
        </p>
        <div className="flex gap-3 items-center">
          <Image src="https://avatar.iran.liara.run/public/4" alt="avatar" width={50} height={50} className="size-8" />
          <p className="text-black/60">Fulan</p>
        </div>
      </div>
    </section>
  );
}
