// AnalyticsSection.jsx
import React from 'react';
import { useState } from 'react';
import MetricTabs from '../../components/MetricsTab';
import VetSummaryCard from '../../components/VetSummaryCard';
import HeartbeatTrendChart from '../../components/HeartTrendChart';
import TemperatureTrendChart from '../../components/TemperatureTrendChart';
import AnimalSelector from '../../components/AnimalSelector';

const Analytics = () => {
  const animals = [
  { id: 'cow-001', name: 'Bessie', tag: '001-A' },
  { id: 'cow-002', name: 'MooMoo', tag: '002-B' },
  { id: 'cow-003', name: 'Spotty', tag: '003-C' },
];

const sampleAnimal = {
  id: 'cow-001',
  name: 'Bessie',
  tag: '001-A',
  breed: 'Friesian',
  age: 4,
  weight: 520,
  lastCheck: '2025-05-28',
  vaccinated: true,
  status: 'Pregnant',
};
const selectedAnimal = animals.find(a => a.id === selectedAnimalId);

   const [selectedTab, setSelectedTab] = useState('Temperature');
   const [selectedAnimalId, setSelectedAnimalId] = useState(animals[0].id);
   
  return (

    <section className="w-full px-2 py-6 overflow-x-hidden overflow-y-visible">
       <div className="max-w-screen-xl mx-auto space-y-4">
        {/* Tabs */}
        <MetricTabs
          options={['Temperature', 'Heart Rate', 'Motion']}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
        </div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <VetSummaryCard label="Avg Temperature" value="38.2°C" icon="mdi:thermometer" />
        <VetSummaryCard label="Healthy Animals" value="87%" icon="mdi:heart-pulse" />
        <VetSummaryCard label="Active Alerts" value="4" icon="mdi:alert-circle" />
      </div>
      <div>
        {/* graph based on selection */}
    {selectedTab === 'Temperature' && <TemperatureTrendChart />}
    {selectedTab === 'Heart Rate' && <HeartbeatTrendChart/>}
    {/* {selectedTab === 'Motion' && < />} */}
  </div>
  <AnimalSelector
  animals={animals}
  selectedAnimalId={selectedAnimalId}
  onChange={setSelectedAnimalId}
/>
<AnimalStatsTable animal={selectedAnimal} />
    </section>
  );
};

export default Analytics;
