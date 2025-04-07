import UnauthUser from "./components/unauth-user";
import AuthUser from "./components/auth-user";
import { getCurrentServerUser } from "@/lib/supabase/server-auth";

export default async function Home() {
  const user = await getCurrentServerUser();

  return (
    <main className="flex-1">
      {!user ? (
        <UnauthUser />
      ) : (
        <AuthUser />
      )}
    </main>
  );
}
