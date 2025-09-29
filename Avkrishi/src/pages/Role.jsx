import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Role = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { id: "farmer", name: "FARMER" },
    { id: "distributor", name: "DISTRIBUTOR" },
    { id: "retailer", name: "RETAILER" },
    { id: "wholesaler", name: "WHOLESALER" },
    { id: "trader", name: "TRADER" },
    { id: "other", name: "OTHER" }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleNext = () => {
    if (selectedRole) {
      // Store the selected role in localStorage for future use
      localStorage.setItem("userRole", selectedRole);
      // Navigate to home page after role selection
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-4xl font-bold mb-16">SELECT ROLE</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className={`py-6 px-8 rounded-lg text-xl font-bold bg-[#75833F] !text-white transform transition-all duration-200 ease-in-out ${selectedRole === role.id
              ? "scale-105 shadow-lg ring-2 ring-offset-2 ring-[#9fb15a]"
              : "hover:scale-105 hover:shadow-md hover:bg-[#5e6a32] cursor-pointer"
              }`}
          >
            {role.name}
          </button>
        ))}
      </div>

      <div className="mt-20 flex justify-end w-full max-w-3xl">
        <button
          onClick={handleNext}
          disabled={!selectedRole}
          className={`py-3 px-10 rounded-lg bg-[#75833F] !text-white font-bold text-xl transform transition-all duration-150 ease-in-out ${!selectedRole
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#5e6a32] hover:scale-105 hover:shadow-md cursor-pointer"
            }`}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
};

export default Role;