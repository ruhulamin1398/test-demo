import React from "react";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import axios from "axios"
import { RiArrowRightLine } from "react-icons/ri";
import { BrowserProvider, Contract } from "ethers";
import { blockChainConfig,   secretKey } from "../contracts/const";
import Web3Token from "web3-token";
import { toast } from "react-toastify"
import { useMetaMask } from "metamask-react";
import Error from "./error"
import { appConfig } from "../config/appConfig";


export default function App() {
  const { status, account } = useMetaMask();
  const [users, setUsers] = React.useState([])
  const [premiumUsers, setPremiumUsers] = React.useState([])
  const [action, setAction] = React.useState(false);
  const [newMember, setNewMember] = React.useState('');
  const [reserve, setReserve] = React.useState(null)

  const getReaserve = async () => {
    const provider = new BrowserProvider(window.ethereum);
    // const signer = await provider.getSigner();
    const contract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, provider);
    // const premiumReserve = await contract.premiumReserve()
    const [premiumReserve, premiumList] = await contract.getPremiumReserve();

    setReserve(Number(premiumReserve)/blockChainConfig.decimals);
    setPremiumUsers(premiumList);

    console.warn(Number(premiumReserve));
    // console.log(premiumReserve, ); 

  };

  const adPremium = async () => {
    try {
      toast.loading("Adding premium member....")
      // console.log("newMember =======================", newMember);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const token = await Web3Token.sign(async msg => await signer.signMessage(msg));
      if (signer.address == blockChainConfig.owner) {
        const contract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, signer);
        const premiumMember = [];
        premiumMember.push(newMember)
        
        const tx = await contract.addPremiumAccount(newMember,{ gasLimit: 1000000 });
        // console.log("newMember =======================", newMember);

        // const tx = await contract.addPremiumAccount(premiumMember);
        const Tx = await tx.wait(1);
        await axios.post(`${appConfig.api}/add-premiums`, {
          member: newMember
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
              'x-origin-key': secretKey
            }
          }
        );
        toast.dismiss()
        toast.success("Successfully added premium member");
        setNewMember('')
      } else {
        toast.dismiss()
        toast.error("Only owner can add premium member");
        return;
      }
    } catch (err) {
      console.warn(err);

    }

  }
  React.useEffect(() => {
    getReaserve();
    axios.get(`${appConfig.api}/get-premiums`, {
      headers: {
        'Content-Type': 'application/json',
        'x-origin-key': secretKey
      }
    })
      .then((data) => {
        setUsers(data.data)
        // console.log("users   ===", data.data)
  })
      
      .catch((err) => console.warn(err.message));

  }, [])

  return (
    <>
      {
        status === "connected" && blockChainConfig.owner.toLowerCase() === account.toLowerCase() ?
          <>
            <div className="w-[90%]  mx-auto mt-2 rounded-md flex  justify-between p-4 bg-gradient-to-br from-black to-gray-300">
              <div className="grow flex justify-start">
                <h1 className=" font-bold text-3xl text-white">Premium Members</h1>
              </div>
              <div className="w-1/7 flex flex-col items-end  gap-2">
                <h2 className="font-bold text-lg">Reserve</h2>
                <div className="flex gap-2 justify-end items-end">
                  <h1 className="font-bold text-3xl">{reserve == null ? "loading..." : reserve.toFixed(4)}</h1>
                  <p className="text-xs font-semibold">USDc</p>
                </div>
                <div className=" flex rounded-full border-2  border-blue-500 ">
                  {action && <input className="px-2 bg-transparent outline-none" />}
                  {!action && <button className="bg-blue-500 rounded-full px-2 font-bold text-white" onClick={() => setAction(true)}>
                    Distribute
                  </button>}
                  {action && <button className="bg-blue-500 rounded-full px-2 font-bold text-white" onClick={() => setAction(false)}>
                    <RiArrowRightLine />
                  </button>}
                </div>
              </div>
            </div>

            <div className="w-[80%] mx-auto my-2 border-2 border-gray-100 rounded-lg p-4">
              <div className="flex justify-start">
                <h2 className="font-extrabold text-blue-500">Add Premiums</h2>
              </div>
              <div className="flex gap-2 justify-end">
                <input className="lg:w-[350px] border-2 border-gray-100 rounded-full px-2" onChange={(e) => setNewMember(e.target.value.trim())} placeholder="Add premium address" />
                <buttom className=" hover:bg-blue-500 hover:text-white rounded-full px-4 py-1 cursor-pointer  font-bold" onClick={adPremium} disabled={newMember == ''}>Add</buttom>
              </div>
            </div>
            <div className='w-[80%] mx-auto border-2 border-gray-100 rounded-lg p-2 m-2'>

              <table className="w-full mx-auto  p-2 ">
                <tr className="bg-slate-500  m-1 font-bold p-1">
                  <td className="rounded-s-full p-1">User</td> 
                  <td className="rounded-e-full p-1">Total Reward</td>
                  {/* <td className="rounded-e-full p-1">Total Rewards</td> */}
                </tr>
                {
                  premiumUsers.length > 0 ?
                  premiumUsers.map((user ) => (
                      <tr className="">
                        <td className="p-2">
                          <div className="flex items-center justify-center gap-2">
                            <Jazzicon seed={jsNumberForAddress(user[0])} diameter={30} />
                            <div>{`${user[0]?.slice(0, 2)}..${user[0]?.slice(-4)}`}</div>
                          </div>

                        </td> 
                        <td>{ (Number(user[1])/blockChainConfig.decimals).toFixed(4) }  </td>
                        {/* <td>1</td> */}
                      </tr>
                    ))
                    :
                    <tr>No Records</tr>
                }


              </table>
            </div> </> : <Error />
      }
    </>
  );
}
