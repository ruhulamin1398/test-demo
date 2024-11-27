/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui";
import { WalletMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contracts/contractUtils/useUser";

export const ConnectBtn = () => {
  const { user, isError } = useUser();
  const router = useRouter();
  const account = useAccount();
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const userRef = searchParams.get("ref");
  const [sendData, setSendData] = useState<boolean>(false);

  if (typeof window !== "undefined") {
    if (userRef) {
      localStorage.setItem("ref", userRef);
    }
  }

  useEffect(() => {
    const hasBeenRedirected = localStorage.getItem("hasBeenRedirected");

    if (account?.isConnected && !sendData && pathName !== "/dashboard" && !hasBeenRedirected) {
      localStorage.setItem("hasBeenRedirected", "true");
      router.push("/dashboard");
    }

    if (account?.isConnected && pathName === "/dashboard") {
      setSendData(true);
    }
    if (account?.isDisconnected) {
      setSendData(false);

      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get("ref");

      localStorage.removeItem("hasBeenRedirected");

      if (referralCode) {
        router.push(`/?ref=${referralCode}`);
      } else {
        router.push("/");
      }
    }
  }, [account, pathName, router, sendData]);


  useEffect(()=>{
    console.log(" user ", user, " is Error ", isError);
    },[user]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        // can remove all 'authenticationStatus' checks
        // const ready = mounted && authenticationStatus !== 'loading';
        const ready = mounted;
        const connected = ready && account && chain;
        //const connected = ready && account && chain && (!authenticationStatus ||authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="flex items-center gap-x-2 bg-white px-8 py-6 text-xl font-bold text-gray-900 hover:bg-gray-50"
                  >
                    <WalletMinimal className="size-5" />
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    className="flex items-center gap-x-2 bg-white px-6 py-5 font-bold text-gray-900 hover:bg-gray-50"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    className="bg-white px-6 py-6 text-gray-900 hover:bg-gray-50"
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {/* {chain.name}  */}
                    {/* <WalletMinimal className="mr-3 size-5" /> */}
                    {user?.usdT.toFixed(2)} &nbsp; <span className="text-lg"> USDT </span>
                  </Button>
                  <Button
                    onClick={openAccountModal}
                    className="bg-white px-6 py-6 text-lg text-gray-900 hover:bg-gray-50"
                  >
                    {account.displayName}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};