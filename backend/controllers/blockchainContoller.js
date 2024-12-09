require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const providerUrl = process.env.PROVIDER_URL; // e.g., Infura, Alchemy URL
const contractAddress = process.env.CONTRACT_ADDRESS;
const lotteryABI = require("../contracts/LotteryABI.json");// Ensure ABI file exists
const lottery = require("../models/lottery");

// Initialize the provider (e.g., Infura, Alchemy)
const provider = new ethers.JsonRpcProvider(providerUrl);

// Initialize the contract with the ABI and contract address
const contract = new ethers.Contract(contractAddress, lotteryABI.abi, provider);




const convertLotteryNumbers = (taxArray) => {
  return taxArray.map((item) => {
    return item.lottery
      .map((num) => num.toString().padStart(2, '0')) // Ensure 2 digits
      .join(''); // Combine into a single string
  });
};

const upgradeLotteryTicketCount = async (type) => {
  let lotteryDataFromBlockchain;
  let lotteryDataFromDB;
  let lotteryNumbers;

  try {
    // Call the contract method
    const lotteryData = await contract.GetLatestLottery(type);
    lotteryDataFromBlockchain = JSON.parse(JSON.stringify(lotteryData, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));


  } catch (error) {
    console.error("Error fetching lottery data:", error);
  }



  try {
    lotteryDataFromDB = await lottery.findOne({ lotteryId: lotteryDataFromBlockchain[0] }).populate("purchases", "tax");

    // Using the function on your data
    lotteryNumbers = lotteryDataFromDB.purchases.flatMap((purchase) =>
      convertLotteryNumbers(purchase.tax)
    );
  } catch (err) {
    console.error(err);

  }
  const ticektSoldBlockchain = lotteryDataFromBlockchain[10];
  const ticektSoldB = lotteryDataFromDB.ticketSold;

  return  ({bc:ticektSoldBlockchain,db:lotteryNumbers});

  if (ticektSoldB != ticektSoldBlockchain.length) {
    return (ticektSoldBlockchain.length, ticektSoldB);
  } else {
    console.log(" lotteryData", ticektSoldBlockchain.length, ticektSoldB);
    return (ticektSoldBlockchain.length, ticektSoldB, lotteryNumbers);

  }


  // return (lotteryDataFromBlockchain,lotteryNumbers, lotteryDataFromDB );

}


module.exports = {

  // comppare the ticket sold to the database with blockchain
  // if not match then grap data from blockchain and push to database.
  getLottery: async (req, res) => {


    //  1. Find the latest Easy lottery from Blockchain
    const lotteryDAta = await upgradeLotteryTicketCount(0); // compare and upgrade Easy Lottery tickets

    res.status(200).json(lotteryDAta);
  },
};
