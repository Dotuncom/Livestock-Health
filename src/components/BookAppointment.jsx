//src/components/BookAppointment.jsx
// src/pages/appointments/new.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const vets = [
  {
    id: 1,
    name: 'Vet Didi',
    image: '/assets/vet1.png',
    specialty: 'Urban Cattle',
  },
  {
    id: 2,
    name: 'Vet Daniel',
    image: '/assets/vet2.png',
    specialty: 'Healthy Birds',
  },
  {
    id: 3,
    name: 'Vet Henry',
    image: '/assets/vet1.png',
    specialty: 'Urban Cattle',
  },
];

export default function BookAppointment() {
  const { id } = useParams();
  const vet = vets.find((v) => v.id === parseInt(id));

  const [formData, setFormData] = useState({
    fullName: '',
    animalType: '',
    issue: '',
    date: '',
    phone: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment submitted:', formData, 'Vet:', vet);
    alert('Appointment booked successfully!');
  };

  if (!vet) return <p className="p-4 text-red-600">Vet not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <div className="text-center mb-4">
          <img src={vet.image} alt={vet.name} className="w-20 h-20 rounded-full mx-auto border" />
          <h2 className="text-xl font-bold mt-2">{vet.name}</h2>
          <p className="text-sm text-gray-500">{vet.specialty}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Your Full Name"
            className="w-full border px-4 py-2 rounded"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="animalType"
            placeholder="Animal Type (e.g., Cow, Chicken)"
            className="w-full border px-4 py-2 rounded"
            value={formData.animalType}
            onChange={handleChange}
            required
          />
          <textarea
            name="issue"
            placeholder="Health Issue"
            className="w-full border px-4 py-2 rounded"
            rows={3}
            value={formData.issue}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="date"
            className="w-full border px-4 py-2 rounded"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            className="w-full border px-4 py-2 rounded"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="w-full bg-green-700 text-white py-2 rounded">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
