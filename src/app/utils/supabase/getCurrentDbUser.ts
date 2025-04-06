import { createClient } from "./server";
import prisma from "@/lib/prisma";

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
