import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/utils/supabase/getCurrentUser";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
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

  //   const post = await prisma.$queryRaw`
  //   SELECT 
  //     p.*,
  //     json_build_object(
  //       'name', u.name,
  //       'avatar', u.avatar,
  //       'slug', u.slug
  //     ) as author
  //   FROM "Post" p
  //   LEFT JOIN "User" u ON p."authorId" = u.id
  //   WHERE p.slug = ${slug}
  //   LIMIT 1
  // `;

  // if (!post || !Array.isArray(post) || post.length === 0) {

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // First check if the post exists and belongs to the user
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { authorId: true },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (existingPost.authorId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, thumbnail, content, status } = body;

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        description,
        thumbnail,
        content,
        status,
        updatedAt: new Date(),
      },
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

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
