import React from "react";
import BlogCard from "./blog-card";
import { getPosts } from "@/lib/getPosts";

export default async function LatestPosts() {
  const posts = await getPosts("published", "desc");

  return (
    <section className="py-12">
      <div className="">
        <h2 className="text-3xl font-semibold mb-8">Latest Posts</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
