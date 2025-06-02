import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', bpm: 60 },
  { name: 'Tue', bpm: 64 },
  { name: 'Wed', bpm: 67 },
  { name: 'Thu', bpm: 70 },
  { name: 'Fri', bpm: 72 },
  { name: 'Sat', bpm: 71 },
  { name: 'Sun', bpm: 69 },
];

export default function HeartbeatTrendChart() {
  return (
    <div className="w-full h-[250px] md:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit=" bpm" domain={[55, 80]} />
          <Tooltip />
          <Line type="monotone" dataKey="bpm" stroke="#e53935" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}