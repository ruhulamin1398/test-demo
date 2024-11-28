import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { RiDeleteBin4Fill, RiCloseCircleLine } from "react-icons/ri";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import { BrowserProvider, JsonRpcProvider, Contract, Wallet, parseUnits } from "ethers";
import Web3Token from "web3-token";
import { 
  secretKey,
  blockChainConfig,
  pk
} from "../contracts/const";
import { ToastContainer, toast } from "react-toastify";
import LotteryProcessModal from "./LotteryProcessModal";
import LotteryErrorModal from "./LotteryErrorModal";
import { appConfig } from "../config/appConfig";
import {useProvider} from "../contracts/utils/useProvider"

export default function App({ isOpen, onClose }) {


  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const {infuraContract} = useProvider();
  const [LotteryName, setLotteryName] = useState("");
  const [ticketPrice, setTicketPrice] = useState(0);
  const [maxTicket, setMaxTicket] = useState(0);
  const [minTicket, setMinTicket] = useState(0);
  const [referral, setReferral] = useState([10, 5, 2, 2, 2, 1, 1]);
  const [treasuryTax, setTreasuryTax] = useState(0);
  const [premiumTax, setPremiumTax] = useState(0);
  const [LeaderTax, setLeaderTax] = useState(0);
  const [WhaleTax, setWhaleTax] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [persons, setPersons] = useState(0);
  const [prizeIndex, setPrizeIndex] = useState(1);
  const [prize, setPrize] = useState(0);


  const [lotteryCreationStatus, setLotteryCreationStatus] = useState(0);
  const [lotteryCreationStage, setLotteryCreationStage] = useState(0);

  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [showErrorStepsModal, setShowErrorStepsModal] = useState(false);

  useEffect(() => {
    // Check 'lotteryStatus' in localStorage on page load
    if (localStorage.getItem('lotteryStatus') !== null) {
      setShowErrorStepsModal(true);
    }
  }, []);

  const handleRetry = () => {
   
    createLottery();
    setShowErrorStepsModal(false); // Close the modal after retry
  };

  const openProcessModal = () => {
    setIsProcessModalOpen(true);
  };

  const closeProcessModal = () => {
    setIsProcessModalOpen(false);
  };

  const handleLotteryPrice = async (e) => {



    const provider = new BrowserProvider(window.ethereum);

    const contract = new Contract(blockChainConfig.contractAddress,
      blockChainConfig.lotteryABI,
      provider);

    try {
      const latestLottery = await contract.GetLatestLottery(parseInt(e));
      console.log("latest lottery is ", Number(latestLottery[0]));



    } catch (error) {
      console.error("No lottery found or error in fetching:", error);
    }

    // console.log(e);
    if (e === "0") {
      setTicketPrice(3.00);
      // setTicketPrice(0.0001);
    } else if (e === "1") {
      setTicketPrice(10.00);
      // setTicketPrice(0.0002);
    }
    // setTicketPrice(0);
  };

  const handleReferral = (index, value) => {
    setReferral([
      ...referral?.slice(0, index),
      value,
      ...referral?.slice(index + 1),
    ]);
  };
  const handleAddPrizes = () => {
    // console.log(prize, persons);
    setPrizes((prev) => [...prev, { amount: prize, person: persons }]);
    setPrizeIndex((prev) => prev + 1);


  };

  const deletePrize = (index) => {
    setPrizes([...prizes?.slice(0, index), ...prizes?.slice(index + 1)]);
    if (prizeIndex > 0) setPrizeIndex((prev) => prev - 1);
  };



  const createLottery = async () => {
    if (LotteryName === "" && localStorage.getItem('lotteryStatus') == null ) {
      toast.error("Select lottery type", "5s");
      return;
    }
    if (ticketPrice === 0 && localStorage.getItem('lotteryStatus') == null ) {
      toast.error("Set price for lottery", "5s");
      return;
    }
    if (maxTicket === 0 && localStorage.getItem('lotteryStatus') == null ) {
      toast.error("Set max number of ticket", "5s");
      return;
    }
    if (minTicket === 0 && localStorage.getItem('lotteryStatus') == null ) {
      toast.error("Set min number of ticket", "5s");
      return;
    }
    // if(referral.length !== 7){
    //   for(let i=0; i < 7; i++){
    //     if(referral[i] === 0) {alert(`set level ${i+1} referral tax`)};
    //   }
    //   return;
    // }else{
    //   alert(`set referral tax`);
    //   return;
    // }
    // if (treasuryTax === 0) {
    //   toast.error("set treasury tax", "5s");
    //   return;
    // }
    // if (premiumTax === 0) {
    //   toast.error("set premium tax", "5s");
    //   return;
    // }
    // if (LeaderTax === 0) {
    //   toast.error("set Leader tax", "5s");
    //   return;
    // }
    // if (WhaleTax === 0) {
    //   toast.error("set whale buy tax", "5s");
    //   return;
    // }
    if (prizes.length === 0 && localStorage.getItem('lotteryStatus') == null )  {
      toast.error("set Lottery prize", "5s");
      return;
    }
    toast.loading("please wait.....");





    try {

      onClose(false);



      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = await Web3Token.sign(
        async (msg) => await signer.signMessage(msg)
      );
      if (signer.address == blockChainConfig.owner) {


        const lottaverseContract = new Contract(
          blockChainConfig.contractAddress,
          blockChainConfig.lotteryABI,
          provider
        );







        try {

          const inProvider = new JsonRpcProvider(
            "https://polygon-amoy.infura.io/v3/276f8cf7af2341738b0fd12245ffd948",
            {
              chainId: 80002, // Chain ID for Polygon Amoy testnet
              name: "polygon-amoy"
            }
          );
          const wallet = new Wallet(pk, inProvider);

          const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, wallet);




          if (localStorage.getItem('lotteryStatus') == null) {
            toast.dismiss();
            toast.loading("Lottery creation  running .....(1/3)");

         


            // const signingContract = inContract.connect(signer);
            const tx = await inContract.createLottery(
              LotteryName,
              minTicket,
              maxTicket,
              prizes.map((prize) => prize.amount),
              prizes.map((prize) => prize.person),
              prizes.reduce((acc, prize) => acc + parseInt(prize.person, 10), 0),

              { gasLimit: 22000000, gasPrice: parseUnits("29", "gwei") }

            );


            // console.log(tx);
            const Tx = await tx.wait(10);
            console.warn(Tx, tx);
            if (Tx.status === 1) {
              localStorage.setItem('creationTax', 1)
              let requestData = {
                price: ticketPrice,
                topPrize: prizes[0].amount,
                maxTicket: maxTicket,
                generalPrize: prizes[prizes.length - 1].amount,
                prizeDistribution: prizes,
                tax:
                  5000000 +
                  (15 * 1000000) / 100 +
                  (10 * 1000000) / 100 +
                  (5 * 1000000) / 100 +
                  (5 * 1000000) / 100,
                lotteryType: LotteryName,
              };

              localStorage.setItem('requestedLottery', LotteryName);

              localStorage.setItem('requestData', JSON.stringify(requestData));
              if (localStorage.getItem('requestData') != null) {

                localStorage.setItem('lotteryStatus', 1);
              }


            toast.dismiss();
            }
            else{

              toast.dismiss();
            }
          }

          

          if (localStorage.getItem("creationTax") == 1) {
            // console.log("creationTax", localStorage.getItem("creationTax"));
            // console.log("lotteryStatus", localStorage.getItem('lotteryStatus'));

            if (localStorage.getItem('lotteryStatus') == 1) {
             
              toast.loading("Lottery creation  running .....(2/3)");
              let requestData = JSON.parse(localStorage.getItem('requestData') || '[]');
              if (requestData && typeof requestData === 'object' && !Array.isArray(requestData)) {
                // Push new data to requestData or modify it as needed
                const latestLottery2 = await inContract.GetLatestLottery(parseInt(localStorage.getItem('requestedLottery')));
                requestData.lotteryId = Number(latestLottery2[0]); // example: add a new property
                localStorage.setItem('requestData', JSON.stringify(requestData));
                localStorage.setItem('lotteryStatus', 2);
              } else {
                return;
              }

              toast.dismiss();

            }


            if (localStorage.getItem('lotteryStatus') == 2) {
              
              
              toast.loading("Lottery creation  running  sending to database .....(3/3)");

              let requestData = JSON.parse(localStorage.getItem('requestData') || '[]');
              if (requestData && typeof requestData === 'object' && !Array.isArray(requestData)) {


                try {
                  const response = await axios.post(
                    `${appConfig.api}/createLottery`,
                    requestData,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                        "x-origin-key": secretKey,
                      },
                    }
                  );
                
                  // Check if the response is successful (status code 2xx)
                  if (response.status >= 200 && response.status < 300) { 


                    localStorage.removeItem('lotteryStatus');
                    localStorage.removeItem('creationTax'); 
                    localStorage.removeItem('requestedLottery'); 
                    localStorage.removeItem('requestData'); 
                    
                    toast.dismiss();
                    toast.success("Successfully created Lottery");
                  } else {
                    return;
                  }
                } catch (error) {
                  toast.dismiss();
              toast.error("something went wrong");
                  console.error("Error creating lottery:", error);
                  // Handle the error as needed
                }

          
             
            }
            else{
               
              toast.error("something went wrong");
              return;
            }
          
          }
          }


        } catch (err) {
          console.warn(err); 
          toast.error("something went wrong");
          return;
        }
      } else { 
        toast.error("Only owner can create lottery");
      }
    } catch (err) {
      console.warn(err, "this");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="3xl"
        onClose={() => onClose(false)}
        backdrop="blur"
        className="border-2 border-blue-500 rounded-xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-extrabold text-blue-500">
                Create Lottery
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col gap-4 justify-center items-center">
                  <div className="w-5/6 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Lottery Name: </h4>
                    <select
                      onChange={(e) => {
                        setLotteryName(e.target.value);
                        handleLotteryPrice(e.target.value);
                      }}
                      value={LotteryName}
                      className="w-full p-[3px] rounded-full bg-transparent border-2 px-2"
                    >
                      <option disabled value="">
                        Select
                      </option>
                      <option value="0">Easy Jackpot</option>
                      <option value="1">Super Jackpot</option>
                    </select>
                  </div>
                  <div className="w-5/6  flex justify-between items-center gap-2">
                    <h4 className="font-bold">Ticket Price: </h4>
                    <input
                      className="grow border-2 border-gray-200 rounded-full px-2"
                      placeholder={"3.00"}
                      value={ticketPrice}
                      readOnly
                      type="number"
                    />
                  </div>
                  <div className="w-5/6 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Min Tickets: </h4>
                    <input
                      className=" grow border-2 border-gray-200 rounded-full px-2"
                      placeholder={"10000"}
                      onChange={(e) => setMinTicket(e.target.value)}
                      type="number"
                    />
                  </div>
                  <div className="w-5/6 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input
                      className=" grow border-2 border-gray-200 rounded-full px-2"
                      placeholder={"30000"}
                      onChange={(e) => setMaxTicket(e.target.value)}
                      type="number"
                    />
                  </div>
                  {/* <div className="w-5/6 flex justify-between items-center gap-2 ">
                    <h4 className="w-2/7 font-bold">Referral Tax: </h4>
                    <div className="w-4/7 flex flex-col gap-2">
                      <input
                        className="w-full border-2 border-gray-200 rounded-full px-2"
                        placeholder="1st"

                        value={referral[0]}
                        onChange={(e) => handleReferral(0, e.target.value)}
                        type="number"
                      />
                      <div className="w-full flex gap-1">
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="2nd"
                          value={referral[1]}
                          onChange={(e) => handleReferral(1, e.target.value)}
                          type="number"
                        />
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="3rd"

                          value={referral[2]}
                          onChange={(e) => handleReferral(2, e.target.value)}
                          type="number"
                        />
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="4th"

                          value={referral[3]}
                          onChange={(e) => handleReferral(3, e.target.value)}
                          type="number"
                        />
                      </div>
                      <div className="w-full flex gap-1">
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="5th"

                          value={referral[4]}
                          onChange={(e) => handleReferral(4, e.target.value)}
                          type="number"
                        />
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="6th"

                          value={referral[5]}
                          onChange={(e) => handleReferral(5, e.target.value)}
                          type="number"
                        />
                        <input
                          className="w-1/3 border-2 border-gray-200 rounded-full px-2"
                          placeholder="7th"

                          value={referral[6]}
                          onChange={(e) => handleReferral(6, e.target.value)}
                          type="number"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="w-5/6 my-2 flex justify-between items-center gap-2">
                    <div className="relative w-1/2 border-2 border-gray-200 rounded-full p-1 ">
                      <h4 className="absolute -top-4 start-3 bg-white px-1 font-bold">
                        Owner Tax
                      </h4>
                      <input
                        className="w-full border-none outline-none px-2"
                        value={15}
                        onChange={(e) => setTreasuryTax(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div className="relative w-1/2 border-2 border-gray-200 rounded-full p-1 ">
                      <h4 className="absolute -top-4 start-3 bg-white px-1 font-bold">
                        Premium Tax
                      </h4>
                      <input
                        className="w-full border-none outline-none px-2"
                        value={10}
                        onChange={(e) => setPremiumTax(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div> */}
                  {/* <div className="w-5/6  flex justify-between items-center gap-2">
                    <div className="relative w-1/2 border-2 border-gray-200 rounded-full p-1 ">
                      <h4 className="absolute -top-4 start-3 bg-white px-1 font-bold">
                        Top Leader Tax
                      </h4>
                      <input
                        className="w-full border-none outline-none px-2"
                        value={5}
                        onChange={(e) => setLeaderTax(e.target.value)}
                        type="number"
                      />
                    </div>
                    <div className="relative w-1/2 border-2 border-gray-200 rounded-full p-1 ">
                      <h4 className="absolute -top-4 start-3 bg-white px-1 font-bold">
                        Top Buyer Tax
                      </h4>
                      <input
                        className="w-full border-none outline-none px-2"
                        value={5}
                        onChange={(e) => setWhaleTax(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div> */}
                  <div className="w-5/6 relative border-2 border-gray-200 rounded-lg">
                    <h4 className="absolute -top-4 start-3 bg-white px-1 font-bold">
                      Prizes Money
                    </h4>
                    <div className="mx-auto flex flex-col items-center h-20  overflow-auto">
                      {prizes.length > 0 ? (
                        prizes.map((data, index) => (
                          <div
                            className="w-2/4 flex justify-between items-center gap-4 mx-auto"
                            key={index}
                          >
                            <h4 className="text-lg font-medium">
                              {index == 0
                                ? "1st"
                                : index == 1
                                  ? "2nd"
                                  : index == 2
                                    ? "3rd"
                                    : `${index + 1}th`}
                              . {data.amount} USDT {data.person} persons
                            </h4>
                            <RiCloseCircleLine
                              onClick={() => deletePrize(index)}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="w-2/4 flex justify-between items-center gap-4 mx-auto">
                          <h3>No Prize selected</h3>
                        </div>
                      )}
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 px-4 py-1 border-t-2 border-gray-100">
                      <div>
                        {prizeIndex === 1
                          ? "1st"
                          : prizeIndex === 2
                            ? "2nd"
                            : prizeIndex === 3
                              ? "3rd"
                              : `${prizeIndex}th`}
                      </div>
                      <input
                        className="w-2/6 border-2 border-gray-100 rounded-full px-4"
                        placeholder={"$1000"}
                        onChange={(e) => setPrize(e.target.value)}
                      />
                      <input
                        className="w-2/6 border-2 border-gray-100 rounded-full px-4"
                        placeholder={"person"}
                        onChange={(e) => setPersons(e.target.value)}
                      />
                      <div className="flex gap-2 w-2/4">
                        <button
                          className="w-1/2 border-2 border-yellow-500 px-2 rounded-full hover:bg-yellow-500 font-bold"
                          onClick={handleAddPrizes}
                        >
                          Add
                        </button>
                        <button
                          className="w-1/2 border-2 border-red-500 px-2 rounded-full hover:text-white hover:bg-red-500 font-bold"
                          onClick={() => {
                            setPrizes([]);
                            setPrizeIndex(1);
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-3/4 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input className="border-2 border-gray-200 rounded-full p-1" placeholder={"Enter Your Lottery Name"}/>
                 </div>
                 <div className="w-3/4 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input className="border-2 border-gray-200 rounded-full p-1" placeholder={"Enter Your Lottery Name"}/>
                 </div>
                 <div className="w-3/4 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input className="border-2 border-gray-200 rounded-full p-1" placeholder={"Enter Your Lottery Name"}/>
                 </div>
                 <div className="w-3/4 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input className="border-2 border-gray-200 rounded-full p-1" placeholder={"Enter Your Lottery Name"}/>
                 </div>
                 <div className="w-3/4 flex justify-between items-center gap-2">
                    <h4 className="font-bold">Max Tickets: </h4>
                    <input className="border-2 border-gray-200 rounded-full p-1" placeholder={"Enter Your Lottery Name"}/>
                 </div> */}
                </div>
              </ModalBody>
              <ModalFooter className="items-end">
                <button
                  className="text-lg font-bold px-2 py-0.5 border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-full"
                  onClick={createLottery}
                >
                  Create
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



      {showErrorStepsModal && (
        <LotteryErrorModal 
          onRetry={handleRetry} 
          onClose={() => setShowErrorStepsModal(false)}
          text={"There was an issue creating the previous lottery. Please try again"}
        />
      )}
    </>
  );
}
