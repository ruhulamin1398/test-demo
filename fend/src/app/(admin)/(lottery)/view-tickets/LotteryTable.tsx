"use client";

import { BallList } from "@/components/shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/utils/utils";

export const LotteryTable = ({ data }: any) => {
  let serialNumber = 1;

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
        <TableBody>
          {data?.purchases.map((purchase: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <div>
                  {purchase?.tax.map((lottery: any, idx: number) => (
                    <div key={idx} className={"py-[10px]"}>
                      {/* Use serial number and increment after rendering */}
                      <p>{serialNumber++}</p>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {purchase?.tax?.map((lottery: any, idx: number) => (
                    <div key={idx} className={"py-[10px]"}>
                      <p>{capitalizeFirstLetter( (lottery?.lotteryType == 0)? "Easy" : "Super"   )} Jackpot</p>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <BallList ballList={purchase?.tax} />
              </TableCell>

              <TableCell className="text-yellow-500">
                {purchase?.tax?.map((lottery: any, idx: number) => (
                  <div key={idx} className={"py-[10px]"}>
                    <p>{capitalizeFirstLetter(lottery?.status)}</p>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};