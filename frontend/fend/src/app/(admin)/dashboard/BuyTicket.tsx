"use client";

import ballIcon from "@/assets/images/ball.png";
import ballIcon2 from "@/assets/images/ball2.png";
import BallLists from "@/components/shared/BallLists";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SrbijaFont } from "@/fonts";
import { cn } from "@/utils";
import Image from "next/image";
import { Lottery } from "@/types";

interface Props {
  setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>;
  handleTicket: () => void;
  showNum: number | "";
  totalTickets: number[][];
  deleteTickets: (index: number) => void;
  lottery: Lottery;
  activeLottery: number;
}

export const BuyTicket = ({
  setIsNextStep,
  handleTicket,
  showNum,
  totalTickets,
  deleteTickets,
  lottery,
  activeLottery,
}: Props) => {
  const handleAddTicket = () => {
    setIsNextStep(true);
  };
  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <DialogTrigger className="btn-gradient-purple">Buy Ticket</DialogTrigger>
      </div>

      <DialogContent className="main-bg-gradient h-full border-gray-300/50 px-0 pt-2 outline-none md:h-[80vh] md:pt-10">
        <div className="flex flex-col items-center justify-evenly">
          <div className="flex h-full flex-col gap-4">
            <div className="">
              <p className={cn(`my-6 flex flex-col items-center ${SrbijaFont.className} `)}>
                <span className="text-center text-base font-semibold text-[#858291]">
                  <p>Round #{Number(activeLottery ? activeLottery[0] : 0)} </p>
                </span>
                <span>Roll the ball Lottery</span>
              </p>

              <div
                onClick={handleTicket}
                className="relative flex cursor-pointer items-center justify-center transition-all hover:opacity-80"
              >
                <Image
                  src={ballIcon}
                  alt="ball"
                  className={`size-32 rounded-full ${showNum && "hidden"}`}
                />
                <Image
                  src={ballIcon2}
                  alt="ball"
                  className={`size-32 rounded-full ${showNum === "" && "hidden"}`}
                />
                <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-3xl font-bold">
                  {showNum}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="mx-auto flex w-full -translate-x-1 items-center justify-center gap-x-2 rounded-lg shadow-md">
                <BallLists
                  totalTickets={totalTickets}
                  deleteTickets={deleteTickets}
                  ballClassName="bg-[#7239EA]"
                />
              </div>
            </div>
          </div>
          <div className="fixed bottom-8 md:bottom-20">
            <button
              disabled={!totalTickets.length}
              className="btn-gradient-purple font-black disabled:cursor-not-allowed"
              onClick={() => handleAddTicket()}
            >
              ADD Ticket
            </button>
          </div>
        </div>
      </DialogContent>
    </>
  );
};
