import React from "react";
import { Link } from "react-router-dom";

const Box = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full">
        {/* New Scan Box */}

        <Link
          to={"/form"}
          className="flex-1 bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {/* Scanner Icon */}
            <div className="w-16 h-16 text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <path d="M12 12h.01" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
              New Scan
            </h2>
            <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
              Start a new medical scan
            </p>
          </div>
        </Link>

        {/* Patient History Box */}
        <Link
          to={"/patient"}
          className="flex-1 bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {/* Medical History Icon */}
            <div className="w-16 h-16 text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
              Patient History
            </h2>
            <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
              View patient medical records
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Box;