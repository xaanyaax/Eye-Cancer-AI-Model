import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function PatientIntakeForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    familyHistoryOfCancer: "",
    previousDiagnosis: "",
    ongoingTreatments: "",
    eyeSide: "", // Changed to single string instead of array
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEyeSideChange = (side) => {
    setFormData((prev) => ({
      ...prev,
      eyeSide: side, // Only set one value at a time
    }));
    
    // Clear error when user selects
    if (errors.eyeSide) {
      setErrors((prev) => ({
        ...prev,
        eyeSide: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.eyeSide) {
      newErrors.eyeSide = "Please select the affected eye(s)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    alert("❌ Please fill in all required fields before submitting!");
    const firstErrorField = document.querySelector('.border-red-500');
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  setIsSubmitting(true);

  try {
    // ✅ Send form data to backend
    const response = await axios.post("http://localhost:3001/api/users", formData);
    
    console.log("✅ MongoDB saved:", response.data);

    // ✅ Navigate to /upload and pass form data
    navigate("/upload", { state: formData });

    alert("✅ Patient information submitted successfully!");

    // ✅ Reset form
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      address: "",
      familyHistoryOfCancer: "",
      previousDiagnosis: "",
      ongoingTreatments: "",
      eyeSide: "",
    });
    
  } catch (error) {
    console.error("❌ MongoDB Validation error:", error.response?.data || error.message);
    alert(`❌ Submission failed: ${error.response?.data?.message || 'See console'}`);
  }
   finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-white">
      {/* Header with images */}
      <div className="bg-blue-50 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <a href="#">
              <img
                src="https://i.ibb.co/zWxnNsb5/image.png"
                alt="image"
                border="0"
                className="w-20 h-20 rounded-lg object-cover shadow-sm"
              />
            </a>

            <div className="ml-4 flex flex-col items-center justify-center px-73">
              <h1 className="text-2xl font-bold text-blue-900 ">
                Eye Cancer Detection Center
              </h1>
              <p className="text-blue-700 text-sm">
                Advanced Diagnostic Service
              </p>
            </div>
          </div>
          <img src="https://i.ibb.co/ksLCzDFX/image.png" alt="image" border="0" className="w-20 h-20 rounded-lg object-cover shadow-sm"/>
         
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white shadow-lg rounded-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Patient Information Form
            </h2>
            <p className="text-gray-600">
              Please provide accurate information for proper diagnosis and
              treatment planning.
            </p>
          </div>

          <div className="px-8 py-6 space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600">{errors.fullName}</p>
                )}
                <p className="text-xs text-gray-500">
                  For patient identification and reports
                </p>
              </div>

              {/* Date of Birth and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.dateOfBirth ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-600">{errors.dateOfBirth}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Age-based diagnosis insights
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.gender ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-sm text-red-600">{errors.gender}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Some conditions are gender-prevalent
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
                <p className="text-xs text-gray-500">For reminders or contact</p>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.address ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* Family History */}
              <div className="space-y-2">
                <label
                  htmlFor="familyHistoryOfCancer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Family History of Cancer
                </label>
                <textarea
                  id="familyHistoryOfCancer"
                  name="familyHistoryOfCancer"
                  value={formData.familyHistoryOfCancer}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Please describe any family history of cancer (type, relation, age at diagnosis)"
                />
                <p className="text-xs text-gray-500">
                  Increases risk factor for some cancers
                </p>
              </div>

              {/* Previous Diagnosis */}
              <div className="space-y-2">
                <label
                  htmlFor="previousDiagnosis"
                  className="block text-sm font-medium text-gray-700"
                >
                  Previous Diagnosis (if any)
                </label>
                <textarea
                  id="previousDiagnosis"
                  name="previousDiagnosis"
                  value={formData.previousDiagnosis}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Please describe any previous eye-related or cancer diagnoses"
                />
              </div>

              {/* Ongoing Treatments */}
              <div className="space-y-2">
                <label
                  htmlFor="ongoingTreatments"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ongoing Treatments (if any)
                </label>
                <textarea
                  id="ongoingTreatments"
                  name="ongoingTreatments"
                  value={formData.ongoingTreatments}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Please list any current treatments or medications"
                />
              </div>

              {/* Eye Side - Changed to radio buttons */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Eye Side <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {["Left", "Right", "Both"].map((side) => (
                    <label
                      key={side}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="eyeSide"
                        value={side}
                        checked={formData.eyeSide === side}
                        onChange={() => handleEyeSideChange(side)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{side} Eye</span>
                    </label>
                  ))}
                </div>
                {errors.eyeSide && (
                  <p className="text-sm text-red-600">{errors.eyeSide}</p>
                )}
                <p className="text-xs text-gray-500">
                  Select the affected eye(s)
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-3 px-6 rounded-md font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Patient Information'}
                </button>
              </div>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            All information provided will be kept confidential and used only for
            medical purposes.
          </p>
        </div>
      </div>
    </div>
  );
}