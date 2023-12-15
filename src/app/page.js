"use client";
import { generateCirclesForWord } from "@/utils/generateCircles";
import Setup from "@/components/Setup";
import {
  CANVAS_DIMENTION,
  CIRCLE_RADIUS,
} from "@/components/wordboard/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import XYZ from "@/components/svgs/xyz";
import { Mesh1 } from "@/components/svgs/mesh";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-y-scroll bg-[#101619]">
      <header className="relative z-50 flex justify-between items-center h-[75px] px-[52px] border-b border-b-[#1D2539]">
        <h3 className="text-[24px] text-slate-100 font-black">Wordbuzz</h3>
        <Button asChild variant="link" className="text-white text-base">
          <Link href="/login">Login</Link>
        </Button>
      </header>
      <div className="relative px-[90px]">
        <div className="relative h-[calc(100vh_-_75px)] w-full flex items-center z-50">
          <div className="w-full flex flex-col gap-[36px]">
            <h1 className="text-[60px] font-black text-slate-100 max-w-[650px] leading-tight">
              Never match a word alone
            </h1>
            <div className="max-w-[736px] text-blue-200 text-2xl font-normal leading-[33.11px]">
              Enough being scared of vocabularies? Well, now you got a way to
              scare your friend too. Start a vocabulary battle now!
            </div>
            <Button asChild className="max-w-[165px] h-[50px]">
              <Link href="/login">Start battle</Link>
            </Button>
          </div>
        </div>
        <div className="w-auto h-[116px] relative">
          <div className="w-[375px] h-[116px] pr-12 left-0 top-0 absolute border-r border-slate-800 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-white text-6xl font-black">100K </div>
            <div className="text-blue-200 text-2xl font-normal leading-[33.11px]">
              Match from over 100K words
            </div>
          </div>
          <div className="w-[328px] h-[116px] px-12 left-[377px] top-0 absolute flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="text-white text-6xl font-black">2K</div>
            <div className="text-blue-200 text-2xl font-normal leading-[33.11px]">
              Join 2K+ word gurus
            </div>
          </div>
        </div>

        <XYZ className="absolute right-0 top-[58px] z-40" />
        <Mesh1 className="absolute left-0 right-0 top-0 z-40" />
      </div>
    </div>
  );
}
