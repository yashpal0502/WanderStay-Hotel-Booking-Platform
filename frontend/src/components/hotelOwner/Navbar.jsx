import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all">
      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo_updated} alt="logo" className="h-13" />
        <div className="text-[#fe424d] text-3xl font-semibold">WanderStay</div>
      </Link>

      {/* User button from clerk */}

      <UserButton />
    </div>
  );
};

export default Navbar;
