import Joi from "joi";

export const hotelSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  contact: Joi.number().required(),
  city: Joi.string().required(),
});

export const roomSchema = Joi.object({
  //   hotel: Joi.string().required(),
  roomType: Joi.string().required(),
  pricePerNight: Joi.number().required(),
  amenities: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  isAvailable: Joi.boolean().default(true),
});

export const bookingSchema = Joi.object({
  room: Joi.string().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().required(),
  guests: Joi.number().integer().min(1).required(),
  paymentMethod: Joi.string().default("Pay At Hotel"),
});

export const reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required(),
});
