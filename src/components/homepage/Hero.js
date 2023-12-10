"use client";
import { getUsername } from "@/utils/getUsername";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function StartBoard({ user, data }) {
  const username = getUsername(user?.email);
  const supabase = createClientComponentClient();
  const router = useRouter();
  // generate a click handler for saving the game id and username to the database
  const handleClick = async () => {
    const { error } = await supabase.from("board").insert([
      {
        gameId: data?.gameId,
        player1: { username, user },
      },
    ]);
    if (error) {
      console.log(error);
    }
    router.push(`/game/${username}/${data?.gameId}`);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <button onClick={handleClick}>New Game</button>
    </div>
  );
}
