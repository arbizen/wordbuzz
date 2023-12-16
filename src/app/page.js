import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import XYZ from "@/components/svgs/xyz";
import { Grid, Mesh1, Mesh2, MeshTitle } from "@/components/svgs/mesh";

export const metadata = {
  title: "Wordbuzz | Never match a word alone",
  description:
    "Learn english vocabulary by playing with your friends on realtime. Learn from over 100K words.",
  openGraph: {
    title: "Wordbuzz",
    description:
      "Learn english vocabulary by playing with your friends on realtime. Learn from over 100K words.",
    url: "https://wordbuzz.arbizen.com",
    siteName: "Wordbuzz",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Wordbuzz",
    card: "summary_large_image",
  },
  themeColor: "#101619",
};

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-y-scroll overflow-x-hidden bg-[#101619]">
      <header className="relative z-50 flex justify-between items-center h-[75px] px-[32px] md:px-[52px] border-b border-b-[#1D2539]">
        <h3 className="text-[18px] md:text-[24px] text-slate-100 font-black">
          Wordbuzz
        </h3>
        <Button asChild variant="link" className="text-white text-base">
          <Link href="/login">Login</Link>
        </Button>
      </header>
      <div className="relative px-[32px] md:px-[90px]">
        <Mesh1 className="w-[500px] h-[500px] lg:w-[1157px] lg:h-[976px] absolute left-0 right-0 top-0 z-40" />
        <XYZ className="h-[753px] w-[100%] lg:w-[717px] lg:h-[753px] absolute top-0 left-0 lg:left-auto lg:right-0 lg:top-[58px] z-40" />
        <div className="relative h-[calc(100vh_-_75px)] w-full flex items-start pt-[64px] md:pt-0 md:items-center z-50">
          <div className="w-full flex flex-col gap-[36px]">
            <h1 className="text-[48px] lg:text-[60px] font-black text-slate-100 max-w-[100%] md:max-w-[650px] leading-tight">
              Never match a word alone
            </h1>
            <div className="max-w-[736px] text-blue-200 text-[18px] md:text-[20px] leading-[33.11px]">
              Enough being scared of vocabularies? Well, now you got a way to
              scare your friend too. Start a vocabulary battle now!
            </div>
            <Button asChild className="max-w-[165px] h-[50px]">
              <Link href="/login">Start battle</Link>
            </Button>
          </div>
        </div>

        <div className=" relative z-50 flex mt-[60px] flex-wrap gap-[64px] justify-center items-center">
          <div className="md:pr-12 lg:border-r border-r-slate-800 text-center">
            <h3 className="text-white text-6xl font-black">100K </h3>
            <p className="text-blue-200 text-[18px] md:text-[20px] font-normal leading-[33.11px]">
              Match from over 100K words
            </p>
          </div>
          <div className="md:pl-12 text-center">
            <h3 className="text-white text-6xl font-black">2K+ </h3>
            <p className="text-blue-200 text-[18px] md:text-[20px] font-normal leading-[33.11px]">
              Join 2K+ word gurus
            </p>
          </div>
        </div>
      </div>

      {/* Demo image */}
      <div className="relative flex justify-center px-[32px] pt-[200px]">
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

      <div className="px-[32px] md:px-[90px] py-[200px]">
        <div>
          <p className="text-[20px] text-blue-200">All good</p>
          <h1 className="text-[48px] lg:text-[60px] leading-tight text-slate-100 font-black">
            But how do I play?
          </h1>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-[80px] py-[80px] z-50 after:z-40 after:hidden after:h-[300px] relative after:left-[100px] after:w-[60%] after:border-l-4 after:border-[#1D2539] after:lg:block after:absolute after:top-[85%] after:border-b-4 after:border-dashed">
            <div className="w-full flex justify-start">
              <div className="border bg-[#101619] border-[#1D2539] py-6 pl-8 w-full lg:w-[580px] rounded-lg">
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

          <div className="flex flex-col gap-[80px] py-[80px] z-50 after:z-40 after:hidden after:h-[300px] relative after:right-[100px] after:w-[60%] after:border-r-4 after:border-[#1D2539] after:lg:block after:absolute after:top-[84%] after:border-b-4 after:border-dashed">
            <div className="w-full flex justify-end">
              <div className="border bg-[#101619] border-[#1D2539] py-6 pl-8 w-full lg:w-[580px] rounded-lg">
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

          <div className="flex flex-col gap-[80px] pt-[80px] relative z-50">
            <div className="w-full flex justify-start">
              <div className="border bg-[#101619] border-[#1D2539] py-6 pl-8 w-full lg:w-[580px] rounded-lg">
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

      <footer className="relative p-[32px] border-t border-t-slate-800 md:border-none md:p-0">
        <Grid className="hidden md:block w-[100vw] absolute top-0 z-40" />
        <div className="md:p-[90px] relative z-50">
          <h3 className="text-[18px] md:text-[24px] font-black text-slate-100">
            Wordbuzz
          </h3>
          <div className="py-6 inline-flex flex-col gap-2">
            <Link href="/" className="text-base text-blue-50">
              Home
            </Link>
            <Link href="/login" className="text-base text-blue-50">
              Login
            </Link>
            <Link href="/privacy-policy" className="text-base text-blue-50">
              Privacy Policy
            </Link>
            <Link href="/tos" className="text-base text-blue-50">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 md:px-[90px] relative z-50">
          <p className="text-blue-50 text-[16px]">
            © {new Date().getFullYear()} Wordbuzz. All rights reserved.
          </p>
          <p className="text-blue-50 text-base">
            Made by{" "}
            <Link target="_blank" href="https://x.com/arbizzen">
              @arbizzen
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
