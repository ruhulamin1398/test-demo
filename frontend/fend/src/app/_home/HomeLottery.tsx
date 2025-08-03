import { buttonVariants } from "@/components/ui";
import Image, { StaticImageData } from "next/image";
import React from "react";
interface Props extends React.ComponentProps<"div"> {
  img: StaticImageData;
}

export const HomeLottery = ({ img, ...props }: Props) => {
  return (
    <div {...props}>
      <div className="max-w-sm rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <Image src={img} alt="product image" className="rounded-t-lg" />

        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-medium tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
            chronological order.
          </p>
          <a
            href="#"
            className={buttonVariants({
              className: "w-full bg-[#7359F8]",
            })}
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
