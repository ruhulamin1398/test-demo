import { Contract, BrowserProvider } from 'ethers';
import { blockChainConfig } from '../const';  

import Web3Token from "web3-token";

export   const  getContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const metaMaskProvider = new BrowserProvider(window.ethereum);
      
      // Request account access
      await metaMaskProvider.send('eth_requestAccounts', []);

      // Get the signer (the user's wallet)
      const signer = await metaMaskProvider.getSigner();
      
      // Create the contract instance
      const mContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, signer);

      // Sign a message to create the token (assuming Web3Token is a valid utility)
      const token = await Web3Token.sign(async (msg) => await signer.signMessage(msg));

      // Return an object containing all values
      return { mContract, signer, token };
      
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw new Error('Could not connect to MetaMask or instantiate contract');
    }
  } else {
    console.error('MetaMask is not installed!');
    throw new Error('MetaMask is not installed');
  }
};

