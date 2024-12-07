import { SrbijaFont } from "@/fonts";
import React from "react";
import { useReferralData } from "@/contracts/contractUtils/useReferralData";

interface LevelStats {
  active: number;
  inactive: number;
  referralCommission: number;
}

interface ReferralResponse {
  levelDetails: {
    level1: LevelStats;
    level2: LevelStats;
    level3: LevelStats;
    level4: LevelStats;
    level5: LevelStats;
    level6: LevelStats;
    level7: LevelStats;
  };
}

export const LevelTable = ({ levelDetails }: ReferralResponse) => {
  const levels = levelDetails === undefined ? [] : Object.entries(levelDetails);
  
  const { referralInfo, isError } = useReferralData();

  return (
    <div className="text-sm font-thin md:text-lg lg:text-lg xl:text-xl">
      {levels.map(([levelName, stats], index) => (
        <div
          className={`grid grid-cols-5 rounded-md bg-[#1a1d46] px-2 py-3 text-start font-bold leading-[#34.1333px] md:items-center md:text-center ${SrbijaFont.className} font-normal leading-8`}
          key={index}
          style={{ marginTop: "clamp(8px,1vw,16px)" }}
        >
          <p className="md:py-3 text-center bg-[#1a1d46]">{levelName.charAt(0).toUpperCase() + levelName.slice(1)}</p>
          <p className="text-center bg-[#1a1d46]">Active {stats.active}</p>
          <p className="text-center bg-[#1a1d46]">Inactive {stats.inactive}</p>
          <p className="col-span-2 text-center bg-[#1a1d46]">Ref. Com   ${referralInfo?.referralAmounts[index].toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};