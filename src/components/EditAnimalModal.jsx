// src/components/EditAnimalModal.jsx
import React, { useState, useEffect } from 'react';

const EditAnimalModal = ({ isOpen, onClose, onUpdate, animal }) => {
  const [formData, setFormData] = useState({
    id: '',
    tagId: '',
    breed: '',
    species: 'Cow',
    date: '',
  });

  useEffect(() => {
    if (animal) {
      setFormData(animal);
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[300px] md:w-[450px] shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Edit Animal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="id"
            placeholder="Animal ID"
            value={formData.id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="tagId"
            placeholder="Tag ID"
            value={formData.tagId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formData.breed}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Cow">Cow</option>
            <option value="Goat">Goat</option>
            <option value="Sheep">Sheep</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-green-700 text-white py-2 rounded hover:bg-green-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimalModal;
