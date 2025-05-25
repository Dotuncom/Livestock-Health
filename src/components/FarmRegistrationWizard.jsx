//src/components/FarmRegistrationWizard.jsx
// Step-based Farmer Registration Form with Validation using React + Tailwind CSS

import { useState } from 'react';

function FarmerRegistrationWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmName: '',
    farmType: '',
    animalType: '',
    animalCount: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';
    } else if (step === 2) {
      if (!formData.farmName) newErrors.farmName = 'Farm name is required';
      if (!formData.farmType) newErrors.farmType = 'Farm type is required';
      if (!formData.animalType) newErrors.animalType = 'Animal type is required';
      if (!formData.animalCount) newErrors.animalCount = 'Animal count is required';
      if (!formData.location) newErrors.location = 'Location is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert('Registration successful!');
      console.log(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Farmer Registration</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">Full Name</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block">Email</label>
              <input name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div>
              <label className="block">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block">Farm Name</label>
              <input name="farmName" value={formData.farmName} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.farmName && <p className="text-red-500 text-sm">{errors.farmName}</p>}
            </div>
            <div>
              <label className="block">Farm Type</label>
              <select name="farmType" value={formData.farmType} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="">Select</option>
                <option value="Dairy">Dairy</option>
                <option value="Poultry">Poultry</option>
                <option value="Mixed">Mixed</option>
              </select>
              {errors.farmType && <p className="text-red-500 text-sm">{errors.farmType}</p>}
            </div>
            <div>
              <label className="block">Animal Type</label>
              <input name="animalType" value={formData.animalType} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.animalType && <p className="text-red-500 text-sm">{errors.animalType}</p>}
            </div>
            <div>
              <label className="block">Number of Animals</label>
              <input name="animalCount" type="number" value={formData.animalCount} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.animalCount && <p className="text-red-500 text-sm">{errors.animalCount}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block">Farm Location</label>
              <input name="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded" />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-sm text-gray-700 space-y-2">
            <h3 className="text-lg font-semibold">Review Information</h3>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="capitalize">
                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value || 'N/A'}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">
              Back
            </button>
          )}
          {step < 3 && (
            <button type="button" onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded">
              Next
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FarmerRegistrationWizard;
