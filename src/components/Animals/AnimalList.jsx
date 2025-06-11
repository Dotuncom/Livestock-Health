import React, { useState, useEffect } from "react";
import { supabase } from "../../App";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import AnimalForm from "./AnimalForm";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnimals(data || []);
    } catch (error) {
      toast.error("Error fetching animals: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this animal?")) return;

    try {
      const { error } = await supabase.from("animals").delete().eq("id", id);

      if (error) throw error;

      setAnimals(animals.filter((animal) => animal.id !== id));
      toast.success("Animal deleted successfully");
    } catch (error) {
      toast.error("Error deleting animal: " + error.message);
    }
  };

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Check user's role
      const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError) throw roleError;

      if (userData.role !== "farmer") {
        toast.error("Only farmers can add animals");
        return;
      }

      const animalData = {
        ...formData,
        user_id: user.id,
      };

      if (editingAnimal) {
        // Update existing animal
        const { error } = await supabase
          .from("animals")
          .update(animalData)
          .eq("id", editingAnimal.id);

        if (error) throw error;
        toast.success("Animal updated successfully");
      } else {
        // Insert new animal
        const { error } = await supabase.from("animals").insert([animalData]);

        if (error) throw error;
        toast.success("Animal added successfully");
      }

      setShowForm(false);
      setEditingAnimal(null);
      fetchAnimals();
    } catch (error) {
      toast.error("Error saving animal: " + error.message);
    }
  };

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Animals</h1>
        <button
          onClick={() => {
            setEditingAnimal(null);
            setShowForm(true);
          }}
          className="bg-green-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-900"
        >
          <Plus size={20} />
          Add Animal
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search animals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => (
          <div
            key={animal.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {animal.name}
                </h2>
                <p className="text-gray-600">
                  {animal.breed || animal.species}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(animal)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(animal.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Age:</span> {animal.age} years
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Gender:</span> {animal.gender}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Weight:</span> {animal.weight} kg
              </p>
              <p className="text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                  ${
                    animal.health_status === "healthy"
                      ? "bg-green-100 text-green-800"
                      : animal.health_status === "sick"
                      ? "bg-red-100 text-red-800"
                      : animal.health_status === "under_treatment"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {animal.health_status.replace("_", " ")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Animal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingAnimal ? "Edit Animal" : "Add New Animal"}
            </h2>
            <AnimalForm
              initialData={editingAnimal}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingAnimal(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
