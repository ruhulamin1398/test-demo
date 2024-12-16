import React from "react";
import { EditionCards } from "./EditionCards";
interface Props extends React.ComponentProps<"div"> {}

export const ShowLotteryDetails = ({ ...props }: Props) => {

  const easyLottery =[
    {
      title:"1st",
      amount:5000,
      person:1
    },{
      title:"2nd",
      amount:1000,
      person:2
    },{
      title:"3rd",
      amount:900,
      person:3
    },{
      title:"4th",
      amount:800,
      person:8
    },{
      title:"5th",
      amount:4860,
      person:486
    },
  ]


  const SuperLottery =[
    {
      title:"1st",
      amount:15000,
      person:1
    },{
      title:"2nd",
      amount:6000,
      person:2
    },{
      title:"3rd",
      amount:3000,
      person:3
    },{
      title:"4th",
      amount:3000,
      person:30
    },{
      title:"5th",
      amount:13920,
      person:464
    },
  ]


  return (
    <div {...props} className="mx-4 md:mx-10">
      <div className="py-6">
        <h3 className="home-header">super rare edition GAMING HUBS</h3>
        <p className="home-subheader">
          Find your maximum and daily revenue share by modifying the calculator’s settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <EditionCards jackpotType="Easy" price="3" data={easyLottery} />
        <EditionCards jackpotType="Super" price="10" data={SuperLottery}/>
      </div>
    </div>
  );
};
