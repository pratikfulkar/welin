import React, { useState } from "react";
import { X, Menu, Upload, Plus, Trash2, Save, CheckCircle } from "lucide-react";
import logo from "../assets/logo_new.jpg";

// Reusing the existing custom components...
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

const Input = ({ id, type = "text", className = "", ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Label = ({ htmlFor, children, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, welinId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
          <p className="text-gray-600 mb-6">Your Welin ID: {welinId || ""}</p>
          <p className="text-gray-600 mb-6">Form submitted successfully</p>
          <Button className="bg-[#77DC4E]" onClick={onClose}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

const UserDataForm = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedLoans, setSavedLoans] = useState([]);

  // Initial form state
  const initialFormState = {
    customer_id: "",
    personal_details: {
      first_name: "",
      last_name: "",
      dob: "",
      age: "",
      gender: "",
      contact_number: "",
      email: "",
      address: "",
      pincode: "",
      state: "",
    },
    documents: {
      aadhar_number: "",
      pan_number: "",
      aadhar_front_image: null,
      aadhar_back_image: null,
      pan_card_image: null,
    },
    nominee_details: {
      name: "",
      relationship: "",
      dob: "",
      age: "",
      aadhar_number: "",
      pan_number: "",
    },
    occupation: "",
    loans: [],
  };

  const [welinId, setWelinId] = useState("");

  // Function to generate a random Welin ID
  const generateWelinId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "WELIN-"; // Prefix that signifies it's a Welin ID
    const length = 6; // Random part length, excluding the prefix

    // Adding a random alphanumeric string
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };

  const [formData, setFormData] = useState(initialFormState);
  const handleSubmit = () => {
    // Generate random Welin ID
    const newWelinId = generateWelinId();
    setWelinId(newWelinId);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setFormData(initialFormState);
    setSavedLoans([]);
  };

  const indianStates = [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Delhi",
    "Gujarat",
    "Uttar Pradesh",
  ];

  const loanTypes = [
    "Personal Loan",
    "Education Loan",
    "Home Loan",
    "Vehicle Loan",
    "Business Loan",
  ];
  // New state for saved loans
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [field]: value }
          : value,
    }));
  };

  // Modified file upload handler with preview
  const handleFileUpload = (section, field, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: {
              file,
              preview: e.target.result,
            },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to remove uploaded file
  const removeFile = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: null,
      },
    }));
  };

  // Modified save loan function with validation
  const saveLoan = (index) => {
    const loanToSave = formData.loans[index];

    // Check if all required fields are filled
    const requiredFields = [
      "amount",
      "type",
      "sanction_date",
      "end_date",
      "lender_branch",
      "account_number",
    ];
    const isValid = requiredFields.every((field) => loanToSave[field]);

    if (!isValid) {
      alert("Please fill all loan details before saving");
      return;
    }

    // Validate end date is after sanction date
    if (new Date(loanToSave.end_date) <= new Date(loanToSave.sanction_date)) {
      alert("End date must be after sanction date");
      return;
    }

    setSavedLoans((prev) => [...prev, loanToSave]);
    setFormData((prev) => ({
      ...prev,
      loans: prev.loans.filter((_, i) => i !== index),
    }));
  };

  // Function to remove saved loan
  const removeSavedLoan = (index) => {
    setSavedLoans((prev) => prev.filter((_, i) => i !== index));
  };
  const addLoan = () => {
    setFormData((prev) => ({
      ...prev,
      loans: [
        ...prev.loans,
        {
          amount: "",
          sanction_date: "",
          end_date: "",
          type: "",
          lender_branch: "",
          account_number: "",
        },
      ],
    }));
  };

  const removeLoan = (index) => {
    setFormData((prev) => ({
      ...prev,
      loans: prev.loans.filter((_, i) => i !== index),
    }));
  };

  const updateLoan = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      loans: prev.loans.map((loan, i) =>
        i === index ? { ...loan, [field]: value } : loan
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header remains the same... */}
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
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-4xl mx-auto p-6 space-y-8">
          <h1 className="text-2xl font-bold text-center text-[#77DC4E]">
            User Information Form
          </h1>

          {/* Personal Details Section (continued) */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              Personal Details (continued)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={formData.personal_details.first_name}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "first_name",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={formData.personal_details.last_name}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "last_name",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.personal_details.dob}
                  onChange={(e) =>
                    handleInputChange("personal_details", "dob", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="age">Age (18-65)</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="65"
                  value={formData.personal_details.age}
                  onChange={(e) =>
                    handleInputChange("personal_details", "age", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.personal_details.gender}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "gender",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input
                  id="contact_number"
                  type="tel"
                  value={formData.personal_details.contact_number}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "contact_number",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personal_details.email}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "email",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  value={formData.personal_details.address}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "address",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.personal_details.pincode}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "pincode",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <select
                  id="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.personal_details.state}
                  onChange={(e) =>
                    handleInputChange(
                      "personal_details",
                      "state",
                      e.target.value
                    )
                  }
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Documents Section (with file upload) */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aadhar_number">Aadhar Number</Label>
                <Input
                  id="aadhar_number"
                  placeholder="XXXX-XXXX-XXXX"
                  value={formData.documents.aadhar_number}
                  onChange={(e) =>
                    handleInputChange(
                      "documents",
                      "aadhar_number",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="pan_number">PAN Number</Label>
                <Input
                  id="pan_number"
                  placeholder="ABCDE1234F"
                  value={formData.documents.pan_number}
                  onChange={(e) =>
                    handleInputChange("documents", "pan_number", e.target.value)
                  }
                />
              </div>
              <div className="col-span-2">
                <Label>Upload Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "aadhar_front_image",
                    "aadhar_back_image",
                    "pan_card_image",
                  ].map((field) => (
                    <div
                      key={field}
                      className="border-2 border-dashed rounded-lg p-4"
                    >
                      {!formData.documents[field] ? (
                        <>
                          <input
                            type="file"
                            id={field}
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload("documents", field, e)
                            }
                            accept="image/*"
                          />
                          <label
                            htmlFor={field}
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <Upload className="mb-2" />
                            <span className="text-sm">
                              {field
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ")}
                            </span>
                          </label>
                        </>
                      ) : (
                        <div className="relative">
                          <img
                            src={formData.documents[field].preview}
                            alt={field}
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            onClick={() => removeFile("documents", field)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Nominee Details Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Nominee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nominee_name">Name</Label>
                <Input
                  id="nominee_name"
                  value={formData.nominee_details.name}
                  onChange={(e) =>
                    handleInputChange("nominee_details", "name", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="nominee_relationship">Relationship</Label>
                <Input
                  id="nominee_relationship"
                  value={formData.nominee_details.relationship}
                  onChange={(e) =>
                    handleInputChange(
                      "nominee_details",
                      "relationship",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="nominee_dob">Date of Birth</Label>
                <Input
                  id="nominee_dob"
                  type="date"
                  value={formData.nominee_details.dob}
                  onChange={(e) =>
                    handleInputChange("nominee_details", "dob", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="nominee_age">Age</Label>
                <Input
                  id="nominee_age"
                  type="number"
                  value={formData.nominee_details.age}
                  onChange={(e) =>
                    handleInputChange("nominee_details", "age", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="nominee_aadhar">Aadhar Number</Label>
                <Input
                  id="nominee_aadhar"
                  placeholder="XXXX-XXXX-XXXX"
                  value={formData.nominee_details.aadhar_number}
                  onChange={(e) =>
                    handleInputChange(
                      "nominee_details",
                      "aadhar_number",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label htmlFor="nominee_pan">PAN Number</Label>
                <Input
                  id="nominee_pan"
                  placeholder="ABCDE1234F"
                  value={formData.nominee_details.pan_number}
                  onChange={(e) =>
                    handleInputChange(
                      "nominee_details",
                      "pan_number",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </section>

          {/* Occupation Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Occupation Details</h2>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) =>
                  handleInputChange("occupation", "", e.target.value)
                }
              />
            </div>
          </section>

          {/* Loans Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Loan Details</h2>
              <Button className="bg-[#77DC4E]" onClick={addLoan}>
                {/* <Plus className="w-4 h-4 mr-2" /> */}+ Add Loan
              </Button>
            </div>

            {/* Saved Loans Display */}
            {savedLoans.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {savedLoans.map((loan, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">
                        {loan.type || "Untitled Loan"}
                      </h3>
                      <button
                        onClick={() => removeSavedLoan(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Amount:</span> ₹
                        {loan.amount.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">Sanction Date:</span>{" "}
                        {new Date(loan.sanction_date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">End Date:</span>{" "}
                        {new Date(loan.end_date).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">Lender Branch:</span>{" "}
                        {loan.lender_branch}
                      </p>
                      <p>
                        <span className="font-medium">Account:</span>{" "}
                        {loan.account_number}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Loan Entry Forms */}
            {formData.loans.map((loan, index) => (
              <Card key={index} className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Loan #{index + 1}</h3>
                  <div className="flex gap-2">
                    <Button
                      className="bg-[#77DC4E]"
                      onClick={() => saveLoan(index)}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <button
                      onClick={() => removeLoan(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`loan_amount_${index}`}>Loan Amount</Label>
                    <Input
                      id={`loan_amount_${index}`}
                      type="number"
                      value={loan.amount}
                      onChange={(e) =>
                        updateLoan(index, "amount", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`loan_type_${index}`}>Loan Type</Label>
                    <select
                      id={`loan_type_${index}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={loan.type}
                      onChange={(e) =>
                        updateLoan(index, "type", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Loan Type</option>
                      {loanTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor={`sanction_date_${index}`}>
                      Sanction Date
                    </Label>
                    <Input
                      id={`sanction_date_${index}`}
                      type="date"
                      value={loan.sanction_date}
                      onChange={(e) =>
                        updateLoan(index, "sanction_date", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`end_date_${index}`}>End Date</Label>
                    <Input
                      id={`end_date_${index}`}
                      type="date"
                      value={loan.end_date}
                      onChange={(e) =>
                        updateLoan(index, "end_date", e.target.value)
                      }
                      required
                      min={loan.sanction_date}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`lender_branch_${index}`}>
                      Lender Branch
                    </Label>
                    <Input
                      id={`lender_branch_${index}`}
                      value={loan.lender_branch}
                      onChange={(e) =>
                        updateLoan(index, "lender_branch", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`account_number_${index}`}>
                      Account Number
                    </Label>
                    <Input
                      id={`account_number_${index}`}
                      value={loan.account_number}
                      onChange={(e) =>
                        updateLoan(index, "account_number", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </Card>
            ))}
          </section>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <Button className="bg-[#77DC4E] px-8" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Card>
      </main>
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        welinId={welinId}
      />
    </div>
  );
};

export default UserDataForm;
