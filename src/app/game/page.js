import StartBoard from "@/components/homepage/Hero";
import { getLoggedUser } from "../../hooks/getUserData";

export default async function Home() {
  const user = await getLoggedUser();
  // generate a function for random game id using string and number
  const randomGameId = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    return randomString;
  };
  const gameId = randomGameId();
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <StartBoard user={user} data={{ gameId }} />
    </div>
  );
}
