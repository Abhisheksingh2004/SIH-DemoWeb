import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo1.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3">
            <img src={logo} alt="Avkrishi Logo" className="h-10" />
            <span className="font-bold text-xl text-[#75833F]">Avkrishi</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-600 hover:text-[#75833F]">Home</Link>
            <Link to="/home" className="text-gray-600 hover:text-[#75833F]">Services</Link>
            <Link to="/home" className="text-gray-600 hover:text-[#75833F]">Community</Link>
            <Link to="/home" className="text-gray-600 hover:text-[#75833F]">Resources</Link>
            <Link to="/home" className="text-gray-600 hover:text-[#75833F]">Contact</Link>
            <Link to="/" className="bg-[#75833F] text-white px-4 py-2 rounded-md hover:bg-[#5e6a32]">
              Logout
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-[#75833F] focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#75833F] hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#75833F] hover:bg-gray-50"
            >
              Services
            </Link>
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#75833F] hover:bg-gray-50"
            >
              Community
            </Link>
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#75833F] hover:bg-gray-50"
            >
              Resources
            </Link>
            <Link
              to="/home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#75833F] hover:bg-gray-50"
            >
              Contact
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium bg-[#75833F] text-white"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;