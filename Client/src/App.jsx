import React from 'react';
import Upload from './pages/Upload.jsx';
import Results from './pages/Result.jsx'; // Make sure this matches the actual exported component
import { Routes, Route } from 'react-router-dom';
import PatientIntakeForm from './pages/Start.jsx';


function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Results />} />
        <Route path="/" element={<PatientIntakeForm />} />
      </Routes>
      
    </div>
  );
}

export default App;