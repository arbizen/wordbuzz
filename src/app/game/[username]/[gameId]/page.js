import { getLoggedUser } from "@/hooks/getUserData";
import Initiator from "./initiator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUsername } from "@/utils/getUsername";

export default async function GamePage({ params }) {
  const gameId = params.gameId;
  const initiatorUsername = params.username;
  const supabase = createServerComponentClient({ cookies });
  const user = await getLoggedUser();
  const loggedUsername = getUsername(user?.email);

  // save the second player to the db

  if (loggedUsername !== initiatorUsername) {
    // update the data on the db
    const updateGame = async () => {
      const { error } = await supabase
        .from("board")
        .update({ player2: { username: loggedUsername, user } })
        .eq("gameId", gameId);
      if (error) {
        console.log(error);
      }
    };
    updateGame();
  }

  console.log(user);
  return <Initiator data={{ gameId, initiatorUsername, user }} />;
}
