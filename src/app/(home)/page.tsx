import UnauthUser from "./components/unauth-user";
import AuthUser from "./components/auth-user";
import { getCurrentUser } from "../utils/supabase/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

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
