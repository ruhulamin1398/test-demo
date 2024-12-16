"use client"

import React, { useEffect, useState } from "react";

// import { faqAccordionData } from "@/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BallList } from "@/components/shared";

import { useGetLotteryForBoardQuery } from "@/redux/api/all-api/lottery";
import { ResultsCards } from "../(admin)/dashboard/ResultsCards";
import { SuperResultsCards } from "../(admin)/dashboard/SuperResultsCards";
interface Props extends React.ComponentProps<"div"> { }

export const HomeFAQ = ({ ...props }: Props) => {

  const formatAddress = (address: string) => {
    return `${address?.slice(0, 2)}......${address?.slice(-4)}`;
  };

  const [more, setMore] = useState<Boolean>(false);
  const [winnerList, setWinnerList] = useState([]);

  const { data: boardData } = useGetLotteryForBoardQuery(undefined) 


  useEffect(() => {
    console.log("boardData_______________________", boardData);

    let winnersTickets = [];

    // Process lotteryType0
    (boardData?.lotteryType0 || []).forEach((item) => {
      winnersTickets.push(item);
    });

    // Process lotteryType1
    (boardData?.lotteryType1 || []).forEach((item) => {
      winnersTickets.push(item);
    });
    winnersTickets.sort((a, b) => b.amount - a.amount);
    // Update winner list
    if (more) {
      // Trim to size 15
      setWinnerList(winnersTickets.slice(0, 2));
    } else {
      // Trim to size 25
      setWinnerList(winnersTickets.slice(0, 25));
    }
 
  }, [boardData]);

 
 


  return (

    <>
      <div {...props} className="pt-36">
        <h3 className="home-header mb-2">FREQUENTLY ASKED QUESTIONS</h3>
        <p className="home-subheader mb-4">All you want to know about Lottaverse</p>

        <div className="mx-2 mt-10 space-y-3 sm:mx-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>USER</TableHead>
                <TableHead>POSITION</TableHead>
                <TableHead>TICKET NUMBER</TableHead>
                <TableHead>PRIZE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winnerList?.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>  {formatAddress(data?.winner)} </TableCell>
                    <TableCell>{data?.prize}</TableCell>
                    <TableCell>

                    <div className="flex justify-center space-x-2">
                      {data?.ticket?.map((lottery: number, idx: number) => (
                        <div
                          key={idx}
                          className="flex size-8 items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black"
                        >
                          {lottery}
                        </div>
                      ))}
                    </div>

                      <BallList ballClassName="size-4 sm:size-8 sm:text-xs text-[.6rem] cursor-pointer bg-[linear-gradient(26deg,#0B122E_9%,#212643_39%,#363A58_100%)] uppercase text-[#F9314B] shadow-[0_5px_10px_0_#000000CC]" />
                    </TableCell>
                    <TableCell className="text-yellow-500">
                     {data?.amount}<span className="usdt">USDT</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <button className="text-center w-full" onClick={()=>{setMore(!more)}}> {(more)?"View Less":"View More"}</button>
        </div>
      </div>


   
    </>
  );
};

{
  /* <div className="mx-10 space-y-3">
        {faqAccordionData.map((items) => {
          return (
            <div key={items.ans + items.qst} className="home-accordion-item">
              <p className="home-accordion-question"> {items.qst} </p>
              </div>
          );
        })}
      </div> */
}
