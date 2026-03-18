import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const token = await getToken();
      const { data } = await axios.post(
        "/api/hotels/",
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="reg-name"
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            onClick={() => setShowHotelReg(false)}
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>
          {/* Hotel Name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#fe424d]/80 font-light"
              required
            />
          </div>
          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              id="contact"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#fe424d]/80 font-light"
              required
            />
          </div>
          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#fe424d]/80 font-light"
              required
            />
          </div>

          {/* Select City Drop Down */}

          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              id="city"
              type="text"
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-[#fe424d]/80 font-light"
              required
            />
          </div>
          <button className="bg-[#fe424d]/90 hover:bg-[#fe424d] transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;