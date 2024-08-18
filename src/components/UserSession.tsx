import { signIn, signOut, useSession } from "next-auth/react";

const UserSession: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session);

    return (
      <div>
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default UserSession;
