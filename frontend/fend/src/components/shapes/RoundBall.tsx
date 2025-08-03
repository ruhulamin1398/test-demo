import { cn } from "@/utils";
import React from "react";
interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export function RoundBall({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2302"
      height="2397"
      fill="none"
      viewBox="0 0 2302 2397"
      className={cn(className)}
    >
      <g filter="url(#filter0_f_503_4)" opacity="0.8">
        <ellipse
          cx="1227.09"
          cy="1198.55"
          fill="#A287F4"
          rx="764.601"
          ry="689.672"
          transform="rotate(-33.877 1227.09 1198.55)"
        ></ellipse>
      </g>
      <defs>
        <filter
          id="filter0_f_503_4"
          width="2453.04"
          height="2396.24"
          x="0.575"
          y="0.431"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur_503_4"
            stdDeviation="242.14"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
}
