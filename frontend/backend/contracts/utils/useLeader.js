"use client";

import { useState, useEffect } from 'react';
import { JsonRpcProvider, Contract, BrowserProvider } from 'ethers';
import { blockChainConfig } from '../const';

const inProvider = new BrowserProvider(window.ethereum);
const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, inProvider);

export const useLeader = (userAddress) => {
  const [load, setLoad]= useState(0);
  const [topLeaders, setTopLeaders] = useState([]);
  const [topLeaderBalance, setTopLeaderBalance] = useState(0);
  const [topLeaderRunningBalance, setTopLeaderRunningBalance] = useState(0);

  const [topBuyers, setTopBuyers] = useState([]);
  const [topBuyerBalance, setTopBuyerBalance] = useState(0);
  const [topBuyerRunningBalance, setTopBuyerRunningBalance] = useState(0);

  const [leaderBalance, setLeaderBalance] = useState(0);
  const leaderBonusRate = [13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];

  useEffect(() => {
    const fetchTopBuyers = async () => {
      try {
        const contractData = await inContract.getTopBuyerList();
        // console.log("getTopBuyerList", contractData);
        if (contractData) {
       
       setTopBuyers(contractData[0]);
          setTopBuyerRunningBalance(Number(contractData[1]));
        }
      } catch (error) {
        // console.error("Error fetching getTopBuyerList", error);
      }
    };

    const fetchTopLeaders = async () => {
      try {
        const topLaders = await inContract.getTop20Leaders();
        // console.log("topLeaders", topLaders);
    
        if (topLaders) {
          const updatedLeaders = topLaders[0].map((leader, i) => {
            const reward = Number(topLaders[1]) * leaderBonusRate[i] / 100;
    
            const updatedLeader = {
              ...leader,  // Spread existing leader properties
              reward: reward,  // Add or update the reward property
            };
    
            if (updatedLeader.user === userAddress) {
              setTopLeaderBalance(reward);
            }
    
            return updatedLeader;
          });
    
          setTopLeaders(updatedLeaders);
          setTopLeaderRunningBalance(Number(topLaders[1]));
        }
      } catch (error) {
        console.error("Error fetching topLeaders", error);
      }
    };
    

   
      fetchTopBuyers();
      fetchTopLeaders();
    
  }, [load]);

  useEffect(() => {
    setLeaderBalance(topLeaderBalance + topBuyerBalance);
  }, [topLeaderBalance, topBuyerBalance]);

  return { setLoad, topBuyers, topLeaders, leaderBalance, topLeaderBalance, topBuyerBalance, topLeaderRunningBalance, topBuyerRunningBalance };
};
