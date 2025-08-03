"use client";
import React from "react";
import { useAccount } from "wagmi";
import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";

type User = {
  address: string;
  createdAt: string;
  referralCommission: number;
  referralLink: string;
  referredBy: string;
  totalTickets: {
    easy: number;
    super: number;
  };
  userStatus: "active" | "inactive";
  userType: "user" | "premium";
  _id: string;
};

type LevelProps = {
  levelNumber: number;
  users: User[];
};

const LevelSection: React.FC<LevelProps> = ({ levelNumber, users }) => {

  const formatAddress = (address: string) => {
    return `${address?.slice(0, 6)}......${address?.slice(-6)}`;
  };
  return (
    <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level {levelNumber}</h1>
      <ul className="space-y-2">
        {users.length > 0 ? (
          users.map((user: User, index: number) => (
            <li
              key={index}
              className="flex items-center justify-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 w-96"
            >
              <span className="text-gray-700">{user?.address ? formatAddress(user.address) : ''}</span>

            </li>
          ))
        ) : (
          <li

            className="flex items-center justify-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 w-96"
          >
            <span className="text-gray-700">No user available</span>
          </li>

        )}


      </ul>
    </section>
  );
};

const Structure = () => {
  const { address } = useAccount();
  const { data, isLoading } = useGetSingleUserDetailsQuery({ address });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data available</div>;

  const levelsUsers = data.levelDetails;


  // console.log(levelsUsers)

  return (
    <div className="mt-14 flex flex-col gap-y-5 w-full items-center justify-center">
      {[1, 2, 3, 4, 5, 6, 7].map((level) => (
        <LevelSection
          key={level}
          levelNumber={level}
          users={levelsUsers[`level${level}`]?.users || []}
        />
      ))}
    </div>
  );
};

export default Structure;






// "use client"
// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useAccount } from "wagmi";
// import { useGetSingleUserDetailsQuery } from "@/redux/api/all-api/users";


// type User = {
//   address: string;
//   createdAt: string; // Alternatively, you can use Date if you're handling it as a Date object
//   referralCommission: number;
//   referralLink: string;
//   referredBy: string;
//   totalTickets: {
//     easy: number;
//     super: number;
//   };
//   userStatus: 'active' | 'inactive';
//   userType: 'user' | 'premium'; // You can extend this depending on possible user types
//   _id: string;
// };


// const Structure = () => {

//   const { address } = useAccount();

//   const { data, isLoading } = useGetSingleUserDetailsQuery({ address });

//   if (isLoading) return


//   console.log(data)

//   const levelsUsers = data.levelDetails


//   return (
//     <div>
//       <div className="mt-14 flex flex-col gap-y-5 w-full items-center justify-center">
//         {/* <Avatar className="size-28 md:size-36 xl:size-40 2xl:size-48">
//           <AvatarImage src="https://github.com/yeasin2002.png" />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar> */}

//         {/* for level 1 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 1</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level1.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 2 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 2</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level2.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 3 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 3</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level3.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 4 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 4</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level4.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 5 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 5</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level5.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 6 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 6</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level6.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//         {/* for level 7 */}
//         <section className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Level 7</h1>
//           <ul className="space-y-2">
//             {levelsUsers.level7.users.map((user: User, index: number) => (
//               <li key={index} className="flex items-center p-2 bg-white border rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <span className="text-gray-700">{user.address}</span>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Structure;



