import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// import expressError from "../utils/expressError.js";
import { wrapAsync } from "../utils/wrapAsync.js";

// Function to check availability of room

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  const booking = await Booking.find({
    room,
    checkInDate: { $lte: checkOutDate },
    checkOutDate: { $gte: checkInDate },
  });
  const isAvailable = booking.length === 0;
  return isAvailable;
};

// API to check availability of room
// POST /api/bookings/check-availability

export const checkAvailabilityAPI = wrapAsync(async (req, res) => {
  const { room, checkInDate, checkOutDate } = req.body;

  // if (!checkInDate || !checkOutDate) {
  //   throw new expressError(400, "All fields are required");
  // }

  const isAvailable = await checkAvailability({
    checkInDate,
    checkOutDate,
    room,
  });
  res.json({ success: true, isAvailable });
});

// API to create new booking
// POST /api/bookings/book

export const createBooking = wrapAsync(async (req, res) => {
  const { room, checkInDate, checkOutDate, guests } = req.body;

  const user = req.user._id;

  // Before Booking Check Availability
  const isAvailable = await checkAvailability({
    checkInDate,
    checkOutDate,
    room,
  });

  if (!isAvailable) {
    return res.json({ success: false, message: "Room is not available" });
  }

  // get total price for room

  const roomData = await Room.findById(room).populate("hotel");
  let totalPrice = roomData.pricePerNight;

  // calculate total price based on nights

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const timeDiff = checkOut.getTime() - checkIn.getTime();

  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  totalPrice *= nights;

  const booking = await Booking.create({
    user,
    room,
    hotel: roomData.hotel._id,
    guests: +guests,
    checkInDate,
    checkOutDate,
    totalPrice,
  });
  res.json({ success: true, message: "Booking created successfully" });
});

// API to get all Bookings for a user
// GET /api/bookings/user

export const getUserBookings = wrapAsync(async (req, res) => {
  const user = req.user._id;
  const bookings = await Booking.find({ user })
    .populate("room hotel")
    .sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

export const getHotelBookings = wrapAsync(async (req, res) => {
  const hotel = await Hotel.findOne({ owner: req.auth.userId });
  if (!hotel) {
    return res.json({ success: false, message: "No Hotel found" });
  }

  const bookings = await Booking.find({ hotel: hotel._id })
    .populate("room hotel user")
    .sort({ createdAt: -1 });

  // Total Bookings

  const totalBookings = bookings.length;

  //   Total Revenue

  const totalRevenue = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );

  res.json({
    success: true,
    dashboardData: { totalBookings, totalRevenue, bookings },
  });
});
