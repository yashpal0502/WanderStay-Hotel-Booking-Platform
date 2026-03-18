import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetail = () => {
  const { id } = useParams();

  const { rooms, getToken, axios, navigate } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Check if the room is available
  const checkAvailability = async () => {
    try {
      // check is check-in date is greater than check-out date
      if (checkInDate >= checkOutDate) {
        toast.error("Check-In Date should be less than Check-Out Date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  // onSubmitHandler function to check availability & book the room

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/review/${id}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `/api/review/${id}`,
        { room: id, rating: Number(rating), comment },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (res.data.success) {
        // Clear form
        setRating(3);
        setComment("");
        // Refresh reviews list
        fetchReviews();
        toast.success("Review submitted!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
    fetchReviews();
  }, [rooms]);
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        {/* Room Ratings */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>
        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>
        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainImage === image && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>
        {/* Room Highlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price */}
          <p className="text-2xl font-medium">₹{room.pricePerNight} /night</p>
        </div>
        {/* CheckIn CheckOut Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} //we cannot select previous date
                type="date"
                id="checkInDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate} // check-out date must be after check-in date
                disabled={!checkInDate}
                type="date"
                id="checkOutDate"
                placeholder="Check-Out"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black transition-all duration-500 hover:bg-[#fe424d] active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>
        {/* Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Description */}
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          Guests will be allocated rooms according to availability at the time
          of check-in. Each room is thoughtfully designed to offer comfort and
          convenience, featuring modern interiors, cozy bedding, and essential
          amenities to make your stay enjoyable. The price shown is for two
          guests; please update the number of guests during booking to receive
          the exact price for groups or families.
        </div>
        {/* Hosted by */}
        <div className="flex flex-col items-start gap-4 pb-15">
          <div className="text-sm text-gray-500 w-65 md:w-80 divide-y divide-gray-500/30 border border-gray-500/30 rounded bg-white">
            {/* <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            /> */}
            <div class="flex flex-col items-center justify-between py-8">
              <img
                class="h-24 w-24 rounded-full"
                src={room.hotel.owner.image}
                alt="Host"
              />
              <h2 class="text-lg text-gray-800 mt-3">
                Hosted by {room.hotel.name}
              </h2>
              <p>Content Marketing</p>
              <p class="bg-green-500/20 px-2 py-0.5 rounded-full mt-2 text-xs text-green-600 border border-green-500/30">
                Admin
              </p>
            </div>
            <div class="flex items-center divide-x divide-gray-500/30">
              <button
                type="button"
                class="flex items-center justify-center w-full py-3"
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 2.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5m15 0v9c0 .825-.675 1.5-1.5 1.5H3c-.825 0-1.5-.675-1.5-1.5v-9m15 0L9 7.75 1.5 2.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                &nbsp;&nbsp; Contact Now
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 border-y border-gray-300 max-w-3xl"></div>

        {/* Send Comments */}

        <form
          onSubmit={submitReview}
          className="flex flex-col w-full max-w-lg p-6 bg-white rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Share Your Experience
          </h2>

          {/* Rating */}
          <label className="text-gray-600 mb-2 font-medium">Rating</label>
          <input
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            type="range"
            min="1"
            max="5"
            step="1"
            className="w-full accent-yellow-500 cursor-pointer mb-4"
          />
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>😞 1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>😍 5</span>
          </div>

          {/* Review Text */}
          <label className="text-gray-600 mb-2 font-medium">Your Review</label>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            rows="4"
            className="border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 mb-4 resize-none"
            placeholder="Write your review here..."
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#fe424d] hover:bg-[#e63a45] text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Submit Review
          </button>
        </form>

        {/* All Comments */}
        <h2 className="text-2xl font-semibold mt-10 pl-5 text-gray-800">
          All Reviews
        </h2>
        <div className="w-full max-w-7xl mt-5 pb-10">
          {/* <div className="w-full sm:max-w-sm md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto overflow-hidden bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6"> */}
          {/* Reviews Grid */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {reviews.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 p-4
                       sm:p-4 md:p-5 lg:p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          {review.user.username.split(" ")[0]}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center text-yellow-400 text-sm mt-1">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                      {/* Review text */}
                      <p className="mt-2 text-sm text-gray-700">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    )
  );
};

export default RoomDetail;
