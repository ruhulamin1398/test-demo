export interface Prize{
    amount: number;
    person: number;
  }
  
export interface Lottery {
    _id: string;
    lotteryId: string;
    lotteryType: string;
    holders: string[];
    maxTicket: number;
    taxCollected: number;
    treasuryTax: number;
    totalTax: number;
    price: number;
    topPrize: number;
    prizeDistribution: Prize[];
    totalPrize: number;
    winners: number;
    drawn: boolean;
    generalPrize: number;
    purchases: number;
    __v: number;
    holdersBuy: number;
    ticketSold: number;
}