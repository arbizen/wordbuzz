import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Card({ children, className, actions, ...props }) {
  return (
    <motion.div
      {...props}
      className={cn(
        "w-full p-4 h-[85px] flex items-center rounded-none gap-4 max-w-full md:h-auto md:rounded-2xl md:bg-[#1D2539] md:border md:border-[#33446E] md:max-w-[390px]",
        className
      )}
    >
      <div className="flex items-center gap-2.5 flex-grow">{children}</div>
      <div className="flex items-center gap-2.5 flex-shrink">{actions}</div>
    </motion.div>
  );
}
