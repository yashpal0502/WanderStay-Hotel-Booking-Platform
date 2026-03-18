import express from "express";
import { createReview, showReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
// import { validateReviews } from "../middleware/schemaMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/:roomId", protect, createReview);
reviewRouter.get("/:roomId", showReview);

export default reviewRouter;