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
    <div className="text-xs font-thin md:text-sm lg:text-base xl:text-xl">
      {levels.map(([levelName, stats], index) => (
        <div
          className={`grid grid-cols-5 rounded-md bg-[#271E45] px-2 py-3 text-start font-bold leading-[#34.1333px] md:items-center md:text-center ${SrbijaFont.className} font-normal leading-8`}
          key={index}
          style={{ marginTop: "clamp(8px,1vw,16px)" }}
        >
          <p className="md:py-3">{levelName.charAt(0).toUpperCase() + levelName.slice(1)}</p>
          <p>Active {stats.active}</p>
          <p>Inactive {stats.inactive}</p>
          <p className="col-span-2">Ref. Com   ${referralInfo?.referralAmounts[index].toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};