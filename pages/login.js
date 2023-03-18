import { useEffect, useState } from "react";
import NewWindow from "react-new-window";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  const [popup, setPopUp] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
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
        <button
          onClick={async () => {
            await setPopUp(false); // looks like some bug of new-react-window -> need this trick
            setPopUp(true);
          }}
        >
          Login with Google
        </button>
      )}

      {!session && popup ? (
        <NewWindow
          url="/auth/google-signin-popup"
          // onUnload={() => setPopUp(false)}  // doens't work
        />
      ) : null}
    </div>
  );
};

export default SignInPage;
