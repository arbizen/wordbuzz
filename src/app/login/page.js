"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
// write the component for supabse google and github oauth

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  // write a function that takes in username and signs in the user with github
  const handleGithubSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.log(error);
    }
    console.log(user);
  };

  const handleLoginTushar = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: "tushar@gmail.com",
      password: "123456",
    });
    console.log("login error", error);
    router.push("/game");
  };

  const handleLoginArb = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: "arb@arb.com",
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
    <div className="relative flex items-center justify-center  h-screen flex-col bg-[#101619] gap-[32px] md:gap-8 overflow-hidden">
      <svg
        className="h-[400px] w-[800px] md:h-[500px] md:w-[1000px] absolute top-0 z-40"
        viewBox="0 0 1000 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="500"
          cy="-3.8147e-05"
          r="82.8333"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          cy="4.19617e-05"
          r="41.1667"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="499.167"
          cy="0.833334"
          r="20.3333"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          cy="1.52588e-05"
          r="166.167"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          r="249.5"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          cy="3.05176e-05"
          r="332.833"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          r="416.167"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
        <circle
          cx="500"
          r="499.5"
          stroke="#1D2539"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 10"
        />
      </svg>
      <div className="space-y-4 flex flex-col relative z-50">
        {process.env.NEXT_PUBLIC_NODE_ENV === "development" && (
          <>
            <Button
              className="min-w-[300px] md:h-[50px]"
              onClick={handleLoginTushar}
            >
              Login Tushar
            </Button>
            <Button
              className="min-w-[300px] md:h-[50px]"
              onClick={handleLoginArb}
            >
              Login Arb
            </Button>
          </>
        )}
        <Button
          className="min-w-[300px] md:h-[50px]"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </Button>
        <Button
          className="bg-violet-500 hover:bg-violet-600 md:h-[50px]"
          onClick={handleGithubSignIn}
        >
          Sign In with Github
        </Button>
      </div>
    </div>
  );
}
