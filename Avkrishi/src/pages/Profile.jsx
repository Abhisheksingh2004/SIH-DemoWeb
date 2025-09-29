import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import defaultProfile from "../assets/Profile/image.png";
import farmerProfile from "../assets/Profile/image1.png";
import distributorProfile from "../assets/Profile/image2.png";
import retailerProfile from "../assets/Profile/image3.png";
import wholesalerProfile from "../assets/Profile/image4.png";
import traderProfile from "../assets/Profile/image5.png";
import otherProfile from "../assets/Profile/image6.png";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    id: '123456',
    username: 'farmer_john',
    name: 'John Doe',
    role: 'Farmer',
    location: 'Punjab, India',
    contact: '+91 98765 43210',
    email: 'john.doe@example.com'
  });
  const [profileImage, setProfileImage] = useState(defaultProfile);

  useEffect(() => {
    // Get the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      // Set profile data based on role
      let userData = {
        ...profileData,
        role: storedRole.charAt(0).toUpperCase() + storedRole.slice(1)
      };

      // Set profile image based on role
      switch (storedRole) {
        case "farmer":
          setProfileImage(farmerProfile);
          userData.name = "Ravi Kumar";
          userData.username = "farmer_ravi";
          break;
        case "distributor":
          setProfileImage(distributorProfile);
          userData.name = "Anand Verma";
          userData.username = "dist_anand";
          break;
        case "retailer":
          setProfileImage(retailerProfile);
          userData.name = "Priya Sharma";
          userData.username = "retailer_priya";
          break;
        case "wholesaler":
          setProfileImage(wholesalerProfile);
          userData.name = "Amit Singh";
          userData.username = "wholesaler_amit";
          break;
        case "trader":
          setProfileImage(traderProfile);
          userData.name = "Vikram Patel";
          userData.username = "trader_vikram";
          break;
        case "other":
          setProfileImage(otherProfile);
          userData.name = "Sunita Devi";
          userData.username = "farmer_sunita";
          break;
        default:
          setProfileImage(defaultProfile);
      }

      setProfileData(userData);
    }
  }, []);

  // Mock data for trace history
  const traceHistory = [
    {
      id: 'BAT123456',
      product: 'Wheat',
      date: '2025-09-01',
      status: 'In Retail'
    },
    {
      id: 'BAT789012',
      product: 'Rice',
      date: '2025-08-15',
      status: 'Sold'
    },
    {
      id: 'BAT345678',
      product: 'Corn',
      date: '2025-07-22',
      status: 'In Processing'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - Profile info */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200?text=Profile";
                  }}
                />
              </div>

              <div className="text-center">
                <h2 className="font-bold text-xl">PROFILE ID:</h2>
                <p className="font-bold text-xl">{profileData.id}</p>
                <h2 className="font-bold text-xl mt-2">USERNAME:</h2>
                <p className="font-bold text-xl">{profileData.username}</p>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="w-full md:w-3/4">
            <div className="bg-gray-200 p-8 rounded-lg min-h-[300px]">
              <h1 className="text-2xl font-bold mb-8">DETAILS</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="font-medium text-gray-600">Name</p>
                  <p className="font-bold text-lg">{profileData.name}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Role</p>
                  <p className="font-bold text-lg">{profileData.role}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Location</p>
                  <p className="font-bold text-lg">{profileData.location}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Contact</p>
                  <p className="font-bold text-lg">{profileData.contact}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-600">Email</p>
                  <p className="font-bold text-lg">{profileData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trace History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">YOUR TRACE</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-300">
            {traceHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-200 p-8 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/batch-details/${item.id}`}
              >
                <h3 className="font-bold mb-2 text-lg">{item.product}</h3>
                <p className="text-gray-600 mb-1">Batch ID: {item.id}</p>
                <p className="text-gray-600 mb-1">Date: {item.date}</p>
                <p className="font-medium text-[#75833F]">Status: {item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;