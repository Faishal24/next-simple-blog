import { getCurrentServerUser } from "@/app/utils/supabase/getCurrentServerUser";
import { getPostBySlug } from "@/lib/getPostsBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTimeAgo } from "@/lib/getTimeAgo";
import DropdownAction from "./components/dropdown-action";

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getCurrentServerUser();
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const isAuthor = user?.id === post.authorId;

  return (
    <section className="py-10">
      <div className="post-frame space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500">{post.description}</p>
          </div>

          <div className="flex items-center py-3 justify-between border-y">
            <div className="flex items-center gap-2">
              <Image
                src={post.author?.avatar || "/default-avatar.png"}
                alt={post.author?.name || "Author"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{post.author?.name}</p>
                <p className="text-sm text-gray-500">Posted {getTimeAgo(post.createdAt)}</p>
              </div>
            </div>
            {isAuthor && <DropdownAction slug={slug} />}
          </div>

          <Image src={post.thumbnail} alt={post.title} width={500} height={300} className="w-full max-w-2xl rounded" />
          <div className="prose dark:prose-invert max-w-none">{post.content}</div>
        </div>
      </div>
    </section>
  );
}
