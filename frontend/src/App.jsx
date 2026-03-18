import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetail from "./pages/RoomDetail";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwnerPage/Layout";
import Dashboard from "./pages/hotelOwnerPage/Dashboard";
import AddRoom from "./pages/hotelOwnerPage/AddRoom";
import ListRoom from "./pages/hotelOwnerPage/ListRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import About from "./pages/About";
import Experience from "./pages/Experience";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {/* {false && <HotelReg />} */}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
