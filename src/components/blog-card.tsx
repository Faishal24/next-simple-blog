"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { PostProps } from "@/types/post";

type BlogCardProps = {
  post: PostProps;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="pt-0 hover:scale-102 transition-all duration-300">
      <Link href={`/post/${post.slug}`} passHref className="h-full">
        <CardHeader className="px-0">
          <Image
            src={post.thumbnail}
            alt={`Thumbnail for ${post.title}`}
            width={400}
            height={200}
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Link>

      <Link href={`/post/${post.slug}`} passHref className="h-full">
        <CardContent className="flex flex-col gap-4 justify-between h-full">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">{post.title}</h3>
            <p className="text-gray-500">{post.description}</p>
          </div>
        </CardContent>
      </Link>

      <Link href={`/user/${post.author.slug}`} onClick={(e) => e.stopPropagation()}>
        <CardFooter className="flex gap-3 h-full items-end" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-3 items-center">
            <Image
              src={post.author.avatar}
              alt={`Avatar of ${post.author.name}`}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
            <p className="text-black/60">{post.author.name}</p>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
