import React from "react";
import BuyModal from "./BuyModal"
import axios from "axios";
import { motion } from "framer-motion"
import {  secretKey } from "../contracts/const";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { appConfig } from "../config/appConfig";
export default function HomeComp() {
  const [selected, setSelected] = React.useState("photos");
  const [isOpen, onOpenChange] = React.useState(false);
  const [lottery, setLottery] = React.useState([]);
  const [selectedLottery, setSelectedLottery] = React.useState()
  React.useEffect(()=>{
    axios.get(`${appConfig.api}/get-Lotteries`, {
      headers: {
        'Content-Type': 'application/json',
        'x-origin-key' : secretKey
      }
     })
      .then((data)=>setLottery(data.data))
      .catch((err)=>console.warn(err.message))
  },[])
  // console.warn(lottery)
  const handleBuyModal = (lotteryData)=>{
    setSelectedLottery(lotteryData)
    onOpenChange(true)
  }
  return (
    <>
    <div className="flex flex-col justify-center items-center w-full h-[500px] text-center ">
    <motion.div
  initial={{ scale: 0.5 }}
  animate={{ rotate: 360, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 100
  }}
> <h1 className="text-7xl font-bold p-2 shadow-md">Lottaverse</h1></motion.div>
     
    </div>
    <div className="mx-auto max-w-full  p-2">
      <h1 className="text-lg text-white font-bold">Get Jackpot</h1>
      {/* {
        lottery.length > 0 ? 
           lottery.map((data, index)=>(
              <div className="mx-auto p-1 w-4/5 flex justify-between items-center border-2 border-black rounded-lg">
               <h3>{data.lotteryId}</h3>
               <button className="border-1 bg-slate-600 rounded-full px-2 py-1 text-white font-bold"  onClick={()=>handleBuyModal(data)}>Buy</button>
              </div>
           ))
         : <>

        </>
      } */}
     <table className="w-full mx-auto  p-2 ">
            <tr className="bg-slate-500  m-1 font-bold p-1">
                <td className="rounded-s-full p-1">Id</td>
                <td>Participate</td>
                <td>TotalSold</td>
                <td className="rounded-e-full p-1"></td>
                {/* <td className="rounded-e-full p-1">Total Rewards</td> */}
            </tr>
            {
              lottery.length > 0 ? 
              lottery.map((data, index)=>(
                <tr className="my-1">
                <td>
                   {`${data?.lotteryId?.slice(0,4)}...${data?.lotteryId?.slice(-4)}`}
                    
                </td>
                <td>{data.holders.length}</td>
                <td>{data.ticketSold ? data.ticketSold : 0}</td>
                {/* <td>{data.drawn ? `${data?.winners[0]?.slice(0,3)}...${data?.winners[0]?.slice(-3)}` : <button className="px-2 font-bold border-2 border-blue-500 hover:bg-blue-500 rounded-full" onClick={()=>handleBuyModal(data)}>Buy</button>}</td> */}
               </tr> 
              ))
              : 
           <tr>No Records</tr>
            }
           
      
    </table>
    </div>  
    <BuyModal isOpen={isOpen} onClose={onOpenChange} lottery={selectedLottery} />
    
    </>
  );
}
