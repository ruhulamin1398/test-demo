import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import axios from "axios";
import { RiListCheck } from "react-icons/ri";
import { Contract, BrowserProvider,  parseUnits } from "ethers";


import { blockChainConfig, owner, LInkAddress,  secretKey, pk } from "../contracts/const";
import { toast } from "react-toastify";
import Web3Token from "web3-token";
import { MdOutlineDashboard } from "react-icons/md";
import LotteryErrorModal from "./LotteryErrorModal";
import { appConfig } from "../config/appConfig";

export default function LotteryInfo({ isOpen, onClose, lottery }) {
  const [showBuyer, setShowBuyer] = useState(false);
  const [users, setUsers] = useState([]);
  const [leaderBuyer, setLeaderBuyer] = useState([]);
  const [showLeaderBuyer, setShowLeaderBuyer] = useState(true);
  const [linkbal, setLinkBal] = useState(0);
  const [nativeBal, setNativeBal] = useState(0);
  const [buyerReserve, setBuyerReserve] = useState(0);
  const [numberOfLeader, setNumberOfLeader] = useState(0);
  const [action, setAction] = useState(0);

  const [showErrorStepsModal, setShowErrorStepsModal] = useState(false);


  useEffect(() => {
    // Check 'lotteryStatus' in localStorage on page load
    if (localStorage.getItem('drawStatus') !== null) {
      setShowErrorStepsModal(true);
    }
  }, []);
  const handleRetry = () => {
   
    Draw();
    setShowErrorStepsModal(false); // Close the modal after retry
  };

  const getBuyerReserve = async () => {

  }



  const getLInkBalance = async () => {
    const provider = new BrowserProvider(window.ethereum); 
    const contract = new Contract(blockChainConfig.LInkAddress, blockChainConfig.erc20ABI, provider);
    const balance = await contract.balanceOf(blockChainConfig.contractAddress);
    setLinkBal(Number(balance) / (10 ** 18));
    setNativeBal(Number(await provider.getBalance(blockChainConfig.contractAddress)) / (10 ** 18));
    const lottaverseContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, provider);


    // =========================================================================== 
    // setBuyerReserve(Number(await lottaverseContract.whaleBuyerReserve(lottery?.lotteryId)));
    setBuyerReserve(600);
    // =====================================================================
  }

  const testDrawData = async (lotteryId) => {



    const inProvider = new JsonRpcProvider(
      "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
      {
        chainId: 80002, // Chain ID for Polygon Amoy testnet
        name: "polygon-amoy"
      }
    );
    const wallet = new Wallet(pk, inProvider);

    const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, wallet);

    const provider = new BrowserProvider(window.ethereum);

    const contract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, provider);

    try {
      const tx = await inContract.Draw(250, 2500000, { gasLimit: 6000000 });
      await tx.wait(15);
      const winnerListResponse = await contract.getchainLinkRandomWords();
      // console.log(winnerListResponse);
    } catch (error) {
      console.error("Error executing transaction:", error);
    }


  }
 



  const Draw = async () => {
    try {
      //toast.loading("please wait....")
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = await Web3Token.sign(async msg => await signer.signMessage(msg));


      //console.warn(lottery.lotteryId)
      try {

        // const signingContract = contract.connect(signer);
        // console.log(" hello                       ================================= ", lottery.lotteryId);
        // const drawTx = await contract.Draw(parseInt(lottery.lotteryId), { gasLimit: 30000000 });
        // await drawTx.wait(10);
        // const disTx = await contract.distributeWinningAmounts(parseInt(lottery.lotteryId), { gasLimit: 30000000 });
        // await disTx.wait(1);
        //  const disTx2 = await contract.distributeTopBuyersAmounts({ gasLimit: 30000000 });
        // await disTx2.wait(1);

        // setDrawStatus(0);
        const inProvider = new JsonRpcProvider(
          "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
          {
            chainId: 80002, // Chain ID for Polygon Amoy testnet
            name: "polygon-amoy"
          }
        );
        const wallet = new Wallet(pk, inProvider);

        const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, wallet);

        if (localStorage.getItem('drawStatus') == null) {
          toast.loading("Draw  running .....(1/4)");
          const drawTx = await inContract.Draw(parseInt(lottery.lotteryId), { gasLimit: 25000000, gasPrice: parseUnits("29", "gwei") });
          await drawTx.wait(10);
          localStorage.setItem('drawId', parseInt(lottery.lotteryId));
          localStorage.setItem('drawStatus', 1);
          if(localStorage.getItem("drawId") == parseInt(lottery.lotteryId) && localStorage.getItem("drawStatus") ==1 )
         {
           toast.dismiss();
         
        } 
        else{
          toast.dismiss();
          toast.error("Some thing went wrong ");
        }
          
        }

        if (localStorage.getItem('drawStatus') == 1) {

          toast.loading("Draw  running .....(2/4)");
          const tx = await inContract.PerformDraw({ gasLimit: 25000000, gasPrice: parseUnits("27", "gwei") });
          await tx.wait(15);
          localStorage.setItem('drawStatus', 2);
          

          if( localStorage.getItem("drawStatus") ==2 )
            {
              toast.dismiss();
            
           } 
           else{
             toast.dismiss();
             toast.error("Some thing went wrong ");
           }

        } 

        if (localStorage.getItem('drawStatus') == 2) {
          toast.loading("Draw  running .....(3/4)");

          const disTx2 = await inContract.distributeTopBuyersAmounts({ gasLimit: 25000000, gasPrice: parseUnits("29", "gwei") });
          await disTx2.wait(1);
          localStorage.setItem('drawStatus', 3);
          if( localStorage.getItem("drawStatus") ==3 )
            {
              toast.dismiss();
              
           } 
           else{
             toast.dismiss();
             toast.error("Some thing went wrong ");
           }
        }


        if (localStorage.getItem('drawStatus') == 3) {
          toast.loading("Draw  running .....(4/4)");

          let lotteryIdfromStorage = localStorage.getItem('drawId');

          const winnerListResponse = await contract.getWinnersList(parseInt(lotteryIdfromStorage));

          console.log("winnerListResponse", winnerListResponse ); 
          console.log("Winners From BC ", winnerListResponse[0] ); 
     
      
          let winners = [];

          // for(let i =0 ; i<winnerListResponse[0][12].length; i++){
          // console.log("winnerListResponse[0][12][i]", winnerListResponse[0][12][i]);
          // console.log("winnerListResponse[0][10]["+winnerListResponse[0][12][i]+"]", winnerListResponse[0][10][winnerListResponse[0][12][i]]);
          // console.log("winnerListResponse[0][11][i]", winnerListResponse[0][11][i]);
          //      winners.push({
          //       winner:  winnerListResponse[0][10][i][0],
          //       prize: Number(winnerListResponse[0][11][winnerListResponse[0][12][i]]),
          //       ticket: winnerListResponse[0][10][i][2],
          //     })
          // }

          for (let i = 0; i < winnerListResponse[0].length; i++) {
            // console.log("1 0 0", winnerListResponse[1][i][0]);
           
              winners.push({
                winner: winnerListResponse[0][i][2],
                prize: Number(winnerListResponse[0][i][3]),
                ticket: winnerListResponse[0][i][1],
              })
            }

         
          // console.log("winners", winners);


          /// sening to database
          if (winnerListResponse && winnerListResponse.length > 0) {


            const dbRequestData = {
              lottery_id: Number(winnerListResponse[1] ),
              round: Number(winnerListResponse[2]),
              lottery_type: Number(winnerListResponse[3]),
              is_draw: (winnerListResponse[0].length > 1) ? true : false,
              result: winners
            }

            console.log(" Request send to database ", dbRequestData)
            


            try {
              const response = await axios.post(
                `${appConfig.api}/update-lottery`,
                dbRequestData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    'x-origin-key': secretKey
                  }
                }

              );
              localStorage.removeItem('drawStatus');
              localStorage.removeItem('drawId');
              toast.dismiss();
              toast.success("Draw  completed successfully");

              // Handle the response as needed
              // console.log("Lottery updated successfully:", response.data);
            } catch (error) {
              toast.dismiss();
              toast.error('something went wring', '10s')
            }


          }

        }

 
      } catch (err) {
        console.warn(err)
      }






    } catch (err) {
      console.warn(err);
      toast.dismiss();
      toast.error('something went wring', '10s')
    }



  }



  //  const help = async()=>{
  //   console.warn(AbiCoder.defaultAbiCoder().decode(['address', 'bytes32', 'bytes32[]'], '0x000000000000000000000000fa98078ed9d2378212b677cc99c72469540d955ba5d1738239b6f8d6c8cfe0db2220361aea4bee38903c4db4d04f4a8eda788f93000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000068d6e5df639f9fed5dae1b0ff752f98e7aeab5f2764a9022ee3c5eeb4c7d3c5dfa2555cd3a71c40fa90b942de230f24135a361a4a01e743b2a1dfefa7574bdfed8d6e5df639f9fed5dae1b0ff752f98e7aeab5f2764a9022ee3c5eeb4c7d3c5df8d6e5df639f9fed5dae1b0ff752f98e7aeab5f2764a9022ee3c5eeb4c7d3c5dfa2555cd3a71c40fa90b942de230f24135a361a4a01e743b2a1dfefa7574bdfed8d6e5df639f9fed5dae1b0ff752f98e7aeab5f2764a9022ee3c5eeb4c7d3c5df'))
  //  }

  const distributeBuyerr = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    if (signer.address.toLowerCase() == blockChainConfig.owner.toLocaleLowerCase()) {
      toast.loading("Leader board distribute waiting...");
      const contract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, signer);
      const leaderBoards = [];
      const leaderMaoneys = []
      const distributeMoney = Math.floor(buyerReserve / numberOfLeader)
      for (let i = 0; i < numberOfLeader; i++) {
        leaderBoards.push(leaderBuyer[i][0]);
        leaderMaoneys.push(distributeMoney)
      }
      console.warn(leaderBoards, leaderMaoneys, leaderBuyer)
      const tx = await contract.RewardDistributor(leaderBoards, leaderMaoneys, lottery.lotteryId, true);
      const Tx = await tx.wait(10);
      // ===========================================================================
      // setBuyerReserve(Number(await contract.whaleBuyerReserve(lottery.lotteryId)))
      setBuyerReserve(600)
      // =====================================================================

      toast.dismiss();
      toast.success("leader board distributed successfully");
    } else {
      toast.dismiss();
      toast.success("Only owner can distribute Leader board");
      return;
    }
  };
  useEffect(() => {
    // axios.get(`http://localhost:5000/lotteryBuyer?lotteryId=${lottery._id}`)
    //     .then((data)=>setUsers(data.data))
    //     .catch((err)=>console.warn(err.message))
    setUsers(lottery?.holders);
    const getLeaderBuyer = () => {
      const keys = Object.keys(lottery?.holdersBuy);
      const values = Object.values(lottery?.holdersBuy);
      const keyValuePairs = keys.map((key, index) => [key, values[index]]);
      //console.warn(keyValuePairs); // [["a", 1], ["b", 2], ["c", 3]]
      setLeaderBuyer(keyValuePairs)
    };
    //getLInkBalance()
    if (lottery?.holdersBuy) {
      getLInkBalance()
      getLeaderBuyer();
    }

  }, [lottery]);

  //console.warn(lottery.holdersBuy["0xe938f2776dc76f3cd70e17c62f5cd0bb3dad9f23"])
  return (
    <>
    <Modal
      isOpen={isOpen}
      size="lg"
      onClose={() => onClose(false)}
      backdrop="blur"
      className="border-2 border-blue-500 rounded-xl bg-white"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-extrabold text-blue-500">
              Create Lottery
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex justify-end gap-2">
                {/* <button className>LeaderBuyer</button> */}
                <RiListCheck size={25} onClick={() => setAction(1)} />
                <MdOutlineDashboard size={25} onClick={() => setAction(0)} />
              </div>
              {
                action == 0 && <div className="w-full">
                  <div className="w-full gap-0.5 grid grid-cols-12 grid-rows-2 px-8">
                    <div className=" col-span-4 row-span-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md text-center flex flex-col justify-center items-center p-1">
                      <CircularProgress
                        classNames={{
                          svg: "w-20 h-20 drop-shadow-md",
                          indicator: "stroke-pink-300",
                          track: "stroke-gray-100",
                          value: "text-lg font-semibold text-white",
                        }}
                        size="sm"
                        value={lottery.ticketSold ? (lottery.ticketSold * 100) / lottery.maxTicket : 0}
                        strokeWidth={4}
                        showValueLabel={true}
                      />
                      <p className="text-xl font-bold text-white/80">{lottery.ticketSold}</p>
                      <p className="font-extrabold text-white space-x-1">
                        Ticketsold
                      </p>
                    </div>
                    <div className=" col-span-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md flex flex-col justify-center items-center p-1">
                      <h2 className="text-lg font-bold text-white">{lottery.holders.length}</h2>
                      <p className="font-extrabold text-white/70">Holders</p>
                    </div>
                    <div className=" col-span-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-md flex flex-col justify-center items-center p-1">
                      <h2 className="text-lg font-bold text-white">
                        {lottery.totalPrize / 1000000} <span className="text-xs">USDc</span>
                      </h2>
                      <p className="font-extrabold text-white/70">Prizes</p>
                    </div>
                    <div className=" col-span-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md flex flex-col justify-center items-center p-1">
                      <h2 className="text-lg font-bold text-white">
                        {lottery.treasuryTax / 1000000} <span className="text-xs">USDc</span>
                      </h2>
                      <p className="font-extrabold text-white/70">
                        Tax Collected
                      </p>
                    </div>
                    <div className=" col-span-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md flex flex-col justify-center items-center p-1">
                      <h2 className="text-lg font-bold text-white">
                        5000 <span className="text-xs">USDc</span>
                      </h2>
                      <p className="font-extrabold text-white/70">
                        Sell Collected
                      </p>
                    </div>
                  </div>
                </div>
              }
              {
                action === 1 && <div>
                  <table className="sortable w-full mx-auto  p-2 ">
                    <tr className="bg-slate-500  m-1 font-bold p-1">
                      <td className="rounded-s-full p-1 text-center">User</td>
                      {/* <td>Participate</td> */}
                      <td className="rounded-e-full p-1 text-center">Total Cost</td>
                      {/* <td className="rounded-e-full p-1">Total Rewards</td> */}
                    </tr>
                    {!showLeaderBuyer ? users.length > 0 ? (
                      users.map((data, index) => (
                        <tr className="">
                          <td className="p-2 ">
                            <div className="flex items-center justify-center gap-2">
                              <Jazzicon
                                seed={jsNumberForAddress(data.address)}
                                diameter={30}
                              />
                              <div>{`${data?.address.slice(
                                0,
                                2
                              )}..${data?.address.slice(-4)}`}</div>
                            </div>
                          </td>
                          <td className="order-last">
                            {lottery.holdersBuy[data.address.toLowerCase()]}
                          </td>
                          <td>{data.totalBuy}</td>
                          {/* <td>1</td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>No Records</tr>
                    ) : leaderBuyer.length > 0 ? (
                      leaderBuyer.map((data, index) => (
                        <tr className="">
                          <td className="p-2 ">
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
                          {/* <td className="order-last">
                          {lottery.holdersBuy[data.address.toLowerCase()]}
                        </td> */}
                          <td className="text-center">{data[1]}</td>
                          {/* <td>1</td> */}
                        </tr>
                      ))
                    ) : (
                      <tr>No Records</tr>
                    )}
                  </table>
                </div>
              }
              {
                action === 3 && lottery.winners.length > 0 && <div>
                  <table className="sortable w-full mx-auto  p-2 ">
                    <tr className="bg-slate-500  m-1 font-bold p-1">
                      <td className="rounded-s-full p-1 text-center">User</td>
                      {/* <td>Participate</td> */}
                      {/* <td className="rounded-e-full p-1 text-center">Total Cost</td> */}
                      {/* <td className="rounded-e-full p-1">Total Rewards</td> */}
                    </tr>
                    {
                      lottery.winners.map((data, index) => (
                        <tr className="">
                          <td className="p-2 ">
                            <div className="flex items-center justify-center gap-2">
                              <Jazzicon
                                seed={jsNumberForAddress(data)}
                                diameter={30}
                              />
                              <div>{`${data?.slice(
                                0,
                                2
                              )}..${data?.slice(-4)}`}</div>
                            </div>
                          </td>
                          {/* <td className="order-last">
                      {lottery.holdersBuy[data.address.toLowerCase()]}
                    </td> */}
                          {/* <td className="text-center">{data[1]}</td> */}
                          {/* <td>1</td> */}
                        </tr>
                      ))
                    }
                  </table>
                </div>
              }
            </ModalBody>
            <ModalFooter className="items-between justify-center">

              {
                action === 1 && <div className="w-1/2 flex justify-start items-center gap-2">{buyerReserve / 1000000} usdc</div>
              }
              {/* {!showBuyer && 
              <div className="w-1/2 flex justify-start items-center gap-2">
              <div>{linkbal} link</div>
              <div>{nativeBal} Avax</div>
              </div>
              } */}

              <div className="w-1/2 flex justify-end items-center">
                {
                  action === 1 &&

                  <div className="flex items-center gap-1">
                    <input className="bg-transparent outline-none border-2 border-blue-500 rounded-full px-2" onChange={(e) => setNumberOfLeader(e.target.value)} placeholder="Number of whale buyer" />
                    <button className="text-lg font-bold px-2 py-0.5 border-2 border-blue-300 hover:bg-blue-500 hover:text-white text-blue-300 rounded-full" disabled={numberOfLeader === 0} onClick={distributeBuyerr}>
                      Distribute
                    </button>
                  </div>
                }
                {showBuyer === false &&
                  <>
                    {action == 0 && lottery.drawn && <button className="text-lg font-bold px-2 py-0.5 border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-full" onClick={() => setAction(3)}>
                      See winners
                    </button>
                    }
                    {action == 0 && !lottery.drawn && <button className="text-lg font-bold px-2 py-0.5 border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-full" onClick={Draw}>
                      Draw
                    </button>
                    }
                  </>
                }
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

    {showErrorStepsModal && (
        <LotteryErrorModal 
          onRetry={handleRetry} 
          onClose={() => setShowErrorStepsModal(false)}
          text={"There was an issue in previous Draw. Please try again"}
        />
      )}
    </>
  );
}
