import Image from "next/image";
import React from "react";
interface Props extends React.ComponentProps<"div"> {}

export const TempHome = ({ ...props }: Props) => {
  return (
    <div {...props}>
      <section className="text-gray-100">
        <div className="container mx-auto px-6 py-16 text-center">
          <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-semibold lg:text-4xl">
              Building Your Next App with our Awesome components
            </h1>
            <p className="mt-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero similique obcaecati
              illum mollitia.
            </p>
            <button className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-blue-500 focus:outline-none lg:mx-0 lg:w-auto">
              Start 14-Day free trial
            </button>
            <p className="mt-3 text-sm">No credit card required</p>
          </div>

          <div className="mt-10 flex justify-center">
            <Image
              className="h-96 w-full rounded-xl object-cover lg:w-4/5"
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
              width={500}
              height={1200}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
};
