import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] bg-gradient-to-r from-[#fe424d] to-[#e63a45] flex items-center justify-center mt-20">
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover our story, our values, and why we are passionate about
            creating the best experiences for you.
          </p>
        </div>
      </div>

      {/* About Story */}
      <div className="px-6 md:px-16 lg:px-28 py-16 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            className="w-full rounded-xl shadow-lg"
            src={assets.about_img}
            alt="About"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Our Journey
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We started with a simple idea – to connect travelers with unique,
              comfortable, and affordable stays that feel like home. With a
              commitment to quality and a passion for hospitality, we’ve grown
              into a platform trusted by thousands.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you’re on a business trip or a family vacation, our goal
              is to ensure that every stay you book with us is stress-free,
              comfortable, and memorable.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="px-6 md:px-16 lg:px-28 py-16 bg-slate-50 text-center">
        <Title
          title="ABOUT US"
          subTitle="Discover our story, values, and commitment to creating the best experiences."
        />

        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
          To create unforgettable experiences by providing the highest standard
          of service, comfort, and trust. We believe in making travel seamless
          and enjoyable while promoting a sense of belonging everywhere you go.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 md:px-16 lg:px-28 py-20">
        <Title
          title="WHY CHOOSE US"
          subTitle="Here’s what makes us stand out from the rest."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-white">
            <div className="text-[#fe424d] text-3xl mb-4">✔️</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Quality Assurance
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every stay is carefully verified for cleanliness, comfort, and
              authenticity so you can book with confidence.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-white">
            <div className="text-[#fe424d] text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Convenience
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From easy bookings to flexible options, our platform is designed
              to simplify your travel planning experience.
            </p>
          </div>

          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition bg-white">
            <div className="text-[#fe424d] text-3xl mb-4">💬</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Exceptional Support
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our customer support team is available round-the-clock to ensure
              your journey is smooth and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-slate-50 pt-10">
        <NewsLetter />
      </div>
    </div>
  );
};

export default About;
