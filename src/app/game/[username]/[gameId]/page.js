import { getLoggedUser } from "@/hooks/getUserData";
import GameInitiator from "./initiator";

export default async function Page({ params }) {
  const gameId = params.gameId;
  const user = await getLoggedUser();
  return <GameInitiator data={{ user, gameId }} />;
}
