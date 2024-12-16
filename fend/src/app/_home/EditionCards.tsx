import { Gift } from "lucide-react";
import React from "react";
interface Props extends React.ComponentProps<"div"> {
  jackpotType: string;
  price: string;
  data: any;

}

export const EditionCards = ({ jackpotType,price,data, ...props }: Props) => {
  return (
    <div {...props}>
      <div className="flex justify-between text-center text-base uppercase md:text-lg px-5 py-3">
        <p>{jackpotType} Jackpot</p>
        <p>
          Ticket Price {price} <span className="usdt">USDT</span>
        </p>
      </div>
      <div className="glassmorphism space-y-1 md:space-y-3 px-2 md:px-10 py-4 md:py-12 test-xs md:text-base">
        {data.map((item, id) => {
          return (
            <div className={`flex items-center justify-between gap-x-2 py-2`} key={id}>
              <p className="flex items-center gap-x-1">
                <Gift className="text-yellow-500" />
                <span className={`uppercase`}>{item.title} Prize {item.person} Person</span>
              </p>
              <p className="space-x-1   leading-4 text-green-400">
                <span>{item.amount}</span>
                <span className="usdt">USDT</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
