'use client'

import axios from "axios";

/**
 * Get the current user via API (client-side).
 * This is for client components where you need to fetch user data.
 * 
 * @returns The user data from the API or null if not found
 */
export async function getCurrentUser() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`);
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
} 