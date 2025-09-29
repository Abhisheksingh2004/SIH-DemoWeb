import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import all profile images
import defaultProfile from "../assets/Profile/image.png";
import farmerProfile from "../assets/Profile/image1.png";
import distributorProfile from "../assets/Profile/image2.png";
import retailerProfile from "../assets/Profile/image3.png";
import wholesalerProfile from "../assets/Profile/image4.png";
import traderProfile from "../assets/Profile/image5.png";
import otherProfile from "../assets/Profile/image6.png";

const Header = () => {
  const [userRole, setUserRole] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfile);
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current route
  
  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === '/home' && location.pathname === '/') {
      return true; // Consider home active when on root path
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  useEffect(() => {
    // Get the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole.charAt(0).toUpperCase() + storedRole.slice(1));

      // Set profile image based on role
      switch (storedRole) {
        case "farmer":
          setProfileImage(farmerProfile);
          setUsername("Farmer Ravi");
          break;
        case "distributor":
          setProfileImage(distributorProfile);
          setUsername("Distributor Anand");
          break;
        case "retailer":
          setProfileImage(retailerProfile);
          setUsername("Retailer Priya");
          break;
        case "wholesaler":
          setProfileImage(wholesalerProfile);
          setUsername("Wholesaler Amit");
          break;
        case "trader":
          setProfileImage(traderProfile);
          setUsername("Trader Vikram");
          break;
        case "other":
          setProfileImage(otherProfile);
          setUsername("Farmer Sunita");
          break;
        default:
          setProfileImage(defaultProfile);
          setUsername("Guest User");
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-[#75833F] text-white py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* AVKRISHI Logo */}
          <Link to="/home" className="text-2xl font-bold text-white mr-6">AVKRISHI</Link>

          {/* Search input with white background - hide on smaller screens */}
          <div className="absolute left-100 hidden sm:block w-64 md:w-80">
            <div className="bg-white rounded-full p-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-10 pr-4 rounded-full !text-black focus:outline-none bg-white"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/home" 
              className={`font-bold text-lg px-4 py-2 rounded-md transition-colors ${
                isActive('/home') 
                  ? 'bg-white !text-black' 
                  : 'hover:bg-white/10'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-bold text-lg px-4 py-2 rounded-md transition-colors ${
                isActive('/dashboard') 
                  ? 'bg-white !text-black' 
                  : 'hover:bg-white/10'
              }`}
            >
              DASHBOARD
            </Link>
            <Link 
              to="/contact" 
              className={`font-bold text-lg px-4 py-2 rounded-md transition-colors ${
                isActive('/contact') 
                  ? 'bg-white !text-black' 
                  : 'hover:bg-white/10'
              }`}
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="group relative">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <p className="font-medium">{username}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
              <Link to="/" className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100">Sign out</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <div className="py-2">
            <Link 
              to="/home" 
              className={`block px-4 py-3 font-medium ${
                isActive('/home') 
                  ? 'bg-white !text-black font-bold shadow-sm' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/dashboard" 
              className={`block px-4 py-3 font-medium ${
                isActive('/dashboard') 
                  ? 'bg-white !text-black font-bold shadow-sm' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              DASHBOARD
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-3 font-medium ${
                isActive('/contact') 
                  ? 'bg-white !text-black font-bold shadow-sm' 
                  : 'text-gray-800 hover:bg-gray-50'
              }`}
            >
              CONTACT US
            </Link>
          </div>
          {/* Mobile Search Bar */}
          <div className="px-4 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full py-2 pl-10 pr-4 rounded-full text-black border border-gray-300 focus:outline-none focus:border-[#75833F]"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;