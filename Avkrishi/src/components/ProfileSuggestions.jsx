import React from 'react';
import profile1 from "../assets/Profile/image1.png";
import profile2 from "../assets/Profile/image2.png";
import profile3 from "../assets/Profile/image3.png";
import profile4 from "../assets/Profile/image4.png";
import profile5 from "../assets/Profile/image5.png";
import profile6 from "../assets/Profile/image6.png";

const ProfileSuggestions = () => {
  // Sample profile data
  const profiles = [
    { id: 1, image: profile1, name: "Farmer Ravishakar", role: "Farmer", location: "Punjab" },
    { id: 2, image: profile2, name: "Wholesaler Dayadevi", role: "Wholesaler", location: "Delhi" },
    { id: 3, image: profile3, name: "Retailer Raman", role: "Retailer", location: "Mumbai" },
    { id: 4, image: profile4, name: "Distributor Anandi", role: "Distributor", location: "Bangalore" },
    { id: 5, image: profile5, name: "Trader Vikram", role: "Trader", location: "Chennai" },
    { id: 6, image: profile6, name: "Farmer Sunita", role: "Farmer", location: "Haryana" }
  ];

  const handleProfileClick = (profileId) => {
    // This would show more details or connect with the profile in a real app
    alert(`You clicked on profile ${profileId}. In a real app, this would show more details or allow you to connect.`);
  };

  return (
    <section>
      <h2 className="text-4xl font-bold mb-10">SUGGEST PROFILE</h2>
      <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center"
            onClick={() => handleProfileClick(profile.id)}
          >
            <div className="w-24 h-24 rounded-full cursor-pointer hover:opacity-80 transition-opacity overflow-hidden">
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 font-medium text-sm text-center">{profile.name}</p>
            <p className="text-xs text-gray-500 text-center">{profile.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


export default ProfileSuggestions;
