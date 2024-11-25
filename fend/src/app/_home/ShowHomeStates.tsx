import React from "react";
interface Props extends React.ComponentProps<"div"> {}

import repostIcon from "@/assets/svg/repost.svg";
import ticketIcon from "@/assets/svg/ticket.svg";
import userIcon from "@/assets/svg/user.svg";
import Image from "next/image";
import { cn } from "@/utils";

const stastics = [
  { name: "Rounds Played", icon: repostIcon, value: "394" },
  { name: "Total Tickets Purchased", icon: ticketIcon, value: "661,393" },
  { name: "All Participant", icon: userIcon, value: "7,247" },
];

export const ShowHomeStates = ({ ...props }: Props) => {
  return (
    <div {...props} className="mt-36">
      <h3 className="home-header px-4">FREQUENTLY ASKED QUESTIONS</h3>
      <p className="home-subheader">All you want to know about Lottaverse</p>

      <div className="mx-auto mt-10 grid w-full grid-cols-1 items-center gap-y-6 pb-10 sm:grid-cols-2 md:w-full md:grid-cols-3 lg:w-2/3">
        {stastics.map((items, index) => {
          return (
            <div
              key={items.name}
              className={cn("flex flex-col items-center justify-center gap-y-3 antialiased", {
                "col-span-2 md:col-span-1": index === 2,
              })}
            >
              <div className="flex items-center gap-x-2">
                <Image src={items.icon} alt="icon" className="size-4" />
                <p className="box-border font-sans font-bold leading-6 text-[#858291]">
                  {items.name}
                </p>
              </div>
              <p className="box-border text-3xl text-[#F4EEFF] md:text-5xl">{items.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
