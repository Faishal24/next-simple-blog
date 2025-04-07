import axios from "axios"
import { PostProps } from "@/types/post"

export async function getPostBySlug(slug: string): Promise<PostProps | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${slug}`)
    return res.data
  } catch (error) {
    console.error("Failed to fetch post by slug:", error)
    return null
  }
}
