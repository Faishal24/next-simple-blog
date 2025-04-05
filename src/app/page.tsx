import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
          slug: true,
        },
      },
    },
  });

  return (
    <main className="flex-1">
      <section className="py-32">
        <div className="frame flex flex-col gap-2">
          <h1 className="font-bold text-6xl">Welcome to Blogify</h1>
          <h2 className="text-gray-500">Discover and share captivating blog</h2>
          <Button className="mt-3 w-max" size="lg">
            Get Started
          </Button>
        </div>
      </section>

      <section className="bg-primary py-12">
        <div className="frame flex flex-col gap-2 items-center justify-between">
          <p className="text-xl font-semibold">
            &quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quas.&quot;
          </p>
          <div className="flex gap-3 items-center">
            <Image
              src="https://avatar.iran.liara.run/public/4"
              alt="avatar"
              width={50}
              height={50}
              className="size-8"
            />
            <p className="text-black/60">Fulan</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="frame">
          <h2 className="text-3xl font-semibold mb-8">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <BlogCard post={post} key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
