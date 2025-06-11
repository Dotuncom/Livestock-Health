import React, { useState, useEffect } from "react";

export default function AnimalForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "unknown",
    weight: "",
    health_status: "healthy",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        age: initialData.age?.toString() || "",
        weight: initialData.weight?.toString() || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string numbers to actual numbers
    const processedData = {
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
    };

    onSubmit(processedData);
  };

  const inputClass =
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Enter animal name"
        />
      </div>

      {/* Species */}
      <div>
        <label htmlFor="species" className={labelClass}>
          Species *
        </label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="e.g., Cow, Goat, Sheep"
        />
      </div>

      {/* Breed */}
      <div>
        <label htmlFor="breed" className={labelClass}>
          Breed
        </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className={inputClass}
          placeholder="e.g., Holstein, Boer"
        />
      </div>

      {/* Age and Gender Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className={labelClass}>
            Age (years)
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className={inputClass}
            placeholder="Enter age"
          />
        </div>
        <div>
          <label htmlFor="gender" className={labelClass}>
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      {/* Weight */}
      <div>
        <label htmlFor="weight" className={labelClass}>
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min="0"
          step="0.1"
          className={inputClass}
          placeholder="Enter weight"
        />
      </div>

      {/* Health Status */}
      <div>
        <label htmlFor="health_status" className={labelClass}>
          Health Status
        </label>
        <select
          id="health_status"
          name="health_status"
          value={formData.health_status}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="healthy">Healthy</option>
          <option value="sick">Sick</option>
          <option value="under_treatment">Under Treatment</option>
          <option value="recovered">Recovered</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className={`${inputClass} h-24`}
          placeholder="Additional information about the animal"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900"
        >
          {initialData ? "Update Animal" : "Add Animal"}
        </button>
      </div>
    </form>
  );
}
