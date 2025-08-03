import { cn } from "@/utils";
import React from "react";
interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export function Icon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="400"
      height="232"
      viewBox="0 0 400 232"
      className={cn(className)}
    >
      <defs>
        <radialGradient id="box-gr-a" cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#667EEA"></stop>
          <stop offset="100%" stopColor="#667EEA" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient id="box-gr-b" cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#3ABAB4"></stop>
          <stop offset="100%" stopColor="#3ABAB4" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#667EEA"></stop>
          <stop offset="100%" stopColor="#667EEA" stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" r="39.386%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#3ABAB4"></stop>
          <stop offset="100%" stopColor="#3ABAB4" stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(-85 -369)">
        <circle cx="413" cy="688" r="240" fill='url("#box-gr-a")' fillOpacity="0.16"></circle>
        <circle cx="400" cy="400" r="400" fill='url("#box-gr-b")' fillOpacity="0.24"></circle>
      </g>
    </svg>
  );
}
