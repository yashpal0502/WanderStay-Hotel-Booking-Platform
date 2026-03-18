import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers, clerk will send these webhook in headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verifying Headers, wheather they are send by clerk or not
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting Data from request body
    // data-> contains user info from clerk
    // type-> tells what kind of event happened
    const { data, type } = req.body;
    console.log(data);

    // Switch Cases for different Events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          username: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }
    res.json({ success: true, message: "Webhook Received" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
