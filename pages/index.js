import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import popupCenter from "./auth/utils";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <h2> Welcome {session.user.email} 😀</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <div>
        <Link href="/login">Go to Login page to login with NewWindow</Link>
        <h2>OR please pogin here with custom popup</h2>
        <button
          onClick={() =>
            popupCenter("/auth/google-signin-popup", "Sample Sign In")
          }
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
