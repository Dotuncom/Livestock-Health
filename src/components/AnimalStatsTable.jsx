import React from 'react';

const AnimalStatsTable = ({ animal }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Animal Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-800">
        <div>
          <strong>Name:</strong> {animal.name}
        </div>
        <div>
          <strong>Tag:</strong> {animal.tag}
        </div>
        <div>
          <strong>Breed:</strong> {animal.breed}
        </div>
        <div>
          <strong>Age:</strong> {animal.age} years
        </div>
        <div>
          <strong>Weight:</strong> {animal.weight} kg
        </div>
        <div>
          <strong>Last Check:</strong> {animal.lastCheck}
        </div>
        <div>
          <strong>Vaccinated:</strong> {animal.vaccinated ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Status:</strong> {animal.status}
        </div>
      </div>
    </div>
  );
};

export default AnimalStatsTable;
