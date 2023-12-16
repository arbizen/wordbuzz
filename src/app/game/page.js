import StartBoard from "@/components/homepage/Hero";
import { getLoggedUser } from "../../hooks/getUserData";

export default async function Home() {
  const user = await getLoggedUser();
  return <StartBoard user={user} />;
}
