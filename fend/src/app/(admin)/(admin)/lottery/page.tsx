"use client"

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopLeaders } from "../../leaderboard/TopLeaders";
import { TopBuyer } from "../../leaderboard/TopBuyer";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { usePremiumBalance } from "@/contracts/contractUtils/usePremiumBalance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetLottery } from "@/Api/GetLottery";
import { blockChainConfig } from "@/contracts/const";

import Web3Token from "web3-token";
import { BrowserProvider, Contract } from "ethers";



const Lotteries = async () => {
  const { premiumUserList, premiumReserve } = usePremiumBalance();
  const [lotteryList, setLotteryList] = useState([]);
  // const axiosSecure = useAxiosSecure();

  // console.log(axiosSecure)

  // const response = await axiosSecure.get("/leaderBuyer");

  // console.log("leader", response);

  const { lotteries, loading } = GetLottery();


  useEffect(() => {
    console.log("lotteries ________________________ ", lotteries);

    const sortedData = lotteries.sort((a, b) => b.lotteryId - a.lotteryId);
    setLotteryList(sortedData);

  }, [lotteries]
  )


  const Draw = async (lotteryId) => {
    try {
      const inContract = new Contract(blockChainConfig.contractAddress, blockChainConfig.lotteryABI, blockChainConfig.provider);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const Mcontract = new Contract(blockChainConfig.contractAddress,
        blockChainConfig.lotteryABI, signer);
      const token = await Web3Token.sign(
        async (msg) => await signer.signMessage(msg)
      );


      try {
  
 
        // if (localStorage.getItem('drawStatus') == null) {
        //   toast.loading("Draw  running .....(1/4)");
        //   const drawTx = await Mcontract.Draw(parseInt(lottery.lotteryId), { gasLimit: 25000000, gasPrice: parseUnits("29", "gwei") });
        //   await drawTx.wait(10);
        //   localStorage.setItem('drawId', parseInt(lottery.lotteryId));
        //   localStorage.setItem('drawStatus', 1);
        //   if(localStorage.getItem("drawId") == parseInt(lottery.lotteryId) && localStorage.getItem("drawStatus") ==1 )
        //  {
        //    toast.dismiss();
         
        // } 
        // else{
        //   toast.dismiss();
        //   toast.error("Some thing went wrong ");
        // }
          
        // }

        // if (localStorage.getItem('drawStatus') == 1) {

        //   toast.loading("Draw  running .....(2/4)");
        //   const tx = await Mcontract.PerformDraw({ gasLimit: 25000000, gasPrice: parseUnits("27", "gwei") });
        //   await tx.wait(15);
        //   localStorage.setItem('drawStatus', 2);
          

        //   if( localStorage.getItem("drawStatus") ==2 )
        //     {
        //       toast.dismiss();
            
        //    } 
        //    else{
        //      toast.dismiss();
        //      toast.error("Some thing went wrong ");
        //    }

        // }

     
        // if (localStorage.getItem('drawStatus') == 2) {
        //   toast.loading("Draw  running .....(3/4)");

        //   const disTx2 = await Mcontract.distributeTopBuyersAmounts({ gasLimit: 25000000, gasPrice: parseUnits("29", "gwei") });
        //   await disTx2.wait(1);
        //   localStorage.setItem('drawStatus', 3);
        //   if( localStorage.getItem("drawStatus") ==3 )
        //     {
        //       toast.dismiss();
              
        //    } 
        //    else{
        //      toast.dismiss();
        //      toast.error("Some thing went wrong ");
        //    }
        // }


        // if (localStorage.getItem('drawStatus') == 3) {
        //   toast.loading("Draw  running .....(4/4)");

        //   let lotteryIdfromStorage = localStorage.getItem('drawId');

        //   const winnerListResponse = await inContract.getWinnersList(parseInt(lotteryIdfromStorage));

        //   console.log("winnerListResponse", winnerListResponse ); 
        //   console.log("Winners From BC ", winnerListResponse[0] ); 
     
      
        //   let winners = [];

        //   // for(let i =0 ; i<winnerListResponse[0][12].length; i++){
        //   // console.log("winnerListResponse[0][12][i]", winnerListResponse[0][12][i]);
        //   // console.log("winnerListResponse[0][10]["+winnerListResponse[0][12][i]+"]", winnerListResponse[0][10][winnerListResponse[0][12][i]]);
        //   // console.log("winnerListResponse[0][11][i]", winnerListResponse[0][11][i]);
        //   //      winners.push({
        //   //       winner:  winnerListResponse[0][10][i][0],
        //   //       prize: Number(winnerListResponse[0][11][winnerListResponse[0][12][i]]),
        //   //       ticket: winnerListResponse[0][10][i][2],
        //   //     })
        //   // }

        //   for (let i = 0; i < winnerListResponse[0].length; i++) {
        //     // console.log("1 0 0", winnerListResponse[1][i][0]);
           
        //       winners.push({
        //         winner: winnerListResponse[0][i][2],
        //         prize: Number(winnerListResponse[0][i][3]),
        //         ticket: winnerListResponse[0][i][1],
        //       })
        //     }

         
        //   // console.log("winners", winners);


        //   /// sening to database
        //   if (winnerListResponse && winnerListResponse.length > 0) {


        //     const dbRequestData = {
        //       lottery_id: Number(winnerListResponse[1] ),
        //       round: Number(winnerListResponse[2]),
        //       lottery_type: Number(winnerListResponse[3]),
        //       is_draw: (winnerListResponse[0].length > 1) ? true : false,
        //       result: winners
        //     }

        //     console.log(" Request send to database ", dbRequestData)
            


        //     try {
        //       const response = await axios.post(
        //         `${appConfig.api}/update-lottery`,
        //         dbRequestData,
        //         {
        //           headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token,
        //             'x-origin-key': secretKey
        //           }
        //         }

        //       );
        //       localStorage.removeItem('drawStatus');
        //       localStorage.removeItem('drawId');
        //       toast.dismiss();
        //       toast.success("Draw  completed successfully");

        //       // Handle the response as needed
        //       // console.log("Lottery updated successfully:", response.data);
        //     } catch (error) {
        //       toast.dismiss();
        //       toast.error('something went wring', '10s')
        //     }


        //   }

        // }

 
      } catch (err) {
        console.warn(err)
      }






    } catch (err) {
      console.warn(err);
      // toast.dismiss();
      // toast.error('something went wring', '10s')
    }

  }

  return (<>
    <section className="[#16183E] bg-transparent">

      <h1 className="mb-1 mt-0 text-xl font-bold py-4"> Lotteries </h1>


      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Sold</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lotteryList?.map((lottery, index) => (
              <TableRow key={lottery.lotteryId}>
                <TableCell>{lottery?.lotteryId}</TableCell>
                <TableCell>{lottery.lotteryType == 0 ? "Easy" : "Super"}</TableCell>
                <TableCell>{lottery?.ticketSold}</TableCell>
                <TableCell>{lottery?.holders?.length}</TableCell>
                <TableCell>
                  {(!lottery.drawn) &&
                    <button className="btn-gradient-purple text-sm lg:text-lg p-2 " onClick={() => Draw(lottery.lotteryId)} >Draw</button>

                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </section>
  </>
  );
};

export default Lotteries;
