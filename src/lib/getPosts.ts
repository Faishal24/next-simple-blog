import axios from "axios";
import { PostProps } from "@/types/post";

export async function getPosts(status?: string, sort?: string): Promise<PostProps[]> {
  try {
    const statusParam = status ? `?status=${status}` : "";
    const sortParam = sort ? `&sort=${sort}` : "";
    const query = `${statusParam}${sortParam}`;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts${query}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

