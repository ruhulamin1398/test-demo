import Image from "next/image";
import Link from "next/link";
import React from "react";

import logoImg from "@/assets/images/70cbbb2e-a516-4f67-bb8f-e0e7cc57f338.jpeg";
import { cn } from "@/utils";

interface Props extends React.ComponentProps<"div"> {}
interface PropsImg extends React.ComponentProps<"image"> {}

export const LogoMin = ({ className }: PropsImg) => {
  return (
    <Link href={"/"}>
      <Image src={logoImg} alt="logo" className={cn("size-8", className)} />
    </Link>
  );
};

export const LogoFull = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={cn("flex items-center gap-x-2", className)}>
      <LogoMin />
      <Link href={"/"} className="text-center text-xl font-bold">
        LOTTAVERSE
      </Link>
    </div>
  );
};