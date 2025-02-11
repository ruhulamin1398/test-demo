import { cn } from "@/utils";
import React from "react";


type TaxType = {
  lotteryType: string;
  status: string;
  lottery: number[];
};


interface Props extends React.ComponentProps<"div"> {
  ballClassName?: string;
  ballList: TaxType[]
}


export const BallList = ({ ballList, className, ballClassName, ...props }: Props) => {
  const ticketsNumber = [];
  const isUnique = new Map();
  for (let i = 0; i < 6; i++) {
    let Randoms;
    do {
      Randoms = Math.floor(Math.random() * 99 + 1);
    } while (isUnique.has(Randoms));
    ticketsNumber.push(Randoms);
    isUnique.set(Randoms, true);
  }

// console.log("ballList", ballList)


  return (
    <div
      className={cn(
        "flex grow flex-nowrap items-center justify-center gap-[0.20rem] sm:gap-x-2 md:gap-[0.10rem] lg:gap-x-2",
        className,
      )}
      {...props}
    >



      <div>
        {ballList?.map((array, arrayIndex) => (
          <div
            key={arrayIndex}
            className="flex mb-4 space-x-2"
          >
            {array?.lottery?.length > 0 ? (
              array?.lottery?.map((num, index) => (
                <span
                  key={index}
                  style={{
                    boxShadow: `#000000cc 0px 5px 10px 0px`,
                    fontFamily: `"Open Sans", sans-serif`,
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black sm:size-10 md:size-7 lg:size-8",
                    `[#1a9d92] cursor-pointer text-center leading-8 text-white`,
                    ballClassName,
                  )}
                >
                  {num}
                </span>
              ))
            ) : (
              <span
                style={{
                  boxShadow: `#000000cc 0px 5px 10px 0px`,
                  fontFamily: `"Open Sans", sans-serif`,
                }}
                className={cn(
                  "flex items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black sm:size-10 md:size-7 lg:size-8",
                  `[#1a9d92] cursor-pointer text-center leading-8 text-white`,
                  ballClassName,
                )}
              >
                No lottery found
              </span>
            )}
          </div>
        ))}
      </div>


    </div>
  );
};