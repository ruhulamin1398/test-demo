'use client'
import {useEffect, useState} from 'react';
import { contractAddress, owner , fujiProviderUrl, blockChainConfig} from "../contracts/const";
import lottaverseABI from "../contracts/Lottaverse.json";
import {Contract, BrowserProvider, JsonRpcApiProvider, JsonRpcProvider} from "ethers";

export default function Referral(){
  const [referrals, setReferrals] = useState([])
  const [referralsAddresses, setReferralsAddresses] = useState([])
  const [referrecesAmountList, setReferrecesAmountList] = useState([])
  const [referralsTotal, setReferralsTotal] = useState([])
    const [add, setAdd] = useState('')

    const getReferral = async()=>{
        const provider = new JsonRpcProvider(fujiProviderUrl);
        const contract = new Contract(contractAddress, lottaverseABI, provider);
        const _referrals = [];
        var query = add;
        for(let i = 0; i < 7; i++){
            const _ref = await contract.referral(query);
            console.warn(_ref)
            if(_ref !== '0x0000000000000000000000000000000000000000'){
                _referrals.push(_ref);
                query = _ref
            }else{
                break;
            }
        }
        setReferrals(_referrals);
    }

    const getRef = async() =>{

      const provider = new BrowserProvider(window.ethereum);
      const contract= new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, provider);
      const [totalPurchasedTicket, referralAmountTotal ,raferralAmountList, refereesData] = await contract.getLotteryReferralAmountByUser(add);
      setReferralsTotal((Number(referralAmountTotal)/blockChainConfig.decimals).toFixed(4));
      setReferrecesAmountList(raferralAmountList);
      setReferralsAddresses(refereesData);


      console.log("referralAmountTotal _____ ", (Number(referralAmountTotal)/blockChainConfig.decimals)) ; 
      console.log("raferralAmountList _____ ", raferralAmountList) ;
      console.log("referralsAddresses _____ ", refereesData) ;

      // 0xBa926bE5738D978e6e1006f6bB66570FC4123064
      // 0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59




      const user  = await contract.users('0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59');
      console.log(" 0x3ff88B69d1762AA444c85c30C4B0B795f9c48B59 ", user);

      const user2  = await contract.users('0xBa926bE5738D978e6e1006f6bB66570FC4123064');
      console.log(" 0xBa926bE5738D978e6e1006f6bB66570FC4123064 ", user);



    }

    return (
      <div className="w-full   mx-auto">
        <div className="w-[90%]  mx-auto mt-2 rounded-md flex  justify-between p-4 bg-gradient-to-br from-black to-gray-300">
          <div className="grow flex  justify-start">
            <div className="flex flex-col">
              <h1 className=" font-bold text-3xl text-white">Refferal</h1>
              <br />
            
            </div>
          </div>

          <div className="w-1/7 flex flex-col items-end  gap-2">
            <h2 className="font-bold text-lg">Bangladesh</h2>
            <div className="flex gap-2 justify-end items-end">
              <h1 className="font-bold text-3xl">
              {referralsTotal?referralsTotal:0}
              </h1>
              <p className="text-xs font-semibold">USDc</p>
            </div>
            <div className=" flex rounded-full border-2  border-blue-500 ">
             
             
            </div>
          </div>
            </div>
            
            {/* don't touch */}
        <div className="w-[80%] flex justify-end gap-4 p-4">
          <input
            onChange={(e) => setAdd(e.target.value)}
            type="text" 
            className="border-2 border-blue-500 rounded-full outline-none bg-transparent px-2 w-80"
          />
          <button className="" onClick={getRef}>
            Get
          </button>
        </div>
        <div className=" w-[80%] mx-auto m-2 border-2 border-blue-500 rounded-lg">
          {referralsAddresses.length > 0 ? (
            referralsAddresses.map((data, index) => (
              <div className="m-2 p-4 border-2 border-blue-300 rounded-lg">
                <div className="flex justify-start text-md font-extrabold">
                  {`Lavel-${index + 1}`}
                </div>
                <div className="flex justify-end text-lg font-bold">
                  
                {data[0].length > 0 ? (
            data[0].map((addr,i) => (
              <>{addr} <br/></>
            ))):""}


                </div>
                <div className="flex justify-end text-lg font-bold">{(Number(referrecesAmountList[index])/blockChainConfig.decimals).toFixed(4) }</div>
                {/* <div className="flex justify-end text-lg font-bold">{ referrecesAmountList[3] }</div> */}
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <h3 className="text-lg font-extrabold">
                Input valid address to get referral
              </h3>
            </div>
          )}
        </div>
      </div>
    );
}