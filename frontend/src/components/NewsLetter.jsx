import React from "react";
import { assets } from "../assets/assets";

const NewsLetter = () => {
  return (
    <div className="flex items-center justify-center bg-slate-50">
      <div class="flex flex-col items-center bg-white shadow-[0px_4px_25px_0px_#0000000D] text-gray-900/60 rounded-xl w-11/12 md:w-8/12 mb-12 md:py-8 py-6">
        <div class="flex items-center justify-center p-3 bg-red-100 rounded-full">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/model/faceIcon.svg"
            alt="faceIcon"
          />
        </div>
        <h2 class="text-slate-900 font-medium mt-3 text-lg">
          Planning your next trip?
        </h2>
        <p class="text-sm text-slate-900/60 mt-1 md:w-80 w-72 text-center">
          Join our list for exclusive offers and travel updates—free!
        </p>
        <div class="flex items-center mt-5 mb-8 w-full md:px-16 px-6">
          <input
            type="email"
            placeholder="Enter Your Email"
            class="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md"
            required
          />
          <button
            type="button"
            class="flex items-center justify-center gap-1 font-medium group text-sm text-white bg-[#fe424d] w-36 h-10 rounded-r-md"
          >
            Subscribe
            <img
              className="w-3.5 invert group-hover:translate-x-1 transition-all"
              src={assets.arrowIcon}
              alt="arrow-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
