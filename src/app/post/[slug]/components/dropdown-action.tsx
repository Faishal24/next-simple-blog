"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DropdownAction({ slug }: { slug: string }) {
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    const res = await axios.delete(`/api/posts/${slug}`)
    if (res.status === 200) {
      toast.success("Article deleted successfully")
      router.push("/")
    } else {
      toast.error("Failed to delete article")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-0">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/post/${slug}/edit`}>Edit Article</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(slug)}>Delete Article</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
