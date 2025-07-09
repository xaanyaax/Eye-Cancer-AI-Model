import React from 'react';
import Home from './pages/Home.jsx';
import Results from './pages/Result.jsx'; // Make sure this matches the actual exported component
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
