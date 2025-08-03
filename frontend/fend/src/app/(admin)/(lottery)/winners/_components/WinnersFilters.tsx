import React, { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LotteryType = "0" | "1";

interface Props extends React.ComponentProps<"div"> {
  setSearchId: (id: string) => void;
  setRound: (round: string) => void;
  setLotteryType: (type: string) => void;
  lotteryType: string
  roundForEasy: number
  roundForSuper: number
}
 

export const WinnersFilters = ({ roundForEasy, roundForSuper, setSearchId, setRound, setLotteryType,lotteryType, ...props }: Props) => {


  const roundMapping: { [key in LotteryType]: number } = {
    "0": roundForEasy,
    "1": roundForSuper
  }
  
  const length = roundMapping[lotteryType as LotteryType];
  

  return (
    <div className="min-h-36 rounded-md bg-midnight-200 px-4 py-4">
      <h1 className="mb-1 mt-0 text-xl font-black">Winners</h1>
      <div className="flex flex-col gap-x-10 gap-y-8 md:flex-row" {...props}>
        <div>
          <p className="items-center rounded-t-md text-sm font-black md:text-lg">Packages</p>
          <Select onValueChange={(value) => setLotteryType(value)}>
            <SelectTrigger className="md:min-w-56">
              <SelectValue placeholder="Select" className="font-black" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" className="cursor-pointer">Easy</SelectItem>
              <SelectItem value="1" className="cursor-pointer">Super</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="items-center rounded-t-md text-sm font-black md:text-lg">Round</p>
          <Select onValueChange={(value) => setRound(value)}>
            <SelectTrigger className="md:min-w-56">
              <SelectValue placeholder="Select" className="font-black" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length }, (_, index) => (
                <SelectItem key={index + 1} value={`${index + 1}`} className="cursor-pointer">
                  Round {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="items-center rounded-t-md text-sm font-black md:text-lg">Ticket</p>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchId(e.target.value)}
            type="number"
            placeholder="Enter your ticket number"
            className="w-full max-w-full rounded-lg border border-gray-400 bg-midnight-200 px-4 py-[0.30rem] sm:max-w-52 md:w-44 md:min-w-56"
          />
        </div>
      </div>
    </div>
  );
};
