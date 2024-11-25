import React from "react";
import { Twitter, Play, Send } from "lucide-react";

export const HomeFooter = () => {
  return (
    <footer className="bg-[#09072C] px-4 py-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
        <div className="mb-4 flex items-center sm:mb-0">
          <div className="mr-2 text-xl font-bold">LOTTOVERSE</div>
          <span className="text-xs">© All rights reserved</span>
        </div>

        <div className="flex space-x-4">
          <Twitter size={20} />
          <Play size={20} />
          <Send size={20} />
        </div>

        <div className="mt-4 flex space-x-4 sm:mt-0">
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            FAQ
          </a>
          <a href="#" className="hover:underline">
            Info
          </a>
        </div>
      </div>
    </footer>
  );
};
