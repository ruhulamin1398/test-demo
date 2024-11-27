"use client";

import { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { blockChainConfig } from '../const';

export const useLeader = () => {

  // ============ top buyer  ============================ 
  //  get all data from blocchain 
  // update top buyer list 
  //  update topBuyer runing balance  setTopBuyerRunningBalance
  //    if in list get topBuyerBalance  



  // ============ top Leader  ============================ 
  //  get all data from blocchain 
  // update top Leader list 
  //  update topLader runing balance 


  const { address, isConnected } = useAccount();

  const [topLeaders, setTopLeaders] = useState<any>([]);
  const [topLeaderBalance, setTopLeaderBalance] = useState<number>(0);
  const [topLeaderRunningBalance, setTopLeaderRunningBalance] = useState<number>(0);

  const [topBuyers, setTopBuyers] = useState<any>([]);
  const [topBuyerBalance, setTopBuyerBalance] = useState<number>(0);
  const [topBuyerRunningBalance, setTopBuyerRunningBalance] = useState<number>(0);

  const [leaderBalance, setLeaderBalance] = useState<number>(0);
  const leaderBonusRate = [13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];


  // Function to fetch lottery data by type
  // const fetchTopBuyerData = () => {
  //   const { data: dataTopBuyers, error } = useContractRead({
  //     address: blockChainConfig.contractAddress as `0x${string}`,
  //     abi: blockChainConfig.lotteryABI,
  //     functionName: 'calculateTopBuyer',
  //     args: [],
  //     enabled: isConnected && !!address, // Only run if connected and address is available
  //     onError() {
  //       console.error(`Error fetching Top Buyers`);
  //     },
  //   });


  const { data: contractData } = useContractRead({
    address: blockChainConfig.contractAddress as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'getTopBuyerList',

    enabled: isConnected && !!address, // Only run if connected and address is available
    onError() {
      console.error("Error fetching getTopBuyerList");

    },
  });


  useEffect(() => {
    // console.log("getTopBuyerList ", contractData);
    if (contractData) {
      for (let i = 0; i < contractData[0]?.length; i++) {
        contractData[0][i].reward = Number(contractData[1]) / 30;

        if (contractData[0][i].user == address) {
          setTopBuyerBalance(Number(contractData[1]) / 30);
        }

      }

      setTopBuyers(contractData[0]);
      // console.log(" getTopBuyerList ", contractData);
        setTopBuyerRunningBalance(Number(contractData[1]));
    }
  }, [contractData]);


  const { data: topLeadersData } = useContractRead({
    address: blockChainConfig.contractAddress as `0x${string}`,
    abi: blockChainConfig.lotteryABI,
    functionName: 'getTop20Leaders',

    enabled: isConnected && !!address, // Only run if connected and address is available
    onError() {
      console.error("Error fetching topLeadersData");

    },
  });

  useEffect(() => {
    // console.log("topLeadersData  from blockchain - ", topLeadersData);
    if (topLeadersData) {

      setTopLeaders(topLeadersData[0]);

      for (let i = 0; i < topLeadersData[0]?.length; i++) {
        topLeadersData[0][i].reward = Number(topLeadersData[1])*leaderBonusRate[i] / 100;

        if (topLeadersData[0][i].user == address) {
          setTopBuyerBalance(Number(topLeadersData[1])*leaderBonusRate[i] / 100);
        }

      }


      // console.log(" topLeadersData ", topLeadersData);
 

 
        setTopLeaderRunningBalance(Number(topLeadersData[1]));
         

      // if(contractData.includes(address)){
      //           setTopBuyerBalance(50);                
      // }


    }
  }, [topLeadersData]);


  useEffect(() => {
    setLeaderBalance(topLeaderBalance + topBuyerBalance);
    // console.log(" Leader balance ", topLeaderBalance+topBuyerBalance + topLeaderRunningBalance+ topBuyerRunningBalance);


  }, [topLeaderBalance, topBuyerBalance]);

  // function userTopBuyerExist(address:string ): boolean {
  //   console.log(address)
  //   return topBuyers.some(addr => addr.toLowerCase() === address.toLowerCase());
  // }

  // fetchTopBuyerData();



  return { topBuyers, topLeaders, leaderBalance, topLeaderRunningBalance, topBuyerRunningBalance };
};
