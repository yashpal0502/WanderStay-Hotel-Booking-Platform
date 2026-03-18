import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import expressError from "./utils/expressError.js";
import reviewRouter from "./routes/reviewRoutes.js";

async function main() {
  await connectDB();
}

main();

connectCloudinary();

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

// API to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API is Working Fine"));

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/review", reviewRouter);

app.use((req, res, next) => {
  next(new expressError(404, "Page Not Found!"));
});
// global error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  console.error(err);
  res.status(statusCode).json({ success: false, message: message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));