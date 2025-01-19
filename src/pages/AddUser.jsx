import { useState } from 'react';
import { indianStates } from '../utils/constants';

const AddUser = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    personal_details: {
      first_name: '',
      last_name: '',
      dob: '',
      age: '',
      gender: '',
      contact_number: '',
      email: '',
      address: '',
      pincode: '',
      state: ''
    },
    documents: {
      aadhar_number: '',
      pan_number: '',
      aadhar_front_image: null,
      aadhar_back_image: null,
      pan_card_image: null
    },
    nominee_details: {
      name: '',
      relationship: '',
      dob: '',
      age: '',
      aadhar_number: '',
      pan_number: ''
    },
    occupation: '',
    loans: []
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Personal Details Validation
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.documents.pan_number)) {
      newErrors.pan_number = 'Invalid PAN number format';
    }

    if (!/^\d{4}-\d{4}-\d{4}$/.test(formData.documents.aadhar_number)) {
      newErrors.aadhar_number = 'Invalid Aadhaar number format';
    }

    if (!/^[6-9]\d{9}$/.test(formData.personal_details.contact_number.replace(/\D/g, ''))) {
      newErrors.contact_number = 'Invalid Indian mobile number';
    }

    if (!/^\d{6}$/.test(formData.personal_details.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }

    const age = parseInt(formData.personal_details.age);
    if (isNaN(age) || age < 18 || age > 65) {
      newErrors.age = 'Age must be between 18 and 65';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // API call would go here
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New User</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Personal Details Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={formData.personal_details.first_name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personal_details: {
                    ...prev.personal_details,
                    first_name: e.target.value
                  }
                }))}
              />
            </div>
            {/* Add similar input fields for other personal details */}
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
              <input
                type="text"
                required
                pattern="\d{4}-\d{4}-\d{4}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={formData.documents.aadhar_number}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  documents: {
                    ...prev.documents,
                    aadhar_number: e.target.value
                  }
                }))}
              />
              {errors.aadhar_number && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhar_number}</p>
              )}
            </div>
            {/* Add similar input fields for other document details */}
          </div>
        </div>

        {/* Nominee Details Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Nominee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add nominee detail fields */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;