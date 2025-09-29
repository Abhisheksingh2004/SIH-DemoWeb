import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProfileSuggestions from "../components/ProfileSuggestions";

function Home() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Get the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      // Capitalize first letter of the role for display
      setUserRole(storedRole.charAt(0).toUpperCase() + storedRole.slice(1));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* BATCH section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-10">BATCH</h2>
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            <Link to="/create-batch" className="px-8 py-4 bg-gray-300 rounded-lg font-bold text-xl hover:bg-gray-400 transition-colors">
              CREATE BATCH
            </Link>
            <Link to="/trace-batch" className="px-8 py-4 bg-gray-300 rounded-lg font-bold text-xl hover:bg-gray-400 transition-colors">
              TRACE BATCH
            </Link>
          </div>
        </section>

        {/* SUGGEST PROFILE section */}
        <ProfileSuggestions />

        {/* Role-based content (hidden by default, can be toggled) */}
        <div className="hidden mt-16">
          <h2 className="text-2xl font-semibold text-[#75833F] mb-4">{userRole} Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRole === "Farmer" && (
              <>
                <div className="p-4 border rounded-lg bg-green-50">
                  <h3 className="font-medium mb-2">Crop Management</h3>
                  <p className="text-sm text-gray-600">Manage your crops and get personalized recommendations</p>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h3 className="font-medium mb-2">Weather Forecast</h3>
                  <p className="text-sm text-gray-600">Get real-time weather updates for your farm</p>
                </div>
              </>
            )}

            {(userRole === "Distributor" || userRole === "Wholesaler") && (
              <>
                <div className="p-4 border rounded-lg bg-orange-50">
                  <h3 className="font-medium mb-2">Supply Chain</h3>
                  <p className="text-sm text-gray-600">Track your supply chain and manage logistics</p>
                </div>
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h3 className="font-medium mb-2">Inventory Management</h3>
                  <p className="text-sm text-gray-600">Manage your inventory and stock levels</p>
                </div>
              </>
            )}

            {userRole === "Retailer" && (
              <>
                <div className="p-4 border rounded-lg bg-purple-50">
                  <h3 className="font-medium mb-2">Point of Sale</h3>
                  <p className="text-sm text-gray-600">Manage your sales and customer data</p>
                </div>
                <div className="p-4 border rounded-lg bg-indigo-50">
                  <h3 className="font-medium mb-2">Customer Analytics</h3>
                  <p className="text-sm text-gray-600">Analyze customer behavior and preferences</p>
                </div>
              </>
            )}

            {userRole === "Trader" && (
              <>
                <div className="p-4 border rounded-lg bg-red-50">
                  <h3 className="font-medium mb-2">Market Insights</h3>
                  <p className="text-sm text-gray-600">Get real-time market prices and trends</p>
                </div>
                <div className="p-4 border rounded-lg bg-teal-50">
                  <h3 className="font-medium mb-2">Trade Analytics</h3>
                  <p className="text-sm text-gray-600">Analyze trade patterns and opportunities</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;