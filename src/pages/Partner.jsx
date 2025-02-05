import React, { useState, useEffect } from "react";
import {
  Calendar,
  UserRound,
  BadgeIndianRupee,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import logo from "../assets/logo_new.jpg";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Success Modal Component reused from adduser page
const SuccessModal = ({ isOpen, onClose, memberNumber }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-6">
            AIOCD Member Number: {memberNumber}
          </p>
          <p className="text-gray-600 mb-6">Form submitted successfully</p>
          <button
            className="px-4 py-2 bg-[#77DC4E] text-white rounded-md hover:opacity-90"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility functions remain the same...
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const calculatePremium = (age) => {
  const basePremium = age < 45 ? 6500 : 10500;
  const gst = basePremium * 0.18;
  return {
    withoutGst: basePremium,
    withGst: basePremium + gst,
  };
};

const formatCurrency = (amount) => {
  return amount.toLocaleString("en-IN");
};

const getEndDate = (startDate) => {
  const date = new Date(startDate);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split("T")[0];
};

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

// Get maximum date for DOB (must be at least 1 year old)
const getMaxDOB = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().split("T")[0];
};

const PartnerForm = () => {
  const initialState = {
    memberNumber: "",
    dob: "",
    age: "",
    memberName: "",
    gender: "",
    sumInsured: 500000,
    relationship: "Self",
    policyStartDate: getTodayDate(), // Set default to today
    policyEndDate: getEndDate(getTodayDate()), // Calculate based on today
    maritalStatus: "",
    premiumWithoutGst: 0,
    premiumWithGst: 0,
    // New medical history fields
    hasHypertension: "",
    hypertensionYears: "",
    hasDiabetes: "",
    diabetesYears: "",
    hasHeartDisease: "",
    heartDiseaseYears: "",
    hasCancer: "",
    cancerYears: "",
    hasKidneyDisease: "",
    kidneyDiseaseYears: "",
    // New Nominee Fields
    nomineeName: "",
    nomineeAge: "",
    nomineeRelationship: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    // Existing validations...
    if (!/^\d{3,10}$/.test(formData.memberNumber)) {
      newErrors.memberNumber = "Member number must be between 3 and 10 digits";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.memberName)) {
      newErrors.memberName = "Name should only contain letters and spaces";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.policyStartDate) {
      newErrors.policyStartDate = "Policy start date is required";
    }

    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
    }
    // Nominee Validations
    if (!/^[A-Za-z\s]+$/.test(formData.nomineeName)) {
      newErrors.nomineeName =
        "Nominee name should only contain letters and spaces";
    }

    if (!formData.nomineeName) {
      newErrors.nomineeName = "Nominee name is required";
    }

    if (!formData.nomineeAge) {
      newErrors.nomineeAge = "Nominee age is required";
    }

    if (!formData.nomineeRelationship) {
      newErrors.nomineeRelationship = "Nominee relationship is required";
    }

    // Updated Medical History Validations
    const medicalConditions = [
      { condition: "Hypertension", years: "hypertensionYears" },
      { condition: "Diabetes", years: "diabetesYears" },
      { condition: "HeartDisease", years: "heartDiseaseYears" },
      { condition: "Cancer", years: "cancerYears" },
      { condition: "KidneyDisease", years: "kidneyDiseaseYears" },
    ];

    medicalConditions.forEach(({ condition, years }) => {
      const hasCondition = `has${condition}`;
      const conditionYears = `${condition.toLowerCase()}Years`;

      // Validate if the condition is selected
      if (!formData[hasCondition]) {
        newErrors[hasCondition] = "Please select yes or no";
      }

      // Validate the "How Many Years?" dropdown if the condition is "Yes"
      if (formData[hasCondition] === "Yes" && !formData[conditionYears]) {
        newErrors[conditionYears] = "Please specify the number of years";
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Calculate age if DOB changes
      if (name === "dob") {
        const age = calculateAge(value);
        const premium = calculatePremium(age);
        newData.age = age;
        newData.premiumWithoutGst = premium.withoutGst;
        newData.premiumWithGst = premium.withGst;
      }

      // Calculate end date if start date changes
      if (name === "policyStartDate") {
        newData.policyEndDate = getEndDate(value);
      }

      // Reset years if condition is set to No
      if (name.startsWith("has") && value === "No") {
        const yearsField = name.replace("has", "").toLowerCase() + "Years";
        newData[yearsField] = "";
      }

      return newData;
    });
  };

  // Validate form on data change
  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowSuccess(true);
    }
  };
  const handleReset = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setFormData(initialState);
    setErrors({});
  };

  // HTML helper for required field label
  const RequiredLabel = ({ children }) => (
    <span className="block text-sm font-medium text-gray-700">
      {children}
      <span className="text-red-500 ml-1">*</span>
    </span>
  );

  // Medical History Field Component
  const MedicalConditionField = ({ condition, years, conditionLabel }) => {
    const hasCondition = `has${condition}`;
    const conditionYears = `${condition.toLowerCase()}Years`;

    const yearOptions = [
      { value: "", label: "Select" },
      { value: "Less than 1 year", label: "Less than 1 year" },
      { value: "1 to 2 years", label: "1 to 2 years" },
      { value: "2 to 3 years", label: "2 to 3 years" },
      { value: "3 to 4 years", label: "3 to 4 years" },
      { value: "4 to 5 years", label: "4 to 5 years" },
      { value: "More than 5 years", label: "More than 5 years" },
    ];

    return (
      <div className="space-y-4">
        <div>
          <RequiredLabel>{`Are you Suffering with ${conditionLabel}?`}</RequiredLabel>
          <select
            name={hasCondition}
            value={formData[hasCondition]}
            onChange={handleChange}
            className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
              errors[hasCondition] ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors[hasCondition] && (
            <div className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[hasCondition]}
            </div>
          )}
        </div>

        {formData[hasCondition] === "Yes" && (
          <div>
            <RequiredLabel>{`How Many Years for ${conditionLabel}?`}</RequiredLabel>
            <select
              name={conditionYears}
              value={formData[conditionYears]}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                errors[conditionYears] ? "border-red-500" : "border-gray-300"
              }`}
            >
              {yearOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[conditionYears] && (
              <div className="text-red-500 text-xs mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors[conditionYears]}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-[#77DC4E]">Welin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <Card className="max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-center text-[#9f629e]">
              Partner Portal
            </h1>
            <p className="text-center text-gray-600 mt-2">
              Member Registration Form
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Member Number */}
              <div>
                <RequiredLabel>AIOCD Member Number</RequiredLabel>

                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="memberNumber"
                    value={formData.memberNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.memberNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength="10"
                  />
                  {errors.memberNumber && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.memberNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <RequiredLabel>Date of Birth</RequiredLabel>

                <div className="mt-1 relative">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    max={getMaxDOB()}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.dob ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.dob && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dob}
                    </div>
                  )}
                </div>
              </div>

              {/* Member Name */}
              <div>
                <RequiredLabel>Member Name</RequiredLabel>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.memberName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.memberName && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.memberName}
                    </div>
                  )}
                </div>
              </div>

              {/* Age (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age (Years)
                </label>
                <input
                  type="text"
                  value={formData.age}
                  readOnly
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Gender */}
              <div>
                <RequiredLabel>Gender</RequiredLabel>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.gender}
                  </div>
                )}
              </div>

              {/* Sum Insured (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sum Insured
                </label>
                <input
                  type="text"
                  value={`₹${formatCurrency(formData.sumInsured)}`}
                  readOnly
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Policy Start Date */}
              <div>
                <RequiredLabel>Policy Start Date</RequiredLabel>

                <input
                  type="date"
                  name="policyStartDate"
                  value={formData.policyStartDate}
                  onChange={handleChange}
                  min={getTodayDate()} // Can't select past dates
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.policyStartDate
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.policyStartDate && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.policyStartDate}
                  </div>
                )}
              </div>

              {/* Policy End Date (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Policy End Date
                </label>
                <input
                  type="date"
                  value={formData.policyEndDate}
                  readOnly
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              {/* Marital Status */}
              <div>
                <RequiredLabel>Marital Status</RequiredLabel>

                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.maritalStatus ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                </select>
                {errors.maritalStatus && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.maritalStatus}
                  </div>
                )}
              </div>
            </div>
            {/* Medical History Section */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Medical History
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MedicalConditionField
                  condition="Hypertension"
                  years="hypertensionYears"
                  conditionLabel="Hypertension"
                />
                <MedicalConditionField
                  condition="Diabetes"
                  years="diabetesYears"
                  conditionLabel="Diabetes"
                />
                <MedicalConditionField
                  condition="HeartDisease"
                  years="heartDiseaseYears"
                  conditionLabel="Heart Disease"
                />
                <MedicalConditionField
                  condition="Cancer"
                  years="cancerYears"
                  conditionLabel="Cancer"
                />
                <MedicalConditionField
                  condition="KidneyDisease"
                  years="kidneyDiseaseYears"
                  conditionLabel="Kidney Disease"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nominee Name */}
              <div>
                <RequiredLabel>Nominee Name</RequiredLabel>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="nomineeName"
                    value={formData.nomineeName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.nomineeName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nomineeName && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nomineeName}
                    </div>
                  )}
                </div>
              </div>

              {/* Nominee Age */}
              <div>
                <RequiredLabel>Nominee Age</RequiredLabel>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="nomineeAge"
                    value={formData.nomineeAge}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.nomineeAge ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.nomineeAge && (
                    <div className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.nomineeAge}
                    </div>
                  )}
                </div>
              </div>

              {/* Nominee Relationship */}
              <div>
                <RequiredLabel>Nominee Relationship</RequiredLabel>
                <select
                  name="nomineeRelationship"
                  value={formData.nomineeRelationship}
                  onChange={handleChange}
                  className={`mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.nomineeRelationship
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nomineeRelationship && (
                  <div className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.nomineeRelationship}
                  </div>
                )}
              </div>
            </div>

            {/* Premium Information */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Premium Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Premium (without GST)
                  </label>
                  <input
                    type="text"
                    value={`₹${formatCurrency(formData.premiumWithoutGst)}`}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Premium (with 18% GST)
                  </label>
                  <input
                    type="text"
                    value={`₹${formatCurrency(formData.premiumWithGst)}`}
                    readOnly
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              {/* <button
              type="submit"
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-md text-white ${
                isFormValid 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Submit
            </button> */}

              <Button
                type="submit"
                className="bg-[#77DC4E] px-8"
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </Card>
        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          memberNumber={formData.memberNumber}
        />
      </div>
    </>
  );
};

export default PartnerForm;
