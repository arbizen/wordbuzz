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
import { IndicatorLine, Mesh1, Mesh2, MeshTitle } from "@/components/svgs/mesh";

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
            <div className="max-w-[736px] text-blue-200 text-[20px] leading-[33.11px]">
              Enough being scared of vocabularies? Well, now you got a way to
              scare your friend too. Start a vocabulary battle now!
            </div>
            <Button asChild className="max-w-[165px] h-[50px]">
              <Link href="/login">Start battle</Link>
            </Button>
          </div>
        </div>

        <div className="flex">
          <div className="pr-12 border-r border-r-slate-800">
            <h3 className="text-white text-6xl font-black">100K </h3>
            <p className="text-blue-200 text-[20px] font-normal leading-[33.11px]">
              Match from over 100K words
            </p>
          </div>
          <div className="pl-12">
            <h3 className="text-white text-6xl font-black">2K+ </h3>
            <p className="text-blue-200 text-[20px] font-normal leading-[33.11px]">
              Join 2K+ word gurus
            </p>
          </div>
        </div>

        <XYZ className="absolute right-0 top-[58px] z-40" />
        <Mesh1 className="absolute left-0 right-0 top-0 z-40" />
      </div>

      {/* Demo image */}
      <div className="relative flex justify-center pt-[200px]">
        <div className="relative z-50 h-auto w-auto p-2.5 rounded-lg border border-[#37466B] inline-block">
          <Image
            src="/wordbuzz-demo.svg"
            alt="wordbuzz demo image"
            height={795}
            width={1130}
            priority={true}
            className="border border-[#1D2539] rounded-md"
          />
        </div>
        <Mesh2 className="absolute top-0 z-40" />
      </div>

      <div className="px-[90px] py-[200px]">
        <div>
          <p className="text-[20px] text-blue-200">All good</p>
          <h1 className="text-[60px] leading-tight text-slate-100 font-black">
            But how do I play?
          </h1>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-[80px] py-[80px] after:h-[300px] relative after:left-[100px] after:w-[580px] after:border-l-4 after:border-[#1D2539] after:block after:absolute after:top-[85%] after:border-b-4 after:border-dashed">
            <div className="w-full flex justify-start">
              <div className="border border-[#1D2539] py-6 pl-8 min-w-[580px] rounded-lg">
                <MeshTitle no={1} />
                <h3 className="text-[32px] text-slate-100 font-bold mb-4">
                  Create a new game{" "}
                </h3>
                <p className="text-[16px] text-blue-50 max-w-[370px]">
                  Click on Start battle and then login with your google or
                  github account. Click on New Game.{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[80px] py-[80px] after:h-[300px] relative after:right-[100px] after:w-[580px] after:border-r-4 after:border-[#1D2539] after:block after:absolute after:top-[84%] after:border-b-4 after:border-dashed">
            <div className="w-full flex justify-end">
              <div className="border border-[#1D2539] py-6 pl-8 min-w-[580px] rounded-lg">
                <MeshTitle no={2} />
                <h3 className="text-[32px] text-slate-100 font-bold mb-4">
                  Invite your friend
                </h3>
                <p className="text-[16px] text-blue-50 max-w-[370px]">
                  Copy the link and share with your friend.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[80px] pt-[80px]">
            <div className="w-full flex justify-start">
              <div className="border border-[#1D2539] py-6 pl-8 min-w-[580px] rounded-lg">
                <MeshTitle no={3} />
                <h3 className="text-[32px] text-slate-100 font-bold mb-4">
                  Start throwing word{" "}
                </h3>
                <p className="text-[16px] text-blue-50 max-w-[370px]">
                  Throw a word and scare your opponent.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
