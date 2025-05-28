import React, { useState, useMemo } from "react";
import AnimalCard from "../../components/AnimalCard";
import AddAnimalModal from "../../components/AddAnimalModal";
import EditAnimalModal from "../../components/EditAnimalModal";

const initialAnimals = [
  {
    id: "A-001",
    tagId: "T123",
    species: "Cow",
    breed: "Angus",
    gender: "Male",
    deviceStatus: "Healthy",
    date: "2024-05-01",
  },
  {
    id: "A002",
    tagId: "T124",
    species: "Goat",
    breed: "Nubian",
    gender: "Female",
    deviceStatus: "At Risk",
    date: "2024-05-03",
  },
  {
    id: "A003",
    tagId: "T125",
    species: "Sheep",
    breed: "Merino",
    gender: "Female",
    deviceStatus: "Sick",
    date: "2024-05-05",
  },
];

export default function AnimalDashboard() {
  const [animals, setAnimals] = useState(initialAnimals);

  // Filter state
  const [filters, setFilters] = useState({
    species: "",
    gender: "",
    deviceStatus: "",
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // The animal being edited
  const [editingAnimal, setEditingAnimal] = useState(null);

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter animals based on selected filters
  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      return (
        (filters.species ? animal.species === filters.species : true) &&
        (filters.gender ? animal.gender === filters.gender : true) &&
        (filters.deviceStatus
          ? animal.deviceStatus === filters.deviceStatus
          : true)
      );
    });
  }, [animals, filters]);

  // Add new animal
  const handleAddAnimal = (newAnimal) => {
    // Add default deviceStatus from newAnimal if exists, else "Healthy"
    setAnimals((prev) => [...prev, { ...newAnimal }]);
    setIsAddModalOpen(false);
  };

  // Start editing animal (open modal with data)
  const handleEditClick = (animal) => {
    setEditingAnimal(animal);
    setIsEditModalOpen(true);
  };

  // Update animal after edit
  const handleUpdateAnimal = (updatedAnimal) => {
    setAnimals((prev) =>
      prev.map((a) => (a.id === updatedAnimal.id ? updatedAnimal : a))
    );
    setIsEditModalOpen(false);
    setEditingAnimal(null);
  };

  // Delete animal
  const handleDeleteAnimal = (id) => {
    setAnimals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          name="species"
          value={filters.species}
          onChange={handleFilterChange}
          className="border rounded px-3 py-1"
        >
          <option value="">All Species</option>
          {[...new Set(animals.map((a) => a.species))].map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="border rounded px-3 py-1"
        >
          <option value="">All Gender</option>
          {[...new Set(animals.map((a) => a.gender))].map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>

        <select
          name="deviceStatus"
          value={filters.deviceStatus}
          onChange={handleFilterChange}
          className="border rounded px-3 py-1"
        >
          <option value="">All Status</option>
          {[...new Set(animals.map((a) => a.deviceStatus))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Register Animal
        </button>
      </div>

      {/* Animal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAnimals.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No animals found.
          </p>
        ) : (
          filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              id={animal.id}
              breed={animal.breed}
              species={animal.species}
              status={animal.deviceStatus}
              date={animal.date}
              onDelete={() => handleDeleteAnimal(animal.id)}
              onEdit={() => handleEditClick(animal)}
            />
          ))
        )}
      </div>

      {/* View All button centered */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setFilters({ species: "", gender: "", deviceStatus: "" })}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View All
        </button>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddAnimalModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddAnimal}
        />
      )}

      {isEditModalOpen && editingAnimal && (
        <EditAnimalModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateAnimal}
          animal={editingAnimal}
        />
      )}
    </div>
  );
}
