"use client";

import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { cn } from "@/utils";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { appConfig } from "@/config";
interface Props extends React.ComponentProps<"div"> {
  setIsNextStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileRefer = ({ ...props }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const { address, isConnected } = useAccount();
  const [refLink, setRefLink] = useState("");

  const { data, isLoading } = useGetSingleUserDetailsQuery({address});

  console.log(data);

  

  useEffect(() => {
  setRefLink(appConfig.api ? appConfig.app+"?ref="+address : "");
    setIsHydrated(true);
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(refLink);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (!isHydrated || isLoading) return null;

  return (
    <section>
      <h2 className="mb-5 mt-10 text-xl font-extrabold"> Referral Link</h2>
      <div className="h-full min-h-56 rounded-lg bg-[#271E45] px-4">
        <h2 className="mb-3 pt-4 text-lg font-extrabold"> Your Referral Link</h2>

        <div className="flex items-center gap-x-2">
          <div
            className={cn("overflow-x-hidden text-nowrap rounded-md border px-4 py-2 text-sm", {
              "bg-green-800": isCopied,
            })}
          >
            {isConnected ? refLink : "To get a refferal link, please connect to your wallet."}
          </div>
          <button
            className="h-full whitespace-nowrap rounded-md bg-midnight-100 p-2 py-2"
            onClick={handleCopy}
          >
            {isCopied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <div className="rounded-md bg-gradient-to-l from-midnight-100 to-midnight-200">
          <h2 className="mb-3 mt-1 text-center text-lg font-extrabold"> Social Script </h2>

          <div className="mx-2 rounded-sm bg-white p-2 text-gray-950">
            <p className="mt-2">
              🎉 JACKPOT ALERT: Lottaverse Web3 Online Lottery Platform coming soon 🚀
            </p>

            <p className="mt-2">🌟 Features</p>
            <p>💯% 100% Decentralized, Smart Contract, Blockchain, Legal & Transparent</p>
            <p>🎉 500 Winners Every Draws</p>

            <p className="mt-2">✨ 25% Referral and Unilevel (Level-7)</p>

            <p className="mt-2">🎁 10,000 Tickets Are sold Instand Draws Every Packages</p>

            <p className="mt-2"> 💰 Easy Jackpot:</p>
            <p>1st Prize 1×5000 USDT</p>
            <p>2nd Prize 2×850 USDT</p>
            <p>3rd Prize 3×500 USDT</p>
            <p>4th Prize 10×100 USDT</p>
            <p>5th Prize 484×10 USDT</p>

            <p className="mt-2">💰 Super-X Jackpot:</p>
            <p>1st Prize 1×15000 USDT</p>
            <p>2nd Prize 2×3000 USDT</p>
            <p>3rd Prize 3×1000 USDT</p>
            <p>4th Prize 70×100 USDT</p>
            <p>4th Prize 484×30 USDT</p>
            <p>🎁 Instant Withdraw</p>
            <p>{refLink}</p>
          </div>

          <div className="my-4 flex items-center justify-center">
            <button className="rounded-lg bg-gray-400 px-4 py-2">Copy Script </button>
          </div>
        </div>

        <div
          className="rounded-md"
          style={{
            background: `linear-gradient(90deg, rgba(7,30,46,1) 0%, rgba(32,63,81,1) 66%, rgba(56,94,113,1) 100%)`,
          }}
        >
          <h2 className="mb-3 mt-1 text-center text-lg font-extrabold"> Social Script </h2>

          <div className="mx-2 rounded-sm bg-white p-2 text-gray-950">
            <p className="mt-2">
              🎉 JACKPOT ALERT: Lottaverse Web3 Online Lottery Platform coming soon 🚀
            </p>

            <p className="mt-2">🌟 Features</p>
            <p>💯% 100% Decentralized, Smart Contract, Blockchain, Legal & Transparent</p>
            <p>🎉 500 Winners Every Draws</p>

            <p className="mt-2">✨ 25% Referral and Unilevel (Level-7)</p>

            <p className="mt-2">🎁 10,000 Tickets Are sold Instand Draws Every Packages</p>

            <p className="mt-2"> 💰 Easy Jackpot:</p>
            <p>1st Prize 1×5000 USDT</p>
            <p>2nd Prize 2×850 USDT</p>
            <p>3rd Prize 3×500 USDT</p>
            <p>4th Prize 10×100 USDT</p>
            <p>5th Prize 484×10 USDT</p>

            <p className="mt-2">💰 Super-X Jackpot:</p>
            <p>1st Prize 1×15000 USDT</p>
            <p>2nd Prize 2×3000 USDT</p>
            <p>3rd Prize 3×1000 USDT</p>
            <p>4th Prize 70×100 USDT</p>
            <p>4th Prize 484×30 USDT</p>
            <p>🎁 Instant Withdraw</p>
            <p>{refLink}</p>
          </div>

          <div className="my-4 flex items-center justify-center">
            <button className="rounded-lg bg-gray-400 px-4 py-2">Copy Script </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileRefer;
