import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function VetProfile() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [reason, setReason] = useState('');

  const vets = [
    {
      id: 1,
      name: 'Vet Didi',
      image: '/assets/vet1.png',
      specialty: 'Urban Cattle',
      address: 'NO 11 Dabo Street Mangu, Plateau State',
      phone: '+2347012345678',
    },
    {
      id: 2,
      name: 'Vet Daniel',
      image: '/assets/vet2.png',
      specialty: 'Healthy Birds',
      address: 'No 2 Kurmin Kogi, Kaduna State',
      phone: '+2348021234567',
    },
    {
      id: 3,
      name: 'Vet Henry',
      image: '/assets/vet1.png',
      specialty: 'Urban Cattle',
      address: 'No 22 Rayfield Road, Jos Plateau State',
      phone: '+2348039876543',
    },
  ];

  const vet = vets.find((v) => v.id === parseInt(id));

  if (!vet) return <p className="p-4 text-red-600">Vet not found</p>;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${vet.name}\nName: ${userName}\nDate: ${bookingDate}\nReason: ${reason}`);
    setShowModal(false);
    setUserName('');
    setBookingDate('');
    setReason('');
  };

  return (
    <div className="bg-white overflow-x-hidden overflow-y-auto min-h-screen">
      <div className="pt-28 px-4 flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-lg p-6 text-center">
          <img
            src={vet.image}
            alt={vet.name}
            className="w-[200px] h-[200px] rounded-full mx-auto object-cover border border-gray-300"
          />
          <h1 className="text-4xl font-bold text-gray-900 mt-6">{vet.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{vet.specialty}</p>
          <p className="text-2xl text-gray-700 mt-1">{vet.phone}</p>
          <p className="text-2xl text-gray-500 mt-1">{vet.address}</p>

          <div className="flex justify-center gap-10 mt-10">
            <a
              href={`tel:${vet.phone}`}
              style={{ color: '#1d4719' }}
              className="flex flex-col items-center hover:brightness-110 text-lg"
            >
              📞
              <span className="text-sm mt-1">Call</span>
            </a>
            <button
              onClick={() => setShowModal(true)}
              style={{ color: '#1d4719' }}
              className="flex flex-col items-center hover:brightness-110 text-lg"
            >
              📅
              <span className="text-sm mt-1">Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-95 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 border border-[#1d4719]">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#1d4719]">
              Book Appointment with {vet.name}
            </h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1d4719] focus:border-[#1d4719]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1d4719] focus:border-[#1d4719]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows="3"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[#1d4719] focus:border-[#1d4719]"
                  placeholder="Describe your concern or need..."
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1d4719] text-white rounded-lg hover:brightness-110"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
