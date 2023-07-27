import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!(status === "loading") && !session) void signIn("facebook");
        if (session) window.close();
    }, [session, status]);

    return (
        <div
            style={{
                width: "90vw",
                height: "90vh",
                position: "absolute",
                left: 0,
                top: 0,
                background: "red",
            }}
        ></div>
    );
};

export default SignInPage;