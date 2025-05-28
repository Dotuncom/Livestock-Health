// src/pages/vets-page.jsx
import VetCard from '../../components/VetCard';
import ViewMore from '../../components/ViewMore';

export default function Vet() {
  const vets = [
    {
      id: 1,
      name: 'Vet Didi',
      image: '/assets/vet1.png',
      specialty: 'Urban Cattle',
      address: 'NO 11 Dabo Street Mangu, Plateau State',
      phone: '+234 701 234 5678',
    },
    {
      id: 2,
      name: 'Vet Daniel',
      image: '/assets/vet2.png',
      specialty: 'Healthy Birds',
      address: 'No 2 Kurmin Kogi, Kaduna State',
      phone: '+234 802 123 4567',
    },
    {
      id: 3,
      name: 'Vet Henry',
      image: '/assets/vet1.png',
      specialty: 'Urban Cattle',
      address: 'No 22 Rayfield Road, Jos Plateau State',
      phone: '+234 803 987 6543',
    },
  ];

  return (
    <section className="px-4 md:p-8 space-y-6 bg-white">
      <h1 className="text-xl font-bold">Available Vets</h1>
      <div className="space-y-4">
        {vets.map((vet) => (
          <VetCard key={vet.id} vet={vet} />
        ))}
      </div>
      <ViewMore onClick={() => console.log('Load more vets...')} />
    </section>
  );
}
