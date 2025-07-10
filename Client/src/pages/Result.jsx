import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();

    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location.state) {
            navigate("/");
            return;
        }
        setAnalysisResult(location.state);
        setLoading(false);
    }, [location.state, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-xl font-medium text-gray-700">Analyzing eye scan for cancer detection...</p>
                        <p className="text-gray-500 mt-2">Processing medical imagery with AI</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Eye Cancer Detection Results</h1>
                    <p className="text-gray-600">AI-powered analysis for ocular cancer screening</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <Link to="/">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Scan
                        </button>
                    </Link>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Overlayed Image */}
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Overlayed Image</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={`data:image/png;base64,${analysisResult.maskedImage?.base64}`}
                                alt="Overlayed"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Masked Image */}
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Masked Image</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={`data:image/png;base64,${analysisResult.processedImage?.base64}`}
                                alt="Masked"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Original Image */}
                    <div className="bg-white rounded-xl shadow-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Original Image</h3>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={`data:image/png;base64,${analysisResult.originalImage?.base64}`}
                                alt="Original"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Result Summary</h2>
                    <div className="text-lg text-gray-700 space-y-2">
                        <p><span className="font-medium">Prediction:</span> {analysisResult.cancerDetected ? "Yes" : "No"}</p>
                        <p><span className="font-medium">Probability:</span> {(analysisResult.cancerProbability * 100).toFixed(2)}%</p>
                        <p><span className="font-medium">Message:</span> {analysisResult.message}</p>
                        <p><span className="font-medium">Success:</span> {analysisResult.success ? "True" : "False"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}