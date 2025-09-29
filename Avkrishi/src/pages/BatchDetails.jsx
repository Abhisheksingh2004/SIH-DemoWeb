import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const BatchDetails = () => {
  const { batchId } = useParams();
  const location = useLocation();
  const batchData = location.state?.batchData;
  const [loading, setLoading] = useState(true);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [receiverUsername, setReceiverUsername] = useState('');
  const [price, setPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    // In a real application, you would fetch the batch data based on the batchId
    // For now, we're using the passed data or setting a timeout to simulate loading
    if (batchData) {
      setLoading(false);
    } else {
      // Simulate loading when no data is passed
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [batchData, batchId]);

  // Mock data (used if no data is passed from previous page)
  const defaultBatchData = {
    batchId: batchId || 'BAT12345',
    product: 'Wheat',
    origin: 'Punjab, India',
    creationDate: 'August 15, 2025',
    quantity: '500 kg',
    currentStatus: 'In Retail',
    batchHistory: [
      {
        id: 1,
        stage: "Farming",
        location: "Farm in Punjab",
        date: "2025-08-15",
        handler: "John Doe (Farmer)",
        details: "Harvested wheat crop"
      },
      {
        id: 2,
        stage: "Processing",
        location: "Processing Center, Delhi",
        date: "2025-08-20",
        handler: "ABC Processing Ltd",
        details: "Cleaned and packaged"
      },
      {
        id: 3,
        stage: "Distribution",
        location: "Distribution Hub, Mumbai",
        date: "2025-08-25",
        handler: "XYZ Distribution Co",
        details: "Received and shipped to retailers"
      },
      {
        id: 4,
        stage: "Retail",
        location: "Super Market, Bangalore",
        date: "2025-08-30",
        handler: "Super Market Chain",
        details: "Received for retail sale"
      }
    ]
  };

  const displayData = batchData || defaultBatchData;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="text-xl">Loading batch details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Batch Details</h1>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-[#75833F] mb-6 border-b pb-3">Batch Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Batch ID</p>
              <p className="font-medium text-lg mt-1">{displayData.batchId}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Product</p>
              <p className="font-medium text-lg mt-1">{displayData.product}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Origin</p>
              <p className="font-medium text-lg mt-1">{displayData.origin}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Creation Date</p>
              <p className="font-medium text-lg mt-1">{displayData.creationDate}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Quantity</p>
              <p className="font-medium text-lg mt-1">{displayData.quantity}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow">
              <p className="text-sm font-medium text-gray-500">Current Status</p>
              <p className="font-medium text-lg mt-1 text-green-600">{displayData.currentStatus}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-[#75833F] mb-6 border-b pb-3">Batch Journey</h2>

          <div className="relative">
            {displayData.batchHistory.map((step, index) => (
              <div key={step.id} className="mb-10 flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-8 h-8 rounded-full bg-[#75833F] text-white flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                  {index < displayData.batchHistory.length - 1 && (
                    <div className="h-full w-0.5 bg-[#75833F] my-1"></div>
                  )}
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm flex-grow border-l-4 border-[#75833F]">
                  <h3 className="font-semibold text-lg text-[#75833F] mb-1">{step.stage}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-3">{step.date}</p>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <p className="font-medium">Location: <span className="font-normal text-gray-700">{step.location}</span></p>
                    <p className="font-medium">Handler: <span className="font-normal text-gray-700">{step.handler}</span></p>
                    <p className="font-medium">Details: <span className="font-normal text-gray-700">{step.details}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="px-8 py-3 bg-[#75833F] !text-white font-bold rounded-lg hover:bg-[#5e6a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75833F] shadow-md transition-all transform hover:scale-105"
            onClick={() => setShowLinkModal(true)}
          >
            ADD LINK
          </button>
        </div>

        {/* Link Receiver Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-[#75833F] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">LINK RECEIVER</h2>

              <div className="bg-gray-200 p-6 rounded-lg">
                <div className="mb-5">
                  <p className="font-bold text-gray-800 text-sm mb-1">SENDER USERNAME</p>
                  <p className="text-gray-700 bg-white px-4 py-3 rounded-md">Your Username</p>
                </div>

                <div className="mb-4">
                  <p className="font-bold text-gray-800 mb-1">RECEIVER USERNAME:</p>
                  <input
                    type="text"
                    value={receiverUsername}
                    onChange={(e) => setReceiverUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-none rounded-md focus:outline-none"
                    placeholder="7899879"
                  />
                </div>

                <div className="mb-4">
                  <p className="font-bold text-gray-800 mb-1">PRICE:</p>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-none rounded-md focus:outline-none"
                    placeholder="89899"
                  />
                </div>

                <div className="mb-4">
                  <p className="font-bold text-gray-800 mb-1">PAYMENT METHOD:</p>
                  <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-none rounded-md focus:outline-none"
                    placeholder="9909009"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    // Handle confirmation logic here
                    alert(`Link created with ${receiverUsername} for ${price}`);
                    setShowLinkModal(false);
                  }}
                  className="px-8 py-3 bg-[#75833F] !text-white font-bold rounded-md hover:bg-[#5e6a32] focus:outline-none uppercase"
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetails;