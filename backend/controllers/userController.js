import { wrapAsync } from "../utils/wrapAsync.js";

// GET /api/user

export const getUserData = wrapAsync(async (req, res) => {
  // clerk has already attached the logged-in user in request body
  const role = req.user.role;
  const recentSearchedCities = req.user.recentSearchedCities;
  res.json({ success: true, role, recentSearchedCities });
});

// Store user recent searched cities

export const storeRecentSearchedCities = wrapAsync(async (req, res) => {
  // get city from req body
  const { recentSearchedCity } = req.body;
  // get logged-in user
  const user = await req.user;

  if (user.recentSearchedCities.length < 3) {
    user.recentSearchedCities.push(recentSearchedCity);
  } else {
    user.recentSearchedCities.shift(); // remove oldest city
    user.recentSearchedCities.push(recentSearchedCity); // add new city
  }
  await user.save();
  res.json({ success: true, message: "City added" });
});
