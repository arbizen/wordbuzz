import { useRef } from "react";
import Card from "./Card";
import Image from "next/image";
import { Copy } from "lucide-react";
import Clipboard from "react-clipboard.js";
import { IMAGE_NOT_FOUND } from "../constants";

export const SkeletonCircle = ({ imageSrc }) => {
  if (imageSrc) {
    return (
      <Image
        className="flex-none rounded-full block"
        src={imageSrc}
        height={35}
        width={35}
      />
    );
  }
  return (
    <div className="h-[35px] flex-none w-[35px] rounded-full bg-[#32365B] bg-opacity-[58%]"></div>
  );
};

const WaitingSvg = () => (
  <svg
    width="250"
    height="250"
    viewBox="0 0 250 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="125" cy="125" r="125" fill="#32365B" fill-opacity="0.25" />
    <circle cx="125" cy="125" r="93.75" fill="#32365B" fill-opacity="0.5" />
    <circle cx="125" cy="125" r="62.5" fill="#32365B" fill-opacity="0.58" />
    <circle cx="125" cy="125" r="31.25" fill="#32365B" />
  </svg>
);

export const SkeletonRect = () => {
  return (
    <div className="h-[16px] w-full rounded-xl bg-[#32365B] bg-opacity-[58%]"></div>
  );
};

export default function WaitingScreen({ data }) {
  const user = data?.user;
  const ref = useRef(null);
  return (
    <div ref={ref} className="flex flex-col h-screen md:p-8">
      <div className="flex justify-end">
        <Card
          className="border-b border-b-[#1D2539]"
          actions={
            <>
              <SkeletonCircle />
              <SkeletonCircle />
              <SkeletonCircle />
            </>
          }
        >
          <SkeletonCircle />
          <SkeletonRect />
        </Card>
      </div>
      <div className="flex-grow">
        <div className="flex flex-col items-center pt-[50px] h-full gap-6">
          <WaitingSvg />
          <div className="px-4 py-3 bg-[#1D2539] min-h-[58px] min-w-[300px] max-w-[300px] md:max-w-[400px] rounded-2xl border border-[#33446E] flex items-center justify-between text-slate-400 text-[14px] gap-4">
            <p className="truncate">{location.href}</p>
            <Clipboard data-clipboard-text={location.href}>
              <div className="h-[35px] w-[35px] rounded-md flex items-center justify-center bg-[#5E50FF] p-2">
                <Copy size={18} color="white" />
              </div>
            </Clipboard>
          </div>
        </div>
      </div>
      <Card
        className="border-t border-t-[#1D2539] absolute bottom-0 md:bottom-[50px]"
        actions={
          <>
            <SkeletonCircle />
            <SkeletonCircle />
            <SkeletonCircle />
          </>
        }
      >
        <SkeletonCircle
          imageSrc={user?.user_metadata?.picture ?? IMAGE_NOT_FOUND}
        />
        <SkeletonRect />
      </Card>
    </div>
  );
}
