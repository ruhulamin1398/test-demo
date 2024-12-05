import React from "react";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import axios from "axios"
import {RiArrowRightLine} from "react-icons/ri"
import { secretKey} from "../contracts/const"
import {appConfig} from "../config/appConfig"
export default function App() {
    const [users, setUsers] = React.useState([])
    const [action, setAction] = React.useState(false);
    React.useEffect(()=>{
        axios.get(`${appConfig.api}/leaderBuyer`)
            .then((data)=>setUsers(data.data))
            .catch((err)=>console.warn(err.message)) 
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-origin-key' : secretKey
      }
     })
    // console.log(users)
  return (
    <>
    
    <div className="w-full md:w-4/5 lg:w-3/5 mx-auto mt-2 rounded-md flex  justify-between p-4 bg-gradient-to-br from-black to-gray-300">
    <div className="grow flex justify-start">
      <h1 className=" font-bold text-3xl text-white">Buyer board</h1>
    </div>
    <div className="w-1/7 flex flex-col items-end  gap-2">
      <h2 className="font-bold text-lg">Reserve</h2>
      <div className="flex gap-2 justify-end items-end">
      <h1 className="font-bold text-3xl">100000</h1>
      <p className="text-xs font-semibold">USDc</p>
      </div>
      <div className=" flex rounded-full border-2  border-blue-500 ">
       {action && <input className="px-2 bg-transparent outline-none"/> }
       {!action && <button className="bg-blue-500 rounded-full px-2 font-bold text-white" onClick={()=>setAction(true)}>
         Distribute
        </button>}
        {action && <button className="bg-blue-500 rounded-full px-2 font-bold text-white" onClick={()=>setAction(false)}>
        <RiArrowRightLine/>
        </button>}
      </div>
    </div>
    </div>
    <div className='w-full md:w-4/5 lg:w-3/5 mx-auto border-2 border-gray-100 rounded-lg p-2 m-2'>
      
    <table className="w-full mx-auto  p-2 ">
            <tr className="bg-slate-500  m-1 font-bold p-1">
                <td className="rounded-s-full p-1">User</td>
                <td>Participate</td>
                <td className="rounded-e-full p-1">Total Cost</td>
                {/* <td className="rounded-e-full p-1">Total Rewards</td> */}
            </tr>
            {
              users.length > 0 ? 
              users.map((data, index)=>(
                <tr className="">
                <td className="p-2">
                    <div className="flex items-center justify-center gap-2">
                    <Jazzicon seed={jsNumberForAddress(data.address)} diameter={30}/>
                    <div>{`${data?.address?.slice(0,2)}..${data?.address?.slice(-4)}`}</div>
                    </div>
                    
                </td>
                <td>{data.totalBuy}</td>
                <td>{data.totalBuy}</td>
                {/* <td>1</td> */}
               </tr> 
              ))
              : 
           <tr>No Records</tr>
            }
           
      
    </table>
    </div>
    </>
  );
}
