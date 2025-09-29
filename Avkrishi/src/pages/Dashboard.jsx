import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [activeFilter, setActiveFilter] = useState("monthly");
  const [activeDateRange, setActiveDateRange] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCrop, setSelectedCrop] = useState("All Crops");

  useEffect(() => {
    // Get the user role from localStorage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      // Capitalize first letter of the role for display
      setUserRole(storedRole.charAt(0).toUpperCase() + storedRole.slice(1));
    }
  }, []);

  // Chart data for line chart
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Crop Yield 2023",
        data: [120, 190, 230, 250, 220, 330, 290, 320, 350, 290, 270, 310],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Crop Yield 2022",
        data: [100, 170, 200, 220, 200, 290, 260, 290, 310, 260, 250, 280],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // Chart options for line chart
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Yield (tons)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      }
    },
  };

  // Chart data for bar chart
  const barChartData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [
      {
        label: "Production (tons)",
        data: [650, 590, 800, 810, 560],
        backgroundColor: [
          "rgba(76, 175, 80, 0.7)",
          "rgba(33, 150, 243, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(156, 39, 176, 0.7)",
          "rgba(244, 67, 54, 0.7)"
        ],
      },
    ],
  };

  // Chart options for bar charts
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} tons`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Production (tons)'
        }
      }
    }
  };

  // Chart data for crop comparison
  const cropComparisonData = {
    labels: ["Rice", "Wheat", "Cotton", "Sugarcane", "Pulses"],
    datasets: [
      {
        label: "2023 Production",
        data: [850, 750, 500, 920, 620],
        backgroundColor: "rgba(76, 175, 80, 0.7)",
      },
      {
        label: "2022 Production",
        data: [800, 690, 480, 880, 580],
        backgroundColor: "rgba(33, 150, 243, 0.7)",
      }
    ],
  };

  // Chart data for doughnut chart
  const doughnutData = {
    labels: ["Rice", "Wheat", "Cotton", "Sugarcane", "Pulses"],
    datasets: [
      {
        data: [25, 20, 15, 25, 15],
        backgroundColor: [
          "rgba(76, 175, 80, 0.7)",
          "rgba(33, 150, 243, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(156, 39, 176, 0.7)",
          "rgba(244, 67, 54, 0.7)",
        ],
        borderColor: [
          "rgba(76, 175, 80, 1)",
          "rgba(33, 150, 243, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(156, 39, 176, 1)",
          "rgba(244, 67, 54, 1)",
        ],
        borderWidth: 1
      },
    ],
  };

  // Chart options for doughnut chart
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  // Chart data for pie chart
  const pieData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: [
          "rgba(76, 175, 80, 0.7)",
          "rgba(33, 150, 243, 0.7)",
          "rgba(255, 193, 7, 0.7)",
          "rgba(156, 39, 176, 0.7)",
          "rgba(244, 67, 54, 0.7)",
        ],
        borderColor: [
          "rgba(76, 175, 80, 1)",
          "rgba(33, 150, 243, 1)",
          "rgba(255, 193, 7, 1)",
          "rgba(156, 39, 176, 1)",
          "rgba(244, 67, 54, 1)",
        ],
        borderWidth: 1
      },
    ],
  };

  // Chart options for pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center sm:text-left">DASHBOARD</h1>

        {/* Filter Section */}
        <div className="mb-8 bg-white p-5 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option>All Regions</option>
                <option>North India</option>
                <option>South India</option>
                <option>East India</option>
                <option>West India</option>
                <option>Central India</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
              <select
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option>All Crops</option>
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
                <option>Pulses</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeFilter === "weekly" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveFilter("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeFilter === "monthly" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveFilter("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeFilter === "yearly" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveFilter("yearly")}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="flex rounded-md overflow-hidden border border-gray-300">
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeDateRange === "all" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveDateRange("all")}
                >
                  All Time
                </button>
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeDateRange === "year" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveDateRange("year")}
                >
                  This Year
                </button>
                <button
                  className={`flex-1 px-3 py-2.5 text-sm font-medium ${activeDateRange === "month" ? "bg-green-600 text-white" : "bg-white text-gray-700"} transition-colors duration-150`}
                  onClick={() => setActiveDateRange("month")}
                >
                  This Month
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts Section - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Crop Yield Trends</h2>
              <div className="bg-white rounded-md h-80">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>


            {/* Data Table */}
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Recent Data</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield (tons)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {["North India", "South India", "East India", "West India", "Central India"][item % 5]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {["Rice", "Wheat", "Cotton", "Sugarcane", "Pulses"][item % 5]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.floor(Math.random() * 500) + 100}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {`2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item % 3 === 0 ? "bg-green-100 text-green-800" :
                          item % 3 === 1 ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                          {item % 3 === 0 ? "Excellent" : item % 3 === 1 ? "Good" : "Average"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Charts - Takes 1 column */}
          <div className="space-y-8">
            {/* Donut Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Crop Distribution</h2>
              <div className="bg-white rounded-md h-80 flex items-center justify-center">
                <div className="w-64">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </div>
            </div>


            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Key Metrics</h2>
              <div className="space-y-5 mt-4">
                <div className="bg-green-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-700">Total Yield</span>
                    <span className="text-lg font-bold text-green-700">25,482 tons</span>
                  </div>
                  <div className="h-2.5 w-full bg-green-200 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full rounded-full" style={{ width: "84%" }}></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-blue-700">Harvest Rate</span>
                    <span className="text-lg font-bold text-blue-700">76%</span>
                  </div>
                  <div className="h-2.5 w-full bg-blue-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: "76%" }}></div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-yellow-700">Growth Rate</span>
                    <span className="text-lg font-bold text-yellow-700">12.4%</span>
                  </div>
                  <div className="h-2.5 w-full bg-yellow-200 rounded-full overflow-hidden">
                    <div className="bg-yellow-600 h-full rounded-full" style={{ width: "62%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Role Specific Content */}
      {userRole && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-6 border-b pb-3">{userRole} Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 border border-green-100 rounded-lg bg-green-50 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold mb-3 text-green-700">24</div>
                <div className="text-sm font-medium text-gray-600">Active Batches</div>
              </div>
              <div className="p-5 border border-blue-100 rounded-lg bg-blue-50 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold mb-3 text-blue-700">142</div>
                <div className="text-sm font-medium text-gray-600">Total Transactions</div>
              </div>
              <div className="p-5 border border-yellow-100 rounded-lg bg-yellow-50 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold mb-3 text-yellow-700">₹24,500</div>
                <div className="text-sm font-medium text-gray-600">Revenue This Month</div>
              </div>
              <div className="p-5 border border-purple-100 rounded-lg bg-purple-50 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold mb-3 text-purple-700">18</div>
                <div className="text-sm font-medium text-gray-600">Connected Partners</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-4 border-b pb-2">Recent Activity</h2>
              <ul className="space-y-5 mt-4">
                <li className="border-b border-gray-100 pb-3 flex justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Batch #A12345 created</div>
                    <div className="text-sm text-gray-600 mt-1">Today, 10:23 AM</div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    New
                  </span>
                </li>
                <li className="border-b border-gray-100 pb-3 flex justify-between">
                  <div>
                    <div className="font-medium text-gray-800">Transaction completed with Distributor XYZ</div>
                    <div className="text-sm text-gray-600 mt-1">Yesterday, 4:45 PM</div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Complete
                  </span>
                </li>
                <li className="border-b border-gray-100 pb-3">
                  <div className="font-medium text-gray-800">Profile information updated</div>
                  <div className="text-sm text-gray-600 mt-1">Sept 28, 2:30 PM</div>
                </li>
                <li>
                  <div className="font-medium text-gray-800">New connection request from Retailer ABC</div>
                  <div className="text-sm text-gray-600 mt-1">Sept 27, 11:15 AM</div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-4 border-b pb-2">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-5 mt-4">
                <button className="p-4 bg-green-50 border border-green-100 rounded-lg hover:bg-green-100 transition-colors shadow-sm flex flex-col items-center justify-center">
                  <div className="font-medium text-green-800 mb-1">Create Batch</div>
                  <div className="text-sm text-green-600">Add a new batch</div>
                </button>
                <button className="p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors shadow-sm flex flex-col items-center justify-center">
                  <div className="font-medium text-blue-800 mb-1">Trace Batch</div>
                  <div className="text-sm text-blue-600">Track existing batch</div>
                </button>
                <button className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg hover:bg-yellow-100 transition-colors shadow-sm flex flex-col items-center justify-center">
                  <div className="font-medium text-yellow-800 mb-1">Add Partner</div>
                  <div className="text-sm text-yellow-600">Connect with partners</div>
                </button>
                <button className="p-4 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors shadow-sm flex flex-col items-center justify-center">
                  <div className="font-medium text-purple-800 mb-1">Analytics</div>
                  <div className="text-sm text-purple-600">View detailed reports</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;