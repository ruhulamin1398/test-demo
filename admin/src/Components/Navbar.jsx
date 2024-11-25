import React from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { useMetaMask } from "metamask-react";
import axios from "axios";
import { BrowserProvider, JsonRpcProvider } from "ethers";

export default function NaavbarComp({setRoute}) {
    const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
  const menuItems = [
    "Dashboard",
    "LeaderBoard",
    "premiums",
    "Referrals",
    // "Deployments",
    // "My Settings",
    // "Team Settings",
    // "Help & Feedback",
    // "Log Out",
  ];

  // const purchase = ()=>{
  //   axios.post('http://localhost:5000/purchase', {
  //     lotteryId: 12343567788,
  //     _id:
  //   })
  // }

  // const createLottery = async ()=>{
  //  await axios.post("https://api.lottaverse.io/createLottery", {
  //     lotteryId: 5567,
  //     price: 1000,
  //     topPrize: [100000, 10000, 10000],
  //     generalPrize: [5000, 100],
  //     lotteryType: "easy"
  //   })
  // }

  const connectMetamask = async()=>{
    await connect();
    const provider = new  BrowserProvider(window.ethereum);
    //const providerjson = new JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc")
    if(Number((await provider._detectNetwork()).chainId) !== 43113){
      console.warn()
      switchChain("0xA869")
    }
    
  }

  return (
    <Navbar className="bg-gradient-to-br from-gray-400 to-gray-700">
      <NavbarContent className="" justify="start">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit" onClick={() => setRoute(0)}>
            Lottaverse
          </p>

          <div className="space-x-6 flex justify-center ml-10">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <div
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                  onClick={() => setRoute(index + 1)}
                >
                  {item}
                </div>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {status === "initializing" ? (
          `Sync with MetaMask ongoing...`
        ) : status === "unavailable" ? (
          `MetaMask not available`
        ) : status === "notConnected" ? (
          <button onClick={connectMetamask}>Connect Wallet</button>
        ) : status === "connecting" ? (
          `Connecting...`
        ) : (
          `${account?.slice(0, 4)}..${account?.slice(-4)}`
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <div
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
              onClick={() => setRoute(index + 1)}
            >
              {item}
            </div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
