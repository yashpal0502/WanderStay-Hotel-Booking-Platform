import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import { wrapAsync } from "../utils/wrapAsync.js";

export const registerHotel = wrapAsync(async (req, res) => {
  const { name, address, contact, city } = req.body;
  const owner = req.user._id;

  // if (!name || !address || !contact || !city) {
  //   throw new expressError(400, "All fields are required");
  // }

  // check if user is already registered
  const hotel = await Hotel.findOne({ owner });
  if (hotel) {
    return res.json({ success: false, message: "Hotel Already Registered" });
  }
  await Hotel.create({ name, address, contact, city, owner });
  await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

  res.json({ success: true, message: "Hotel Registered Successfully" });
});