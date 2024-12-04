import React, { useEffect, useState } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
  
import {toast} from "react-toastify"
import { useMetaMask } from "metamask-react";
import Error from "./error"
import { Button } from "@nextui-org/react";

import { useLeader } from "../contracts/utils/useLeader";
import { Contract, JsonRpcProvider, parseUnits, Wallet } from "ethers";
export default function App() {
  const { status, account } = useMetaMask(); 
 
  const [leaderReserve, setLeaderReserve] = React.useState(0); 
  const [type , setType] = useState(1)
  const {  setLoad, topBuyers, topLeaders,   topLeaderRunningBalance, topBuyerRunningBalance  } = useLeader('0xBa926bE5738D978e6e1006f6bB66570FC4123064');

useEffect(()=>{
  setLeaderReserve(topLeaderRunningBalance/blockChainConfig.decimals)

},[topLeaderRunningBalance]);
  
 
   
useEffect(()=>{
 
  // console.log( topBuyers, topLeaders,   topLeaderRunningBalance, topBuyerRunningBalance  )

  if(type == 0){
    setLoad(0);
    setLeaderReserve(topBuyerRunningBalance/blockChainConfig.decimals);
  
  }else{
    setLoad(1);
    setLeaderReserve(topLeaderRunningBalance/blockChainConfig.decimals);
  }
},[type]);


 const distributeLeaderAmount = async() =>{
  const inProvider = new JsonRpcProvider(
    "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
    {
      chainId: 80002, // Chain ID for Polygon Amoy testnet
      name: "polygon-amoy"
    }
  );
  const wallet = new Wallet(pk, inProvider);

  const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, wallet);
  try{
    const tx = await inContract.distributeTopLeadersAmounts( { gasLimit: 22000000, gasPrice: parseUnits("29", "gwei") });
    const Tx = await tx.wait(10);
    if (Tx.status === 1) {
      toast.dismiss();
      toast.success("Leader board distributed successfully");
    }
    else{
      toast.dismiss();
      toast.error("Something went wrong");
    }

  }catch(err){

    toast.dismiss();
    toast.error("Something went wrong");
  }


 }

  // const distributeLeader = async () => {
  //   if (numberOfLeader !== 0) {
  //     const provider = new BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();
  //     if (signer.address == owner) {
  //       toast.loading("Leader board distribute waiting...");
  //       const contract = new Contract(contractAddress, lottaverABI, signer);
  //       const leaderBoards = [];
  //       for (let i = 0; i < numberOfLeader; i++) {
  //         leaderBoards.push(topLeaders[i].address);
  //       }
  //       const tx = await contract.RewardDistributor(
  //         leaderBoards,
  //         "0x3d90aa864a100cd8bdacf8ff345c8bd8b5ad92fc1863e0f9e45449837342c587",
  //         false
  //       );
  //       const Tx = await tx.wait(1);
  //       setLeaderReserve(Number(await contract.LeaderBoardReserve()));
  //       setAction(false);
  //       toast.dismiss();
  //       toast.success("leader board distributed successfully");
  //     } else {
  //       toast.dismiss();
  //       toast.success("Only owner can distribute Leader board");
  //       return;
  //     }
  //   } else {
  //     setAction(false);
  //   }
  // };

    

  return (
    <>
      {status === "connected" &&
      account.toLowerCase() === blockChainConfig.owner.toLowerCase() ? (
        <>
          <div className="w-[90%] mx-auto mt-2 rounded-md flex  justify-between p-4 bg-gradient-to-br from-black to-gray-300">
            <div className="grow flex  justify-start">
              <div className="flex flex-col">
                <h1 className=" font-bold text-3xl text-white">Leader board</h1>
                <br />
                <div>
                  <Button
                    auto
                    shadow
                    animated
                    className={`border rounded mr-6 text-white ${
                      type ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setType(1)} // Show top leaders
                  >
                    Top Leader
                  </Button>
                  <Button
                    auto
                    shadow
                    animated
                    className={`border mr-5 rounded text-white ${
                      !type ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setType(0)} // Show top buyers
                  >
                    Top Buyer
                  </Button>
                </div>
              </div>
            </div>
 
            <div className="w-1/7 flex flex-col items-end  gap-2">
              <h2 className="font-bold text-lg">Reserve</h2>
              <div className="flex gap-2 justify-end items-end">
                <h1 className="font-bold text-3xl">
                 


              {leaderReserve}
                </h1>
                <p className="text-xs font-semibold">USDc</p>
              </div>
            
                {type && (
              <div className=" flex rounded-full border-2  border-blue-500 ">
                  <button
                    className="bg-blue-500 rounded-full px-2 font-bold text-white"
                    onClick={() => distributeLeaderAmount()}
                  >
                    Distribute Top Leader
                  </button>
                   
              </div>
              
                )}
               
            </div>
          </div>
          {type ? (
            <>
              <h1>Top Leaders</h1>
              <div className="w-[80%] mx-auto bg-slate-400 rounded-lg p-2 m-2">
                <table className="w-full mx-auto  p-2 ">
                  <thead>
                    <tr className="bg-slate-500  m-1 font-bold p-1">
                      <th className="rounded-s-full p-1">User</th>
                      <th>Tickets</th>
                      <th  >Spend</th>
                      <th className="rounded-e-full p-1">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                  {topLeaders.length > 0 ? (
                      topLeaders.map((data, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Jazzicon
                                seed={jsNumberForAddress(data[0])}
                                diameter={30}
                              />
                              <div>{`${data[0]?.slice(
                                0,
                                2
                              )}..${data[0]?.slice(-4)}`}</div>
                            </div>
                          </td>
                          <td>
                             {Number(data[1])}
                          </td>
                          <td>{Number(data[2])/blockChainConfig.decimals} </td>
                          <td>{(Number(data['reward'])/blockChainConfig.decimals).toFixed(2)} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No Records</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <h1>Top Buyers</h1>
              <div className="w-[80%] mx-auto bg-slate-400 rounded-lg p-2 m-2">
                <table className="w-full mx-auto  p-2 ">
                  <thead>
                    <tr className="bg-slate-500  m-1 font-bold p-1">
                      <th className="rounded-s-full p-1">User</th>
                      <th>Total Purchased Ticket</th>
                      <th className="rounded-e-full p-1">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {topBuyers.length > 0 ? (
                      topBuyers.map((data, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Jazzicon
                                seed={jsNumberForAddress(data[0])}
                                diameter={30}
                              />
                              <div>{`${data[0]?.slice(
                                0,
                                2
                              )}..${data[0]?.slice(-4)}`}</div>
                            </div>
                          </td>
                          <td>
                             {Number(data[1])}
                          </td>
                          <td>{Number(data[2])/blockChainConfig.decimals} </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No Records</td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <Error />
      )}
    </>
  );
}
