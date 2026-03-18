import {
  bookingSchema,
  hotelSchema,
  reviewSchema,
  roomSchema,
} from "../schema.js";
import expressError from "../utils/expressError.js";

export const validateHotel = (req, res, next) => {
  let { error } = hotelSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new expressError(400, msg);
  } else {
    next();
  }
};

export const validateRoom = (req, res, next) => {
  let { error } = roomSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new expressError(400, msg);
  } else {
    next();
  }
};

export const validateBooking = (req, res, next) => {
  let { error } = bookingSchema.validate(req.body);
  console.log(error);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new expressError(400, msg);
  } else {
    next();
  }
};

// export const validateReviews = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   console.log(error);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(", ");
//     throw new expressError(400, msg);
//   } else {
//     next();
//   }
// };
