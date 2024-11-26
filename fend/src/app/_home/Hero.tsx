import React from "react";
import { RoundBall } from "@/components/shapes";
import heroImg from "@/assets/temp/hero-img.png";
import Image from "next/image";

interface Props extends React.ComponentProps<"div"> {}

export const Hero = ({ ...props }: Props) => {
  return (
    <main {...props} className="relative top-0 overflow-x-hidden py-32">
      <main className="z-40 mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="mt-5 box-border text-center text-5xl font-black uppercase tracking-[-0.62px] text-gray-100 antialiased md:text-6xl md:leading-[68.2px]">
          WELCOME TO LOTTAVERSE
        </h1>
        <p className="mt-5 box-border max-w-xs text-center font-sans text-xl font-bold uppercase tracking-[-0.38px] text-[#E3E8FC] antialiased opacity-70 md:max-w-full md:text-3xl md:leading-[41.8px]">
          THE BIGGEST WEB3 ONLINE GAMING PLATFORM ON <br /> THE WORLD
        </p>

        {/* <Image
          src={heroImg}
          alt="Hero"
          className="z-40 mt-6 w-[80vw] rounded-md border border-gray-400/50 md:mt-20"
        /> */}
      </main>

      <RoundBall className="absolute bottom-0 left-0 z-10" />
    </main>
  );
};
