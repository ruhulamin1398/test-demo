import { cn } from "@/utils";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export function BallLeft({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="854"
      height="509"
      className={cn(className)}
      viewBox="0 0 854 509"
    >
      <defs>
        <radialGradient id="iphonesill__a" cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#667EEA"></stop>
          <stop offset="100%" stopColor="#667EEA" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient id="iphonesill__b" cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#9F7AEA"></stop>
          <stop offset="100%" stopColor="#9F7AEA" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#667EEA"></stop>
          <stop offset="100%" stopColor="#667EEA" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#9F7AEA"></stop>
          <stop offset="100%" stopColor="#9F7AEA" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(-64 -64)">
        <circle cx="300" cy="300" r="300" fill='url("#iphonesill__a")' fillOpacity="0.64"></circle>
        <circle cx="729" cy="384" r="240" fill='url("#iphonesill__b")' fillOpacity="0.72"></circle>
      </g>
    </svg>
  );
}
