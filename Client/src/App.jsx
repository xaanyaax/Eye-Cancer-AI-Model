import React from 'react';
import Upload from './pages/Upload.jsx';
import Results from './pages/Result.jsx'; 
import { Routes, Route } from 'react-router-dom';
import PatientIntakeForm from './pages/Form.jsx';
import Navbar from './components/Navbar.jsx';
import PatientInfoContainer from './pages/PatientInfoContainer.jsx';
import Box from './pages/Home.jsx';



function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Results />} />
        <Route path="/form" element={<PatientIntakeForm />} />
        <Route path="/patient" element={<PatientInfoContainer />} />
        <Route path='/' element={<Box />} />
      </Routes>
      
    </div>
  );
}

export default App;


