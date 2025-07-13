import React, { useState } from "react";
import axios from "axios";
import PatientInfoPage from "./PatientInfo.jsx";

const PatientInfoContainer = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (patientId) => {
    if (!patientId) return;

    setIsLoading(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await axios.get(`http://localhost:3001/api/patients/search?query=${encodeURIComponent(patientId)}`);
      setSearchResult(res.data); // adjust if your backend wraps in { patient: {...} }
    } catch (error) {
      console.error(error);
      setSearchError("Patient not found or an error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PatientInfoPage
      onSearch={handleSearch}
      searchResult={searchResult}
      isLoading={isLoading}
      searchError={searchError}
    />
  );
};

export default PatientInfoContainer;