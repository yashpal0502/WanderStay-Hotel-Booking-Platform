import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";
import { validateHotel } from "../middleware/schemaMiddleware.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, validateHotel, registerHotel);

export default hotelRouter;