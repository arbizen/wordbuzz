"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
// write the component for supabse google and github oauth

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // write a function that takes in username and signs in the user with github
  const handleGithubSignIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: "github",
    });
    if (error) {
      console.log(error);
    }
    console.log(user);
  };

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: "tushar@gmail.com",
      password: "123456",
    });
    console.log("login error", error);
    router.push("/game");
  };

  // write a function that takes in username and signs in the user with google
  const handleGoogleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.log(error);
    }
    console.log(user);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGithubSignIn}>Sign In with Github</button>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
}
