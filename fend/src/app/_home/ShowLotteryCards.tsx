import React from "react";
import { EditionCards } from "./EditionCards";
interface Props extends React.ComponentProps<"div"> {}

export const ShowLotteryDetails = ({ ...props }: Props) => {
  return (
    <div {...props} className="mx-4 md:mx-10">
      <div className="py-6">
        <h3 className="home-header">super rare edition GAMING HUBS</h3>
        <p className="home-subheader">
          Find your maximum and daily revenue share by modifying the calculator’s settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <EditionCards jackpotType="Easy" />
        <EditionCards jackpotType="Super" />
      </div>
    </div>
  );
};
