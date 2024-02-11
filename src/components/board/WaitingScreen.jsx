"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Clipboard from "react-clipboard.js";
export default function WaitingScreen() {
  const { toast } = useToast();
  const handleCopy = () => {
    toast({
      title: "Copied to clipboard",
    });
  };
  return (
    <div className="absolute flex flex-col justify-center h-screen items-center gap-6">
      <svg
        className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="150" r="49.5" stroke="#1D2539" />
        <circle cx="150" cy="150" r="24.5" stroke="#1D2539" />
        <circle cx="149.5" cy="150.5" r="12" stroke="#1D2539" />
        <circle cx="150" cy="150" r="99.5" stroke="#1D2539" />
        <circle cx="150" cy="150" r="149.5" stroke="#1D2539" />
      </svg>
      <div className="flex gap-2 flex-wrap items-center justify-center max-w-[280px] md:max-w-full">
        <p className="px-2 py-1.5 flex items-center border border-[#1D2539] rounded-md text-slate-400 text-sm truncate overflow-x-scroll">
          {location.href}
        </p>
        <Button onClick={handleCopy} asChild>
          <Clipboard data-clipboard-text={location.href}>Copy link</Clipboard>
        </Button>
      </div>
    </div>
  );
}
