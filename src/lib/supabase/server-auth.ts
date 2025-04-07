'use server'

import { createClient } from "./server";
import prisma from "@/lib/prisma";

/**
 * Get the current user from the database with additional profile information.
 * This is useful when you need the user's profile data from the database.
 * 
 * @returns The user object with profile data or null if not found
 */
export async function getCurrentDbUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      avatar: true,
      slug: true,
    },
  });

  return dbUser;
}

/**
 * Get the current user from Supabase auth (server-side).
 * This is for server components where you need the basic auth user data.
 * 
 * @returns The Supabase auth user object or null if not found
 */
export async function getCurrentServerUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
} 