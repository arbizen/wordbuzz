"use client";
import dynamic from "next/dynamic";

const BoardView = dynamic(() => import("../../../../components/board/Board"), {
  ssr: false,
});

export default function GameInitiator({ data }) {
  return (
    <div className="h-full w-full bg-[#101619]">
      <BoardView data={data} />
    </div>
  );
}
