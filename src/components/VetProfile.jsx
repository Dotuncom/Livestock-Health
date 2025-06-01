
import { useParams, useNavigate } from 'react-router-dom';

export default function VetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const vets = [
    { id: 1, name: 'Vet Didi', image: '/assets/vet1.png', specialty: 'Urban Cattle', address: 'NO 11 Dabo Street Mangu, Plateau State', phone: '+2347012345678' },
    { id: 2, name: 'Vet Daniel', image: '/assets/vet2.png', specialty: 'Healthy Birds', address: 'No 2 Kurmin Kogi, Kaduna State', phone: '+2348021234567' },
    { id: 3, name: 'Vet Henry', image: '/assets/vet1.png', specialty: 'Urban Cattle', address: 'No 22 Rayfield Road, Jos Plateau State', phone: '+2348039876543' },
  ];

  const vet = vets.find((v) => v.id === parseInt(id));
  if (!vet) return <p className="p-4 text-red-600">Vet not found</p>;

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
              className="flex flex-col items-center text-[#1d4719] hover:brightness-110 text-lg"
            >
              <span
                className="bg-[#EFFEE] p-4 rounded-sm flex items-center justify-center text-3xl"
                aria-label="Call"
              >
                📞
              </span>
              <span className="text-sm mt-1">Call</span>
            </a>
            <button
              onClick={() => navigate(`/vet-profile/${id}/book`)}
              className="flex flex-col items-center text-[#1d4719] hover:brightness-110 text-lg"
            >
              <span
                className="bg-[#EFEEE] p-4 rounded-sm flex items-center justify-center text-3xl"
                aria-label="Book"
              >
                📅
              </span>
              <span className="text-sm mt-1">Book</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
