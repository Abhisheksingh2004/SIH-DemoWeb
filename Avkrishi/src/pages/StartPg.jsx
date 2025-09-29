import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo1.png';

export default function StartPg() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="Farmer Logo"
          className="w-50 h-50"
        />
      </div>

      {/* Button */}
      <button
        className="mt-6 px-8 py-3 rounded-lg bg-[#75833F] !text-white font-bold text-lg hover:bg-[#5e6a32]"
        onClick={handleGetStarted}
      >
        GET STARTED
      </button>
    </div>
  );
}
