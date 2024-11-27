"use client";

import { useState, useEffect } from 'react';
import { JsonRpcProvider, Contract, BrowserProvider } from 'ethers';
import { blockChainConfig } from '../const';
 
export const useProvider = (userAddress) => { 


    const [infuraContract , setInfuraContract] = useState(null);
  

    const   connectToMetaMask= async () => {
        if (typeof window.ethereum !== "undefined") {
          try {
            // Use MetaMask's provider
            const metaMaskProvider = new BrowserProvider(window.ethereum);
      
            // Request account access from MetaMask
            await metaMaskProvider.send("eth_requestAccounts", []);
      
            // Create a signer from MetaMask's provider
            const signer = await metaMaskProvider.getSigner();
      
            // console.log("Connected to MetaMask with address:", await signer.getAddress());
      
            // Infura provider for fallback or additional interaction
            const inProvider = new JsonRpcProvider(
              "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
              80002 // Chain ID for Polygon Amoy testnet
            );
      
            const network = await inProvider.getNetwork();
            // console.log("Connected to Infura network:", network);
      
            const contract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, inProvider);
            const contractWithSigner = contract.connect(signer);
            setInfuraContract(contractWithSigner);
            const ownerTax= await contractWithSigner.getOwnerTax();
            // console.log("ownerTax",ownerTax);
            // console.log(contractWithSigner)
          } catch (error) {
            console.error("Error connecting to MetaMask:", error);
          }
        } else {
          console.error("MetaMask is not installed!");
        }
      }

      useEffect(()=>{
        if(infuraContract==null){
          connectToMetaMask();
        }

      },[infuraContract])
 
   
  return { infuraContract };
};
