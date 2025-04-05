import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { PostProps } from "@/types/post";
import Image from "next/image";

export default function Home() {
  const posts: PostProps[] = [
    {
      title: "Lorem ipsum dolor sit amet",
      slug: "lorem-ipsum-dolor-sit-amet",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quas.",
      avatar: "https://avatar.iran.liara.run/public/5",
      thumbnail: "https://fakeimg.pl/600x400",
      name: "Fulano",
      userSlug: "fulano",
      status: "published",
      author_id: "1",
    },
    {
      title: "Lorem, ipsum dolor.",
      slug: "lorem-ipsum-dolor",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem impedit placeat ratione sit nostrum reprehenderit?",
      avatar: "https://avatar.iran.liara.run/public/6",
      thumbnail: "https://fakeimg.pl/600x400",
      name: "Hanafi",
      userSlug: "hanafi",
      status: "published",
      author_id: "2",
    },
    {
      title: "Lorem ipsum dolor sit.",
      slug: "lorem-ipsum-dolor-sit",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, dolores.",
      avatar: "https://avatar.iran.liara.run/public/7",
      thumbnail: "https://fakeimg.pl/600x400",
      name: "Ali",
      userSlug: "ali",
      status: "published",
      author_id: "3",
    },
    {
      title: "Lorem ipsum dolor sit 2.",
      slug: "lorem-ipsum-dolor-sit-2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, dolores.",
      avatar: "https://avatar.iran.liara.run/public/8",
      thumbnail: "https://fakeimg.pl/600x400",
      name: "Usman",
      userSlug: "usman",
      status: "published",
      author_id: "4",
    },
  ];

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
            {posts.map((post, index) => (
              <BlogCard post={post} key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
