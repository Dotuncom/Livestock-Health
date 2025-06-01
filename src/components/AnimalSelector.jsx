//src/components/AnimalSelector.jsx
import React from 'react';

const AnimalSelector = ({ animals, selectedAnimalId, onChange }) => {
  return (
    <div className="w-full max-w-sm">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Animal
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        value={selectedAnimalId}
        onChange={(e) => onChange(e.target.value)}
      >
        {animals.map((animal) => (
          <option key={animal.id} value={animal.id}>
            {animal.name} - {animal.tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AnimalSelector;
