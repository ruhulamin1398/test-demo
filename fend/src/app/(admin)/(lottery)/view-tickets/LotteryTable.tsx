"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils";
import { capitalizeFirstLetter } from "@/utils/utils";

export const LotteryTable = ({ data }: any) => {


  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Ticket number</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        {


          data?.purchases?.length > 0 ?
            <TableBody>

              {data?.purchases?.map((purchase: any, index: number) => {
                const limit = data?.meta?.limit
                const globalIndex = (data?.meta?.currentPage - 1) * limit + (index + 1);
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p>{globalIndex}</p> {/* Show the global index */}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>{capitalizeFirstLetter((purchase?.tax?.lotteryType == 0) ? "Easy" : "Super")} Jackpot</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex grow flex-nowrap items-center justify-center gap-[0.20rem] sm:gap-x-2 md:gap-[0.10rem] lg:gap-x-2 space-x-2 ">
                        {purchase?.tax?.lottery?.map((num: any, index: number) => (
                          <span
                            key={index}
                            style={{
                              boxShadow: `#000000cc 0px 5px 10px 0px`,
                              fontFamily: `"Open Sans", sans-serif`,
                            }}
                            className={cn(
                              "flex items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black sm:size-10 md:size-7 lg:size-8",
                              `[#1a9d92] cursor-pointer text-center leading-8 text-white`,
                            )}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-yellow-500">
                      <p>{capitalizeFirstLetter(purchase?.tax?.status)}</p>
                    </TableCell>
                  </TableRow>
                );
              })}

            </TableBody>

            : <TableBody className="h-40 text-xl flex justify-center items-center w-full"> No lottery found</TableBody>

        }
      </Table>

    </>
  );
};