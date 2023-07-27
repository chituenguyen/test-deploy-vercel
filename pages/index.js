import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
// import popupCenter from "./auth/utils";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session, status } = useSession();
  const popupCenter = (url, title) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  // toast to notify the user login successfully
  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Login successful!");
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <div>
        <ToastContainer />
        <h2> Welcome {session.user.email} 😀</h2>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <Link href="/login">Go to Login page to login with NewWindow deploy google4</Link>
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
      <ToastContainer />
      <h1>Loading...</h1>
    </div>
  );
}
