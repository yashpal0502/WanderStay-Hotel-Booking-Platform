import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms } = useAppContext();

  const navigate = useNavigate();

  return (
    rooms.length > 0 && (
      <div className="flex flex-col items-center px-2 md:px-5 lg:px-8 bg-slate-50 py-10">
        <Title
          title="Featured Destination"
          subTitle="Plan your next journey with our selection of featured destinations designed to inspire and excite every traveler."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-black text-white hover:bg-[#fe424d] transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
