import Review from "../models/Review.js";
import Room from "../models/Room.js";
import expressError from "../utils/expressError.js";
import { wrapAsync } from "../utils/wrapAsync.js";

// Create review

export const createReview = wrapAsync(async (req, res) => {
  const { roomId } = req.params;
  const { rating, comment } = req.body;

  const user = req.user;
  if (!user) {
    throw new expressError(401, "Please LogIn/SignUp to add review!");
  }
  const userId = user._id;

  const room = await Room.findById(roomId);
  if (!room) {
    throw new expressError(404, "Room not found");
  }

  const review = await Review.create({
    user: userId,
    room: roomId,
    rating,
    comment,
  });

  room.reviews.push(review._id);
  await room.save();

  res.json({ success: true, message: "Review added", review });
});

// Show review

export const showReview = wrapAsync(async (req, res) => {
  const { roomId } = req.params;

  const reviews = await Review.find({
    room: roomId,
  })
    .populate({ path: "user", select: "username" })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    reviews,
  });
});
