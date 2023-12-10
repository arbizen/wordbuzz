"use client";
import { generateCirclesForWord } from "@/utils/generateCircles";
import Setup from "@/components/Setup";
import {
  CANVAS_DIMENTION,
  CIRCLE_RADIUS,
} from "@/components/wordboard/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Link href="/login">Start playing</Link>
    </div>
  );
}
