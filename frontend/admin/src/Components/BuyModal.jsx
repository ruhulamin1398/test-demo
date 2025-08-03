import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { RiDeleteBin4Fill } from "react-icons/ri";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import { BrowserProvider, parseUnits } from "ethers";
import Web3Token from 'web3-token';
import { solidityPackedKeccak256, Contract, AbiCoder } from "ethers";

import {  secretKey, blockChainConfig } from "../contracts/const";

import { toast } from "react-toastify";
import { appConfig } from "../config/appConfig";
export default function App({ isOpen, onClose, lottery }) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [isRandom, setRandom] = useState(false);
  const [tickets, setTickets] = useState([])
  const [bytesTickets, setBytesticket] = useState([])
  const [totalTickets, setTotalTickets] = useState([])
  const [referral, setReferral] = useState('')

  const handleTicket = () => {
    const ticketsNumber = [];
    const isUnique = new Map();
    for (let i = 0; i < 6; i++) {
      let Randoms;
      do {
        Randoms = Math.floor((Math.random() * (99)) + 1);
      } while (isUnique.get(Randoms) !== undefined);
      ticketsNumber.push(Randoms);
    }
    const ticketBytes = solidityPackedKeccak256(["uint", "uint", "uint", "uint", "uint", "uint"], ticketsNumber);
    setBytesticket((prev) => [...prev, ticketBytes]);
    console.warn(ticketBytes)
    setTotalTickets((prev) => [...prev, ticketsNumber]);
  }

  const deleteTickets = (index) => {
    setTotalTickets(
      [
        ...totalTickets?.slice(0, index),
        ...totalTickets?.slice(index + 1)
      ]
    )

    setBytesticket(
      [
        ...bytesTickets?.slice(0, index),
        ...bytesTickets?.slice(index + 1)
      ]
    )
  }

  const Buy = async () => {
    try {
      if (referral.length === 0) {
        toast.error("Input a referral number")
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = await Web3Token.sign(async msg => await signer.signMessage(msg));
      toast.loading("Buying tickets plz wait!")
      // const lottaverse = new Contract(contractAddress, lottaverseAbi, signer);
      const lottaverse = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, signer);
      //console.warn(lottaverse)
      // const tether = new Contract(USDTaddress, ERC20ABI, signer);
      const tether = new Contract(blockChainConfig.USDTaddress, blockChainConfig.erc20ABI, signer);

      const balance = await tether.balanceOf(account);

      const Price = (lottery.price * 1000000) * bytesTickets.length
      console.warn(lottery.lotteryId,
        signer.address,
        bytesTickets,
        signer.address)
      if (Number(balance) >= Price && lottery.ticketSold ? lottery.ticketSold < lottery.maxTicket : true) {
        try {
          toast.update("approving USDt")
          const allowtx = await tether.approve(blockChainConfig.contractAddress, Price);
          const allowConfirm = await allowtx.wait(1);
          toast.dismiss();
          toast.success("Succesfully approved usdt", "10s")
          toast.loading("buying tickets");
          console.warn(allowConfirm)
          //const signingLottaverse = lottaverse.connect(signer);

          // const Tx = await lottaverse.buyTickets(
          //   lottery.lotteryId,
          //   signer.address,
          //   [...bytesTickets],
          //   referral,
          //   false
          // )

          // console.log(" tcccccccccccccccccccccxxxxxxxxxxx ");
          const Tx = await lottaverse.purchaseTicket(
            parseInt(lottery.lotteryId),
           bytesTickets.length, referral
          )
          // console.log(" hello ", parseInt(lottery.lotteryId));
          // console.log(" hello ", parseInt(lottery.lotteryId));
          const tx = await Tx.wait();
          // console.log(" tcccccccccccccccccccccxxxxxxxxxxx ", tx)

          console.warn(tx, Tx)
          await axios.post(`${appConfig.api}/purchase`, {
            _id: lottery._id,
            buyer: account,
            amount: totalTickets.length,
            referral: referral,
            price: lottery.price,
            lotteryType: lottery.lotteryType,
            tax: [Number(AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'uint256', "uint256"], tx.logs[2].data)[0]),
            Number(AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'uint256', "uint256"], tx.logs[2].data)[1]),
            Number(AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'uint256', "uint256"], tx.logs[2].data)[2]),
            Number(AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'uint256', "uint256"], tx.logs[2].data)[3]),
            Number(AbiCoder.defaultAbiCoder().decode(['uint256', 'uint256', 'uint256', 'uint256', "uint256"], tx.logs[2].data)[4])]
          },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'x-origin-key': secretKey
              }
            }

          )
          setTotalTickets([])
          setBytesticket([])
          setReferral('')
          toast.dismiss();
          toast.success("Successfully  bought ticket", "10s")
        } catch (err) {
          console.warn(err);
          toast.dismiss();
          toast.error("Something Went wrong", "10s")
          return;
        }
      } else {
        toast.dismiss();
        if (Number(balance) < Price)
          toast.error("Insufficient balance", "10s");
        else toast.error("Max ticket sold out", "10s");
        return;
      }

    } catch (err) {
      console.warn(err)
    }
  }




  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)} backdrop="blur" className="border-2 border-blue-500 rounded-lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold ">Lottery Buy</ModalHeader>
              <ModalBody>
                <div className="w-3/5 mx-auto flex p-0.5 justify-center border-2 border-black rounded-md">
                  <button className={`w-1/2   ${isRandom ? "border-2  rounded-lg bg-blue-600 text-white" : ""} font-bold`} onClick={() => setRandom(!isRandom)}>Random</button>
                  <button className={`w-1/2  ${!isRandom ? "border-2  rounded-lg bg-blue-600 text-white" : ""} font-bold`} onClick={() => setRandom(!isRandom)}>Manual</button>
                </div>
                <div className="">
                  {
                    isRandom ?
                      <>
                        <button className=" mx-auto flex p-2 justify-center border-2 border-black rounded-md" onClick={handleTicket}>
                          Add Tickets
                        </button>
                        <div className="mt-2 h-[90px] overflow-y-auto">
                          {
                            totalTickets.length > 0 &&
                            totalTickets.map((data, index) => (
                              <div className="flex justify-between items-center border-none p-1 rounded-lg my-1 bg-gradient-to-br from-violet-500 to-fuchsia-500" key={index}>
                                <ul className="flex gap-1 ">
                                  {data.map((number, index) => (
                                    <li className="border-2 border-blue-500 rounded-lg w-[30px] h-[30px] text-center" key={index}>
                                      {number}
                                    </li>
                                  ))}
                                </ul>
                                <div>
                                  <RiDeleteBin4Fill size={20} color="red" onClick={() => deleteTickets(index)} />
                                </div>
                              </div>
                            ))
                          }
                        </div>
                        <input className="border-2 rounded-full w-full outline-none bg-transparent px-2" onChange={(e) => setReferral(e.target.value)} />
                      </> : <>
                      </>

                  }
                </div>
              </ModalBody>
              <ModalFooter className="items-center">
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Add more ticket
                </Button> */}
                {totalTickets.length > 0 &&
                  <>
                    <div>{totalTickets.length} tickets</div>
                    <Button color="primary" className="bg-sky-500 rounded-full" onPress={Buy}>
                      Buy
                    </Button>
                  </>
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
