import { getCurrentServerUser } from "@/lib/supabase/server-auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const sort = searchParams.get("sort") || "desc";

    // Valid PostStatus enum values
    const allowedStatuses = ["draft", "published", "scheduled"] as const
    type PostStatus = (typeof allowedStatuses)[number]
  
    // Jika status valid, pakai, kalau tidak diabaikan
    const statusFilter: PostStatus | undefined = allowedStatuses.includes(status as PostStatus)
      ? (status as PostStatus)
      : undefined

  try {
    const posts = await prisma.post.findMany({
      where: {
        ...(statusFilter ? { status: statusFilter } : {}),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnail: true,
        status: true,
        author: {
          select: {
            name: true,
            avatar: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch posts", err },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, thumbnail, content, status } = body;

  const user = await getCurrentServerUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Generate slug from title
  const rawSlug = title.toLowerCase().trim().replace(/\s+/g, "-");
  let slug = rawSlug;
  let counter = 1;
  
  // Generate unique slug
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${rawSlug}-${counter++}`;
  }

  try {
    const post = await prisma.post.create({
      data: {
        id: crypto.randomUUID(),
        title,
        slug,
        description,
        thumbnail,
        content,
        status,
        publishedAt: new Date(),
        authorId: user.id,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Failed to create post", err }, { status: 500 });
  }
}
