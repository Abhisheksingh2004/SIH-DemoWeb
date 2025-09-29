import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';

const CreateBatch = () => {
  const [batchDetails, setBatchDetails] = useState({
    productType: '',
    quantity: '',
    harvestDate: '',
    location: '',
    description: '',
  });
  const [batchImage, setBatchImage] = useState(null);
  const [batchImagePreview, setBatchImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedBatchId, setGeneratedBatchId] = useState('');
  const [imageQualityRank, setImageQualityRank] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails({
      ...batchDetails,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBatchImage(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBatchImagePreview(reader.result);
        // Start image analysis after preview is loaded
        analyzeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (imageData) => {
    setIsAnalyzing(true);
    setImageQualityRank(null);

    // Simulating an API call to your model for image analysis
    // In a real application, you would send the image to your backend/API
    setTimeout(() => {
      // Simulate receiving a quality rank from the model (0-10)
      // This should be replaced with actual API call to your model
      const simulatedRank = Math.floor(Math.random() * 11);
      setImageQualityRank(simulatedRank);
      setIsAnalyzing(false);
    }, 2000); // Simulate a 2-second analysis
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const generateBatchId = () => {
    // This would normally be done server-side
    // Here, we're generating a random ID for demonstration
    const prefix = 'BAT';
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    const timestamp = new Date().getTime().toString().slice(-4);
    return `${prefix}${randomNum}${timestamp}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if image is uploaded
    if (!batchImage) {
      alert('Please upload an image of the batch');
      return;
    }

    // If the image is still being analyzed, wait for it to complete
    if (isAnalyzing) {
      alert('Please wait for image analysis to complete');
      return;
    }

    // Warn if image quality is very low
    if (imageQualityRank !== null && imageQualityRank < 3) {
      const proceed = window.confirm('The image quality is very low. Are you sure you want to proceed with this image?');
      if (!proceed) return;
    }

    // Generate a unique batch ID
    const newBatchId = generateBatchId();
    setGeneratedBatchId(newBatchId);

    // Show success state with QR code
    setShowSuccess(true);

    // In a real app, we'd save this to a database including the quality ranking
    console.log('Batch created with ID:', newBatchId, 'details:', batchDetails, 'quality ranking:', imageQualityRank);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left border-b pb-4">Create New Batch</h1>

        {!showSuccess ? (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Batch Image
                </label>
                <div className="flex flex-col items-center">
                  <div
                    className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition duration-150"
                    onClick={triggerFileInput}
                  >
                    {batchImagePreview ? (
                      <img
                        src={batchImagePreview}
                        alt="Batch preview"
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    ) : (
                      <>
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        <p className="mt-4 text-base text-gray-500">Click to upload batch image</p>
                        <p className="text-sm text-gray-400 mt-1">(JPEG, PNG, or JPG)</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleImageChange}
                  />
                  {batchImage && (
                    <p className="text-sm text-green-600 mt-2">
                      {batchImage.name} selected
                    </p>
                  )}

                  {isAnalyzing && (
                    <div className="mt-4 flex items-center justify-center py-2 px-4 bg-blue-50 rounded-lg border border-blue-100">
                      <svg className="animate-spin mr-3 h-6 w-6 text-[#75833F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-base font-medium text-blue-700">Analyzing image quality...</span>
                    </div>
                  )}

                  {imageQualityRank !== null && !isAnalyzing && (
                    <div className="mt-4 p-5 rounded-lg bg-gray-50 border shadow-sm w-full">
                      <h4 className="text-base font-semibold mb-3 border-b pb-2">Image Quality Analysis</h4>
                      <div className="flex items-center mb-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${imageQualityRank >= 7 ? 'bg-green-600' :
                              imageQualityRank >= 4 ? 'bg-yellow-500' : 'bg-red-600'
                              }`}
                            style={{ width: `${imageQualityRank * 10}%` }}
                          ></div>
                        </div>
                        <span className={`ml-4 text-lg font-bold ${imageQualityRank >= 7 ? 'text-green-600' :
                          imageQualityRank >= 4 ? 'text-yellow-500' : 'text-red-600'
                          }`}>
                          {imageQualityRank}/10
                        </span>
                      </div>
                      <p className={`text-sm font-medium ${imageQualityRank >= 7 ? 'text-green-600' :
                        imageQualityRank >= 4 ? 'text-yellow-500' : 'text-red-600'
                        }`}>
                        {imageQualityRank >= 7 ? 'Excellent quality' :
                          imageQualityRank >= 4 ? 'Average quality' : 'Poor quality - consider uploading a clearer image'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Type
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                    value={batchDetails.productType}
                    onChange={handleChange}
                  >
                    <option value="">Select product type</option>
                    <option value="wheat">Wheat</option>
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                    <option value="soybean">Soybean</option>
                    <option value="potato">Potato</option>
                    <option value="tomato">Tomato</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (kg)
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                    value={batchDetails.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                  />
                </div>

                <div>
                  <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Harvest Date
                  </label>
                  <input
                    id="harvestDate"
                    name="harvestDate"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                    value={batchDetails.harvestDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                    value={batchDetails.location}
                    onChange={handleChange}
                    placeholder="Enter harvest location"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#75833F] focus:border-[#75833F] shadow-sm"
                  value={batchDetails.description}
                  onChange={handleChange}
                  placeholder="Add details about this batch"
                ></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#75833F] !text-white font-bold rounded-lg hover:bg-[#5e6a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75833F] transition-colors shadow-md"
                >
                  CREATE BATCH
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center shadow-md">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold mt-6 mb-3">Batch Created Successfully!</h2>
              <p className="text-gray-600 text-lg mb-4">Your batch has been registered in the system.</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl text-[#75833F] mb-3 border-b pb-2">Batch ID</h3>
              <p className="text-2xl font-mono bg-gray-100 p-4 rounded-md my-2">{generatedBatchId}</p>
              <p className="text-sm text-gray-500 mt-3">Use this ID to track your batch</p>
            </div>

            {imageQualityRank !== null && (
              <div className="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl text-[#75833F] mb-4 border-b pb-2">Image Quality Analysis</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-4/5 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${imageQualityRank >= 7 ? 'bg-green-600' :
                        imageQualityRank >= 4 ? 'bg-yellow-500' : 'bg-red-600'
                        }`}
                      style={{ width: `${imageQualityRank * 10}%` }}
                    ></div>
                  </div>
                  <span className={`ml-4 text-2xl font-bold ${imageQualityRank >= 7 ? 'text-green-600' :
                    imageQualityRank >= 4 ? 'text-yellow-500' : 'text-red-600'
                    }`}>
                    {imageQualityRank}/10
                  </span>
                </div>
                <p className={`text-base font-medium ${imageQualityRank >= 7 ? 'text-green-600' :
                  imageQualityRank >= 4 ? 'text-yellow-500' : 'text-red-600'
                  }`}>
                  {imageQualityRank >= 7 ? 'Excellent Quality - This batch has high-quality imagery' :
                    imageQualityRank >= 4 ? 'Average Quality - Consider better lighting for future images' :
                      'Low Quality - We recommend uploading clearer images in the future'}
                </p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-bold text-xl text-[#75833F] mb-4 border-b pb-2">QR Code</h3>
              <div className="flex justify-center">
                <div className="w-56 h-56 border-2 border-gray-300 rounded-lg flex items-center justify-center shadow-md p-2 bg-white">
                  {/* This would be a real QR code in production */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${generatedBatchId}`}
                    alt="Batch QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">Scan this code to access batch details</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 focus:outline-none shadow-sm transition-colors"
              >
                CREATE ANOTHER BATCH
              </button>
              <button
                onClick={() => {
                  // In a real app, this would navigate to the trace batch page
                  window.location.href = '/trace-batch';
                }}
                className="px-6 py-3 bg-[#75833F] !text-white font-bold rounded-lg hover:bg-[#5e6a32] focus:outline-none shadow-sm transition-colors"
              >
                VIEW BATCH DETAILS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBatch;