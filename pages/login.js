import { useState } from "react";
import NewWindow from "react-new-window";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

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
        <button onClick={() => setPopUp(true)}>Login with Google</button>
      )}

      {popup && !session ? (
        <NewWindow center={true} url="/auth/google-signin" />
      ) : null}
    </div>
  );
};

export default SignInPage;
