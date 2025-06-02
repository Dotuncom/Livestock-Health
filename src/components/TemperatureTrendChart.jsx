import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', temp: 97.8 },
  { name: 'Tue', temp: 99 },
  { name: 'Wed', temp: 100 },
  { name: 'Thu', temp: 100.5 },
  { name: 'Fri', temp: 101.2 },
  { name: 'Sat', temp: 102 },
  { name: 'Sun', temp: 102.1 },
];

export default function TemperatureTrendChart() {
  return (
    <div className="w-full h-[250px] md:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="°F" domain={[97, 103]} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#388e3c" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
