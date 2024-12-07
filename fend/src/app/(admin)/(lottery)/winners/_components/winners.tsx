"use client";
import React, { useState } from "react";
import { useGetDrawLotteryDetailsQuery } from "@/redux/api/all-api/lottery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "../../view-tickets/PaginationComponent";

type LotteryType = "0" | "1";

const Winners = () => {
  const [searchId, setSearchId] = useState("");
  const [round, setRound] = useState("");
  const [lotteryType, setLotteryType] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const { data, isLoading, error } = useGetDrawLotteryDetailsQuery({
    search_ticket: searchId,
    lotteryType,
    round,
    page,
    limit,
  });

  const roundMapping: { [key in LotteryType]: number } = {
    "0": data?.roundForEasy || 0,
    "1": data?.roundForSuper || 0,
  };

  const length = roundMapping[lotteryType as LotteryType];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setRound("")
    setLotteryType("")
  };
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setRound("")
    setLotteryType("")
  };


  const formatAddress = (address: string) => {
    return `${address?.slice(0, 2)}......${address?.slice(-4)}`;
  };

  // Loading state
  if (isLoading) {
    return <div className="h-40 flex justify-center items-center text-xl">Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center h-40 items-center my-5 text-xl">
        No data found
      </div>
    );
  }

  return (
    <div>
        <h1 className="mb-1 mt-0 text-xl font-black">Winners</h1>
      <div className="min-h-10 rounded-md bg-[#1a1d46] px-4 py-4">
        <div className="flex flex-col gap-x-10 gap-y-8 md:flex-row py-5 justify-between">
          {/* Lottery Type */}
          <div className="flex flex-row gap-3 flex-1 w-full">
            <p className="items-center rounded-t-md text-sm font-bold md:text-lg w-[500px] " style={{width:"90px" }}>Packages&nbsp;: </p>
            <Select
              onValueChange={(value: LotteryType) => {
                setLotteryType(value);
                setRound(""); // Reset round when lottery type changes
              }}
            >
              <SelectTrigger className="md:min-w-56">
                <SelectValue placeholder="Select" className="font-black" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0" className="cursor-pointer">Easy</SelectItem>
                <SelectItem value="1" className="cursor-pointer">Super</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Round */}
          <div className="flex flex-row gap-3 flex-1 w-full">
            <p className="items-center rounded-t-md text-sm font-bold md:text-lg w-[500px] " style={{width:"90px" }}>Round&nbsp;:</p>
            <Select onValueChange={(value) => setRound(value)}>
              <SelectTrigger className="md:min-w-56">
                <SelectValue placeholder="Select" className="font-black" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length }, (_, index) => (
                  <SelectItem
                    key={index + 1}
                    value={`${index + 1}`}
                    className="cursor-pointer"
                  >
                    Round {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ticket Search */}
          <div className="flex flex-row gap-3 flex-1 w-full">
            <p className="items-center rounded-t-md text-sm font-bold md:text-lg w-[500px] " style={{width:"90px" }}>Ticket&nbsp;:</p>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchId(e.target.value)}
              type="number"
              placeholder="Enter your ticket number"
              className="  rounded-lg border  bg-[#1a1d46] px-4 py-[0.30rem] w-full"
            />
          </div>
        </div>
      </div>

      {/* Winner Table */}
      <Table className="text-center mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Ticket</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            data?.lotteries?.length > 0 ? <> {data?.lotteries.map((draw: any, index: number) => (
              <TableRow key={`${draw.prize}-${index}`}>
                <TableCell>{formatAddress(draw.winner)}</TableCell>
                <TableCell>  {draw.prize}</TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    {draw?.ticket?.map((lottery: number, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center rounded-full bg-[#4D22FC] text-xs font-black w-8 h-8"
                      >
                        {lottery}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${draw.amount}</TableCell>
              </TableRow>
            ))}</> : <> <div className="flex justify-center h-40 items-center my-5 text-xl">
              No data found
            </div></>
          }

        </TableBody>
      </Table>

      {
        data?.lotteries?.length > 0 &&
        <PaginationComponent
          currentPage={page}
          totalPages={data?.meta?.totalPages}
          onPageChange={handlePageChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />
      }
    </div>
  );
};

export default Winners;
