import { Gift } from "lucide-react";
import React from "react";
interface Props extends React.ComponentProps<"div"> {
  jackpotType: string;
}

export const EditionCards = ({ jackpotType, ...props }: Props) => {
  return (
    <div {...props}>
      <div className="flex justify-between text-center text-base uppercase md:text-2xl">
        <p>{jackpotType} Jackpot</p>
        <p>
          Ticket Price 10 <span className="usdt">USDT</span>
        </p>
      </div>
      <div className="glassmorphism space-y-3 px-10 py-12 text-sm">
        {[1, 2, 3, 4, 5].map((items) => {
          return (
            <div className={`flex items-center justify-between gap-x-2`} key={items}>
              <p className="flex items-center gap-x-1">
                <Gift className="text-yellow-500" />
                <span className={`font-medium uppercase`}>1st Prize 1 Person</span>
              </p>
              <p className="space-x-1 font-medium leading-4 text-green-400">
                <span>5000</span>
                <span className="usdt">USDT</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
