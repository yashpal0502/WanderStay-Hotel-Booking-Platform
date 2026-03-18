import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();

  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  const navigate = useNavigate();

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-2 md:px-5 lg:px-8 bg-slate-50 py-10">
        <Title
          title="Recommented Hotels"
          subTitle="Plan your next journey with our selection of featured destinations designed to inspire and excite every traveler."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
