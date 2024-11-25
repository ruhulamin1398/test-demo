import { cn } from "@/utils";
import React from "react";

interface CircularProgressProps {
  value?: string;
  className?: string;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  className = "",
  strokeWidth = 4,
}) => {
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value? parseInt(value)/1000:0) * circumference;
  // const printValue = (value)?  parseInt(value)?.toFixed(2)+ "<br> USDT " : "0.00 <br> USDT";
 
 
  return (
    <div className={cn(`relative flex size-24 items-center justify-center`, className)}>
      <svg
        className="absolute h-full w-full rotate-[-90deg] transform"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="relative text-xl font-bold text-blue-500">{value  }   </div>
      <br/>  
    </div>
  );
};
