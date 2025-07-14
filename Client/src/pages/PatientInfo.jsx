import React, { useState } from "react";

const PatientInfoPage = ({ 
  onSearch, 
  searchResult, 
  isLoading, 
  searchError 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);

  // Use props for patient data
  const patient = searchResult;
  const loading = isLoading;
  const error = searchError;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setSearched(true);
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSearched(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for patient...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Search Bar Section */}
        <div className="bg-white border-b border-gray-200 pb-6 mb-8">

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Enter Patient ID "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Search
            </button>
            {searched && (
              <button
                onClick={resetSearch}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-500 text-lg">!</span>
              </div>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Patient Information - Only show if patient found */}
        {patient && (
          <>
            {/* Patient Information Header */}
            <div className="bg-white border-b border-gray-200 pb-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Patient Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Patient ID: {patient.patientId}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Print Report
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.fullName || "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {formatDate(patient.dateOfBirth)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                        {calculateAge(patient.dateOfBirth)} years
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.gender || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.phoneNumber || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Medical Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Eye Side
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.eyeSide || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Family History of Cancer
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.familyHistoryOfCancer || "No"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Diagnosis
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.previousDiagnosis || "No previous diagnosis recorded"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ongoing Treatments
                    </label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {patient.ongoingTreatments || "No ongoing treatments"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Scans */}
{Array.isArray(patient.predictionResults) && patient.predictionResults.length > 0 && (
  <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">
      Previous Scans
    </h3>
    <div className="space-y-6">
      {patient.predictionResults.map((scan, idx) => (
        <div key={scan._id || idx} className="border p-4 rounded-md shadow-sm bg-gray-50">
          <p className="text-gray-800 font-medium mb-2">
            Scan #{idx + 1} - {new Date(scan.createdAt).toLocaleString()}
          </p>

          <p className="mb-2">
            <strong>Prediction:</strong>{" "}
            {scan.classification_prediction === 0 ? "Benign" : "Malignant"}
          </p>

          <p className="mb-2">
            <strong>Probabilities:</strong>{" "}
            {scan.classification_probabilities.map((p, i) => (
              <span key={i}>
                {i === 0 ? "Benign" : "Malignant"}: {(p * 100).toFixed(2)}%
                {i === 0 ? " | " : ""}
              </span>
            ))}
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            {/* Original Image */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Original Image</p>
              <img
                src={`data:image/jpeg;base64,${scan.original_image_base64}`}
                alt="Original"
                className="w-48 h-48 object-contain border rounded"
              />
            </div>

            {/* Segmentation Mask */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Segmentation Mask</p>
              <img
                src={`data:image/png;base64,${scan.segmentation_mask_base64}`}
                alt="Mask"
                className="w-48 h-48 object-contain border rounded"
              />
            </div>

            {/* Overlay Image */}
            {/* Segmentation Mask */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Segmentation Mask</p>
              <img
                src={`data:image/png;base64,${scan.overlay_image_base64}`}
                alt="Mask"
                className="w-48 h-48 object-contain border rounded"
              />
            </div>



          </div>
        </div>
      ))}
    </div>
  </div>
)}


            {/* Record Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Record Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Record Created
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {formatDate(patient.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Updated
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {formatDate(patient.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sample Patient IDs for testing */}
        {!searched && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Enter a Patient ID to search for patient information
            </h4>
            <p className="text-blue-800 text-sm">
              Use the search bar above to find patient records by their unique Patient ID.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientInfoPage;