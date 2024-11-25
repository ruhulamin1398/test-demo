"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";
import { cn } from "@/utils";
import React from "react";
import { useAccount } from "wagmi";

interface Props extends React.ComponentProps<"div"> {}

interface ReferredUser {
  _id: string;
  address: string;
  userStatus: string;
  userType: string;
}

export const ReferralInfoTable = ({ className, ...props }: Props) => {
  const page = 1;
  const limit = 50000000;

  const { address } = useAccount();
  const { data, isLoading } = useGetSingleUserDetailsQuery({ address, page, limit });

  if (isLoading) return <div className="flex h-full items-center justify-center">Loading...</div>;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}......${address.slice(-6)}`;
  };

  return (
    <div className={cn(className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Account Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.allReferredUsers?.map((user: ReferredUser, index: number) => (
            <TableRow key={user?._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{formatAddress(user?.address)}</TableCell> {/* Display user's address */}
              <TableCell>{user?.userType === "user" ? "User" : "Premium"}</TableCell>{" "}
              {/* Determine account type */}
              <TableCell>{user?.userStatus === "active" ? "Active" : "Inactive"}</TableCell>{" "}
              {/* Display user's status */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// export const ReferralInfoTable = ({ ...props }: Props) => {
//   return (
//     <div {...props}>
//       <div className="table-heading grid grid-cols-4 items-center">
//         <p className="py-3">SL</p>
//         <p>User ID </p>
//         <p>Account Type</p>
//         <p>Account Status</p>
//       </div>
//       <div>
//         <div>
//           {Array.from({ length: 8 }).map((_, index) => (
//             <div
//               className="grid grid-cols-4 items-center border-b border-gray-400/50 bg-[#171A21] p-3 text-center"
//               key={index}
//             >
//               <p className="py-2"> {index + 1} </p>
//               <p>0x08...0e178</p>
//               <p>{index % 2 === 0 ? "Premium" : "User"}</p>
//               <p>{index % 2 === 0 ? "active" : "inactive"}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
