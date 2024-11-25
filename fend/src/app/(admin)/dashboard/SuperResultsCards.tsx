import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-reset";

import { BallList } from "@/components/shared";
import { cn } from "@/utils";
import React from "react";
import Link from "next/link";

interface LotteryResult {
  winner: string;
  ticket: number[];
  prize: number;
  amount: number;
  search_ticket: number;
}

// Define the props for the ResultsCards component
interface Props extends React.ComponentProps<"div"> {
  round: number;
  data: LotteryResult[];
}

export const SuperResultsCards = ({ className, data, round, ...props }: Props) => {
  const formatAddress = (address: string) => {
    return `${address?.slice(0, 2)}......${address?.slice(-4)}`;
  };

  return (
    <div className={cn("rounded-2xl px-2 py-6", className)} {...props}>
      <div className="flex items-center justify-between px-3">
        <p className="font-black"> SUPER JACKPOT</p>
        <p>Round #{round}</p>
      </div>
      <Table className="mt-6 w-full text-center">
        <TableHeader className="border-0">
          <TableRow className="border-0 text-base *:text-center">
            <TableHead>User</TableHead>
            <TableHead>Ticket Number</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <>
          <TableBody>
            {data?.slice(0, 8).map(
              (
                item,
                index, // Map over the result array
              ) => (
                <TableRow className="text-md border-0" key={index}>
                  <TableCell className="text-base">{formatAddress(item.winner)}</TableCell>{" "}
                  {/* Display winner */}
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      {item?.ticket?.map((lottery: number, idx: number) => (
                        <div
                          key={idx}
                          className="flex size-8 items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black"
                        >
                          {lottery}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-base">
                    <p className="flex items-center justify-center gap-x-1">
                      <span>{item?.amount}</span> {/* Display prize amount */}
                      <span className="usdt"> USDT</span>
                    </p>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </>
      </Table>

      <Link href={"/winners"}>
        <button className="btn-gradient-purple mt-8 w-full">See More</button>
      </Link>
    </div>
  );
};
