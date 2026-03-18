import express from "express";
import {
  checkAvailabilityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateBooking } from "../middleware/schemaMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, validateBooking, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;
