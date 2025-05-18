import db from '../../data/db.json';
import StatCard from '../../cards/StatsCard';
import AlertCard from '../../components/AlertsCard';
import LiveAnimalTracker from '../../components/LiveAnimalTracker';
import VitalsTable from '../../components/VitalTables';
import VitalTables from '../../components/VitalTables'

const iconMap = {
  "Registered Animal": "healthicons:animal-cow",
  "Animals with Abnormal Vitals": "mdi:alert-circle-outline",
  "Needs Attention": "material-symbols:warning-outline",
  "Upcoming Reminders": "mdi:calendar-clock"
};

export default function Dashboard() {
  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {db.stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={iconMap[stat.title] || "mdi:chart-box"}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <div className='grid grid-cols-1  md:grid-cols-3'>
      <div className="col-span-2 space-y-[5rem]">
          <LiveAnimalTracker />
          <VitalsTable />
        </div>
        <div>
          <AlertCard alerts={db.alerts}/>
      </div>
      </div>

    </div>
  
  );
}
