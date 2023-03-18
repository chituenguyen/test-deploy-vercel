import { useEffect, useState } from "react";
import NewWindow from "react-new-window";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  const [popupGoogle, setPopUpGoogle] = useState(false);
  const [popupFB, setPopUpFB] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="">
      <Link href="/">Go Home</Link>

      {status === "loading" ? (
        <p>loading session...</p>
      ) : session ? (
        <div className="flex items-center">
          <button onClick={() => signOut()}>Logout</button>
          <Image
            src={session.user?.image}
            alt="Avatar"
            width={50}
            height={50}
          />
        </div>
      ) : (
        <div>
          <button
            onClick={async () => {
              await setPopUpGoogle(false); // looks like some bug of new-react-window -> need this trick
              setPopUpGoogle(true);
            }}
          >
            Login with Google
          </button>
          <button
            onClick={async () => {
              await setPopUpFB(false); // looks like some bug of new-react-window -> need this trick
              setPopUpFB(true);
            }}
          >
            Login with Facebook
          </button>
        </div>
      )}

      {!session && popupGoogle ? (
        <NewWindow
          url="/auth/google-signin-popup"
          // onUnload={() => setPopUp(false)}  // doens't work
        />
      ) : null}

      {!session && popupFB ? (
        <NewWindow url="/auth/facebook-signin-popup" />
      ) : null}
    </div>
  );
};

export default SignInPage;
