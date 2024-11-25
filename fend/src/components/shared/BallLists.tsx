import React from "react";

import { cn } from "@/utils";
import { Trash2 } from "lucide-react";
interface Props extends React.ComponentProps<"div"> {
  ballClassName?: string;
  totalTickets: number[][];
  deleteTickets: (index: number) => void;
}

const BallLists = ({ className, ballClassName, totalTickets, deleteTickets, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex grow flex-nowrap items-center justify-center gap-[0.20rem] sm:gap-x-2 md:gap-[0.10rem] lg:gap-x-2",
        className,
      )}
      {...props}
    >
      <div className="mt-2 max-h-[300px] overflow-y-auto lg:max-h-[160px]">
        {totalTickets.length > 0 &&
          totalTickets.map((ticket, index) => (
            <div
              className="main-bg-gradient-reverse mx-auto mb-2 flex items-center justify-between gap-x-3 rounded-lg p-2 px-16 shadow-md"
              key={index}
            >
              <ul className="flex gap-2">
                {ticket.map((number, idx) => (
                  <li
                    key={idx}
                    style={{
                      boxShadow: `#000000cc 0px 5px 10px 0px`,
                      fontFamily: `"Open Sans", sans-serif`,
                    }}
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black sm:size-10 md:size-7 lg:size-8",
                      `[#1a9d92] cursor-pointer text-center leading-8 text-white`,
                      ballClassName,
                    )}
                  >
                    {number}
                  </li>
                ))}
              </ul>
              <div>
                <Trash2
                  onClick={() => deleteTickets(index)}
                  className="ml-3 cursor-pointer text-red-700 md:ml-7"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BallLists;
