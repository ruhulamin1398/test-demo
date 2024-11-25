import React from "react";

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

interface Props extends React.ComponentProps<"div"> {}

export const HomeFAQ = ({ ...props }: Props) => {
  return (
    <div {...props} className="pt-36">
      <h3 className="home-header">FREQUENTLY ASKED QUESTIONS</h3>
      <p className="home-subheader">All you want to know about Lottaverse</p>

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
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>0x...0e17</TableCell>
                  <TableCell>1st</TableCell>
                  <TableCell>
                    <BallList ballClassName="size-4 sm:size-8 sm:text-xs text-[.6rem] cursor-pointer bg-[linear-gradient(26deg,#0B122E_9%,#212643_39%,#363A58_100%)] uppercase text-[#F9314B] shadow-[0_5px_10px_0_#000000CC]" />
                  </TableCell>
                  <TableCell className="text-yellow-500">
                    0.000 <span className="usdt">USDT</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
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
