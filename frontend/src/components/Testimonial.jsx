import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What our Guests Say"
        subTitle="Trusted by travelers worldwide—read what makes our destinations truly remarkable."
      />
      <div class="flex flex-wrap items-center justify-center gap-6 pt-14 mt-15">
        {testimonials.map((testimonials) => (
          <div
            key={testimonials.id}
            class="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 mb-10 sm:mb-15 md:mb-18"
          >
            <div class="flex flex-col items-center px-5 py-4 relative">
              <img
                class="h-24 w-24 absolute -top-14 rounded-full"
                src={testimonials.image}
                alt={testimonials.name}
              />
              <div class="pt-8 text-center">
                <h1 class="text-lg font-medium text-gray-800">
                  {testimonials.name}
                </h1>
                <p class="text-gray-800/80">Content Creator</p>
                <p class="text-gray-800/80">{testimonials.address}</p>
              </div>
            </div>
            <p class="text-gray-500 px-6 text-center">{testimonials.review}</p>
            <div class="flex justify-center pt-4">
              <div class="flex gap-0.5">
                <StarRating />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
