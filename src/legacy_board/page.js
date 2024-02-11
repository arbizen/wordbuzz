// import { getLoggedUser } from "@/hooks/getUserData";
// import Initiator from "./initiator";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { getUsername } from "@/utils/getUsername";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default async function GamePage({ params }) {
//   const gameId = params.gameId;
//   const initiatorUsername = params.username;
//   const supabase = createServerComponentClient({ cookies });
//   const user = await getLoggedUser();
//   const loggedUsername = getUsername(user?.email);

//   // check if a record exists with the game id, if not redirect to home
//   const { data, error } = await supabase
//     .from("board")
//     .select("gameId")
//     .eq("gameId", gameId);
//   if (error) {
//     console.log(error);
//   }
//   if (!data.length) {
//     return (
//       <div className="bg-[#101619] h-screen w-screen flex justify-center items-center text-slate-400 text-sm flex-col gap-4">
//         <p>
//           No game found with id{" "}
//           <span className="inline-block px-2 mx-2 text-[12px] border-[#1D2539] border rounded-md">
//             {gameId}
//           </span>
//         </p>
//         <Button variant="link" asChild>
//           <Link className="flex gap-2 items-center" href={"/game"}>
//             <ArrowLeft size={20} /> Go back to home
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   if (loggedUsername !== initiatorUsername) {
//     // update the data on the db
//     const updateGame = async () => {
//       const { error } = await supabase
//         .from("board")
//         .update({ player2: { username: loggedUsername, user } })
//         .eq("gameId", gameId);
//       if (error) {
//         console.log(error);
//       }
//     };
//     updateGame();
//   }

//   console.log(user);
//   return <Initiator data={{ gameId, initiatorUsername, user }} />;
// }
