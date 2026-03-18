import React from "react";
import Title from "../components/Title";

const Experience = () => {
  const stats = [
    {
      value: "10+",
      label: "Years of building trust in the hospitality industry",
    },
    {
      value: "500+",
      label: "Satisfied guests who enjoyed their stay with us",
    },
    {
      value: "50+",
      label: "Hotels and partners working together for comfort",
    },
    {
      value: "1k+",
      label: "Authentic reviews shared by our happy customers",
    },
  ];

  return (
    <section className="w-full bg-white py-25 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Heading */}
        <Title
          title="Our Experience"
          subTitle="With every booking, we aim to create lasting memories. Over the years, we have partnered with trusted hotels and served thousands of guests with dedication and care."
          align="center"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#fe424d]">
                {stat.value}
              </h2>
              <p className="text-base text-gray-700 mt-3">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className="text-center text-lg text-gray-600 mt-8 max-w-3xl mx-auto">
          Every number tells a story of trust, comfort, and smiles. We look
          forward to welcoming you and being a part of your journey.
        </p>
      </div>
    </section>
  );
};

export default Experience;
