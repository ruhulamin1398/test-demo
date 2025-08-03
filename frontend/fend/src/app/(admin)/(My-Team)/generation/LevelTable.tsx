import { SrbijaFont } from "@/fonts";
import React, { use, useEffect, useState } from "react";
import { useReferralData } from "@/contracts/contractUtils/useReferralData";
import { useUser } from "@/contracts/contractUtils/useUser";
import { blockChainConfig } from "@/contracts/const";
import { create } from "domain";

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

  const { user, ownerTaxAmount } = useUser();
  const [refTax, setRefTax] = useState([0.0, 0, 0, 0, 0, 0, 0]);

  const createRefLevelArray = (refTax) => {
    let refArray = [0.0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < refTax.length; i++) {
      refArray[i] = Number(refTax[i]) / blockChainConfig.decimals;
    }
    setRefTax(refArray);
  };

  useEffect(() => {
    if (user && user.refTax) {
      createRefLevelArray(user.refTax);

      console.log("This is user:", user);
    }
  }, [user]);
  return (
    <div className="text-sm font-thin md:text-lg lg:text-lg xl:text-xl">
      {levels.map(([levelName, stats], index) => (
        <div
          className={`grid grid-cols-5 rounded-md bg-[#1a1d46] px-2 py-3 text-start font-bold leading-[#34.1333px] md:items-center md:text-center ${SrbijaFont.className} font-normal leading-8`}
          key={index}
          style={{ marginTop: "clamp(8px,1vw,16px)" }}
        >
          <p className="bg-[#1a1d46] text-center md:py-3">
            {levelName.charAt(0).toUpperCase() + levelName.slice(1)}
          </p>
          <p className="bg-[#1a1d46] text-center">Active {stats.active}</p>
          <p className="bg-[#1a1d46] text-center">Inactive {stats.inactive}</p>
          <p className="col-span-2 bg-[#1a1d46] text-center">
            Ref. Com ${refTax[index].toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};
