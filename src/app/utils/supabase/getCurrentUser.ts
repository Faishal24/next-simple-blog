import axios from "axios";

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`);
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
