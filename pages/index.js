import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import popupCenter from "./auth/utils";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Login successful!");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div>
        <ToastContainer /> {/* Ensure this component is here */}
        <h2> Welcome {session.user.email} 😀</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <Link href="/login">Go to Login page to login with NewWindow deploy google1</Link>
        <h2>OR please login here with custom popup</h2>
        <button
          onClick={() => popupCenter("/auth/google-signin-popup", "Sample Sign In")}
        >
          Sign In with Google
        </button>
        <button
          onClick={() => popupCenter("/auth/facebook-signin-popup", "Sample Sign In")}
        >
          Sign In with Facebook
        </button>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer /> {/* Ensure this component is here */}
      <h1>Loading...</h1>
    </div>
  );
}
