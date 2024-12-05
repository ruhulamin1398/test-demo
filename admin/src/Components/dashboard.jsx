/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { RiAddLine, RiAddCircleLine } from "react-icons/ri";
import { CircularProgress } from "@nextui-org/react";
import CreateLotteryModal from "./LotteryCreateModal";
import axios from "axios";
import LotteryInfoModal from "./LotteryInfoModal"
import { useMetaMask } from "metamask-react";
import {owner} from "../contracts/const"
import Error from "./error"
import {   blockChainConfig, secretKey } from "../contracts/const";
import { appConfig } from "../config/appConfig";
export default function dashboard() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
  const [isOpen, onOpenChange] = React.useState(false);
  const [lottery, setLottery] = React.useState([]);
  const [selectLottery, setSelectLottery] = React.useState();
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${appConfig.api}/get-Lotteries`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-origin-key' : secretKey
          }
        }
      )
      .then((data) => setLottery(data.data))
      .catch((err) => console.warn(err.message));
  }, []);
  console.warn(lottery);

  const showLottery = async(data)=>{
     setSelectLottery(data);
    setShowInfo(true)
  }

  return (
    <>
    {status === 'connected' && account.toLowerCase() === blockChainConfig.owner.toLowerCase() ?
    <div className="w-full md:w-4/6 mx-auto">
      <div className="w-full mt-2 flex justify-between items-center p-2">
        <h1 className="text-2xl font-extrabold">DashBoard</h1>
        <RiAddCircleLine size={30} onClick={() => onOpenChange(true)} />
      </div>

      <h1 className="my-1">Current Lottery</h1>
      {lottery.length > 0 ? (
        lottery.map((data, index) => (
          <div className="flex flex-col items-start my-2  border-2 border-gray-200 rounded-lg p-2 cursor-pointer" onClick={()=>showLottery(data)}>
            <div className="w-full my-1 flex justify-between">
              <h2 className="font-extrabold">ID: {`${data?.lotteryId?.slice(0,5)}...${data?.lotteryId?.slice(-2)}`}</h2>
              <button className="px-2 font-bold border-2 border-gray-800 rounded-full hover:bg-gray-500 hover:text-white" >
                See more
              </button>
            </div>

            <div className=" w-full flex justify-between p-2 border-2 border-gray-200 rounded-full">
              <div className="w-1/3 border-e-2 border-gray-200 flex flex-col items-center">
                <CircularProgress
                  classNames={{
                    svg: "w-20 h-20 drop-shadow-md",
                    indicator: "stroke-blue-500",
                    track: "stroke-gray-100",
                    value: "text-lg font-semibold text-gray-500",
                  }}
                  size="sm"
                  value={data.ticketSold ? (data.ticketSold*100)/data.maxTicket : 0}
                  strokeWidth={4}
                  showValueLabel={true}
                />

                <p className="font-bold text-sm">Ticket sold</p>
              </div>
              <div className="w-1/3 border-e-2 border-gray-200 flex flex-col items-center p-2">
                <h4 className="text-7xl font-bold">{data.ticketSold === undefined ? 0 : data.holders.length}</h4>
                <p className="font-bold text-sm">perticipate</p>
              </div>
              <div className="w-1/3  flex flex-col justify-end items-center p-2">
              <div className="growflex gap-0.5 justify-center items-end">
                <h4 className="text-4xl md:text-5xl lg:text-7xl font-bold">
                  {data.totalPrize === undefined ? 0 : (data.totalPrize/1000000).toFixed(3)}
                </h4>
                <p className="text-xs">USDc</p>
              </div>
                <p className="font-bold text-sm">Prizes</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No lottery data</div>
      )}

      <CreateLotteryModal isOpen={isOpen} onClose={onOpenChange} />
      <LotteryInfoModal isOpen={showInfo} onClose={setShowInfo} lottery={selectLottery}/>
    </div> : <Error/>
}
    </>

  );
}
