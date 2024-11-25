import React from "react";
import {CircularProgress, Card, CardHeader, CardBody, CardFooter, Chip} from "@nextui-org/react";

export default function App() {
  return (
    <Card className="w-[240px] h-[290px] rounded-lg border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
       <CardHeader className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-lg font-bold",
          }}
          variant="bordered"
        >
         Easy
        </Chip>
      </CardHeader>
      <CardBody className="justify-center items-center pb-0 ">
        <CircularProgress
          classNames={{
            svg: "w-36 h-50 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={60}
          strokeWidth={4}
          showValueLabel={true}
          //formatOptions={{ style:"", unit:"Doller" }}
        />
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          2800 Tickets are booked
        </Chip>
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          2800 Tickets are booked
        </Chip>
      </CardFooter>
    </Card>
  );
}