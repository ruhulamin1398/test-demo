import { cn } from "@/utils";
import React from "react";
interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export function BallRight({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="678"
      height="634"
      fill="none"
      className={cn(className)}
      viewBox="0 0 678 634"
    >
      <circle
        cx="240"
        cy="394"
        r="240"
        fill='url("#piphoneill_paint0_radial")'
        fillOpacity="0.4"
      ></circle>
      <circle
        cx="438"
        cy="240"
        r="240"
        fill='url("#piphoneill_paint1_radial")'
        fillOpacity="0.6"
      ></circle>
      <defs>
        <radialGradient
          id="piphoneill_paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 -77 317) scale(189.054)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#667EEA"></stop>
          <stop offset="1" stopColor="#667EEA" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="piphoneill_paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 99 339) scale(189.054)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9F7AEA"></stop>
          <stop offset="1" stopColor="#9F7AEA" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="piphoneill_paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 -77 317) scale(189.054)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#667EEA"></stop>
          <stop offset="1" stopColor="#667EEA" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="piphoneill_paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 99 339) scale(189.054)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9F7AEA"></stop>
          <stop offset="1" stopColor="#9F7AEA" stopOpacity="0.01"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}
