import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { blockChainConfig } from "@/contracts/const";

interface LeaderboardTableProps {
  users: any[];
  reward: number;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, reward }) => {
  // console.log(users);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Bonus</TableHead>
            <TableHead>Ticket</TableHead>
            <TableHead>Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {user.user.slice(0, 4)}...{user.user.slice(-4)}
              </TableCell>
              <TableCell>{(user.reward/ blockChainConfig.decimals ).toFixed(2)} USDT</TableCell>
              <TableCell>{Number(user.ticket)}</TableCell>
              <TableCell>{(Number(user.amount) / 1e6).toFixed(0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
