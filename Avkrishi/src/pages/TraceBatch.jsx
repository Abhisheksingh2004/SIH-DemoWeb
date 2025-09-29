import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Html5Qrcode } from 'html5-qrcode';

const TraceBatch = () => {
  const [batchId, setBatchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  // Mock data for demonstration
  const batchHistory = [
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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (batchId) {
      processSearch(batchId);
    }
  };

  useEffect(() => {
    let html5QrCode;

    if (scannerActive && scannerRef.current) {
      html5QrCode = new Html5Qrcode('qr-reader');

      const qrCodeSuccessCallback = (decodedText) => {
        console.log(`Code scanned: ${decodedText}`);
        setBatchId(decodedText);
        setScanResult(decodedText);
        html5QrCode.stop().then(() => {
          setScannerActive(false);
          processSearch(decodedText);
        }).catch(err => console.error('Error stopping scanner:', err));
      };

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (errorMessage) => {
          // QR Code scanning error. Don't need to show this to user.
          console.error(`QR scan error: ${errorMessage}`);
        }
      ).catch((err) => {
        console.error(`QR scanner start error: ${err}`);
      });
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error('Error stopping scanner on cleanup:', err));
      }
    };
  }, [scannerActive]);

  const processSearch = (id) => {
    setLoading(true);

    // In a real app, you would fetch the batch data from an API here
    // For now, let's simulate a brief loading period
    setTimeout(() => {
      // Mock batch data to pass to the details page
      const batchData = {
        batchId: id,
        product: 'Wheat',
        origin: 'Punjab, India',
        creationDate: 'August 15, 2025',
        quantity: '500 kg',
        currentStatus: 'In Retail',
        batchHistory: batchHistory
      };

      // Navigate to the details page with the batch data
      navigate(`/batch-details/${id}`, { state: { batchData } });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Trace Batch</h1>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg shadow-md" role="group">
              <button
                type="button"
                className={`px-6 py-3 text-base font-medium rounded-l-lg transition-colors ${!scannerActive ? 'bg-[#75833F] !text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => setScannerActive(false)}
              >
                Manual Entry
              </button>
              <button
                type="button"
                className={`px-6 py-3 text-base font-medium rounded-r-lg transition-colors ${scannerActive ? 'bg-[#75833F] !text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                onClick={() => setScannerActive(true)}
              >
                QR Batch Scanner
              </button>
            </div>
          </div>

          {!scannerActive ? (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 items-end">
              <div className="flex-grow">
                <label htmlFor="batchId" className="block text-base font-medium text-gray-700 mb-2">
                  Enter Batch ID
                </label>
                <input
                  id="batchId"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                  placeholder="e.g., BAT12345"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#75833F] !text-white font-bold rounded-lg hover:bg-[#5e6a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75833F] shadow-md transition-colors"
                  disabled={loading}
                >
                  {loading ? 'LOADING...' : 'TRACE'}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center">
              <p className="mb-5 text-base text-gray-700">Position QR code in front of camera to scan</p>
              <div
                ref={scannerRef}
                id="qr-reader"
                className="w-full max-w-md mb-5 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shadow-inner bg-gray-50"
                style={{ height: '320px' }}
              >
                {/* HTML5 QR scanner will render here */}
              </div>
              {scanResult && (
                <div className="my-4 py-3 px-5 bg-green-50 text-green-700 rounded-lg border border-green-200 w-full max-w-md text-center">
                  <p className="text-base font-medium">
                    Detected: <span className="font-bold">{scanResult}</span>
                  </p>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-2">Make sure the QR code is well-lit and clearly visible</p>
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="flex items-center justify-center mb-3">
              <svg className="animate-spin h-8 w-8 text-[#75833F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-lg text-gray-700">Searching for batch data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraceBatch;