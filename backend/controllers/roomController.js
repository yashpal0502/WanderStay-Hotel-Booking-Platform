import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import expressError from "../utils/expressError.js";

// API to create a new room for a hotel

export const createRoom = wrapAsync(async (req, res) => {
  const { roomType, pricePerNight, amenities } = req.body;

  // if (!roomType || !pricePerNight || !amenities) {
  //   throw new expressError(400, "All fields are required");
  // }

  const hotel = await Hotel.findOne({ owner: req.auth.userId });
  if (!hotel) {
    return res.json({ success: false, message: "No Hotel found" });
  }

  // upload images to cloudinary

  const uploadImages = req.files.map(async (file) => {
    const response = await cloudinary.uploader.upload(file.path, {
      folder: "WanderStay",
    });
    return response.secure_url;
  });

  // wait for all uploads to complete

  const images = await Promise.all(uploadImages);

  await Room.create({
    hotel: hotel._id,
    roomType,
    pricePerNight: +pricePerNight, //+ will convert price string into number
    amenities: JSON.parse(amenities),
    images,
  });

  res.json({ success: true, message: "Room created successfully" });
});
// API to get all rooms

export const getRooms = wrapAsync(async (req, res) => {
  const rooms = await Room.find({ isAvailable: true })
    .populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "image",
      },
    })
    .sort({ createdAt: -1 });
  res.json({ success: true, rooms });
});

// API to get all rooms for a specific hotel

export const getOwnerRooms = wrapAsync(async (req, res) => {
  const hotelData = await Hotel.findOne({ owner: req.auth.userId });
  const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
    "hotel"
  );
  res.json({ success: true, rooms });
});

// API to toggle availability of a room

export const toggleRoomAvailability = wrapAsync(async (req, res) => {
  const { roomId } = req.body;
  const roomData = await Room.findById(roomId);
  roomData.isAvailable = !roomData.isAvailable;
  await roomData.save();
  res.json({ success: true, message: "Room availability updated" });
});
