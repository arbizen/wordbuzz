"use client";
import { getUsername } from "@/utils/getUsername";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";

export default function StartBoard({ user }) {
  const loggedUser = user;
  const username = getUsername(user?.email);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // write a function to extract game id from an url
  const getUrl = (url, username) => {
    const splitted = url.split("/");
    const gameId = splitted[splitted.length - 1];
    const name = splitted[splitted.length - 2];
    if (!name) return `/game/${username}/${gameId}`;
    return `/game/${name}/${gameId}`;
  };

  // generate a click handler for saving the game id and username to the database
  const randomGameId = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
  };
  const handleClick = async () => {
    const gameId = randomGameId();
    setIsCreating(true);
    const { error } = await supabase.from("board").insert([
      {
        gameId: gameId,
        player1: { username, user },
      },
    ]);
    if (error) {
      console.log(error);
    }
    router.push(`/game/${username}/${gameId}`);
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }
    router.push("/");
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (inputUrl === "") return;

    setIsJoining(true);
    router.push(inputUrl);
  };

  return (
    <div className="h-screen w-screen overflow-y-scroll overflow-x-hidden bg-[#101619]">
      <header className="relative z-50 flex justify-between items-center h-[75px] px-[32px] md:px-[52px] border-b border-b-[#1D2539]">
        <h3 className="text-[18px] md:text-[24px] text-slate-100 font-black">
          Wordbuzz
        </h3>
        <div className="flex gap-6 items-center">
          <p className="font-bold leading-tight text-blue-500 hidden md:block text-sm">
            {loggedUser?.user_metadata?.full_name ?? "No name panda"}
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Image
                className="rounded-full"
                alt="player1"
                src={
                  loggedUser?.user_metadata?.picture ??
                  "https://gravatar.com/avatar/a58aa744b49b737a8f3b36009005b5aa?s=400&d=wavatar&r=x"
                }
                height={40}
                width={40}
              />
            </PopoverTrigger>
            <PopoverContent className="md:hidden bg-[#101619] border-[#1D2539]">
              <h3 className="block text-blue-500 w-full text-center mb-2">
                {loggedUser?.user_metadata?.full_name ?? "No name panda"}
              </h3>
              <Separator className="w-full bg-[#1D2539] mb-4" />
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full"
              >
                {isLoggingOut ? "Logging out..." : "Log out"}
              </Button>
            </PopoverContent>
          </Popover>
          <Button
            variant="destructive"
            className="text-white text-base hidden md:block"
            onClick={handleSignOut}
          >
            {isLoggingOut ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              <LogOut size={20} />
            )}
          </Button>
        </div>
      </header>
      <div className="h-full flex flex-col items-center justify-start pt-[100px] gap-[32px]">
        <div
          onClick={handleClick}
          className="rounded-2xl hover:filter hover:border-violet-500 hover:text-violet-500 text-blue-500 cursor-pointer border-dashed border-2 border-blue-500 flex justify-center items-center h-[30%] md:h-[45%] w-[80%]"
        >
          <p className="text-base font-bold">
            {isCreating ? "Creating..." : "New Game"}
          </p>
        </div>
        <div className="relative pt-8 w-full px-[52px] flex flex-col justify-center items-center">
          <span className="w-full border-t block border-t-[#1D2539]"></span>
          <div className="h-[50px] w-[50px] bg-[#101619] rounded-full relative top-[-25px] flex justify-center items-center text-slate-400">
            OR
          </div>
        </div>

        <div className="w-[80vw] flex">
          <form
            onSubmit={handleJoin}
            className="flex w-full gap-[16px] md:gap-[32px] flex-wrap md:flex justify-center"
          >
            <Input
              className="border-[#1D2539] h-[50px] text-slate-400 max-w-[280px] md:max-w-[80%]"
              placeholder="Paste a link to join"
              onChange={(e) => setInputUrl(getUrl(e.target.value, username))}
            />
            <Button type="submit" className="h-[50px] w-[180px]">
              {isJoining ? "Joining..." : "Join Game"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
