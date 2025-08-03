import { cn } from "@/utils";
import React from "react";
interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export function FocusUp({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="502"
      fill="none"
      className={cn(className)}
    >
      <circle
        cx="400"
        cy="102"
        r="400"
        fill='url("#heroglow_paint0_radial")'
        fillOpacity="0.6"
      ></circle>
      <circle
        cx="209"
        cy="289"
        r="170"
        fill='url("#heroglow_paint1_radial")'
        fillOpacity="0.4"
      ></circle>
      <defs>
        <radialGradient
          id="heroglow_paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 149 251) scale(315.089)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ABAB4"></stop>
          <stop offset="1" stopColor="#3ABAB4" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="heroglow_paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 -40 249) scale(133.913)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#667EEA"></stop>
          <stop offset="1" stopColor="#667EEA" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="heroglow_paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 149 251) scale(315.089)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ABAB4"></stop>
          <stop offset="1" stopColor="#3ABAB4" stopOpacity="0.01"></stop>
        </radialGradient>
        <radialGradient
          id="heroglow_paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(90 -40 249) scale(133.913)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#667EEA"></stop>
          <stop offset="1" stopColor="#667EEA" stopOpacity="0.01"></stop>
        </radialGradient>
      </defs>
    </svg>
  );
}
