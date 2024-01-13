"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [user, setuser] = useState("");
  const router = useRouter();
  const getUser = async () => {
    const session = await useSession();
    if (session.data){
      console.log(session);
      router.push('/');
    }
  };
  getUser();
  return (
    <div className="flex items-center justify-center h-screen">
      {user.name ? (
        <button className="bg-gWhite pl-3 pr-5 py-2 text-black rounded-full" onClick={() => signOut("google")}>LogOut</button>
      ) : (
        <button className="bg-gWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center" onClick={() => signIn("google")}><img src="/google.png" className="h-10 m-1"/>SignIn With Google </button>
      )}
      <p>{user.name}</p>
    </div>
  );
};

export default LoginPage;
