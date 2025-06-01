// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'Healthy', value: 60 },
//   { name: 'At Risk', value: 25 },
//   { name: 'Critical', value: 15 },
// ];

// const COLORS = ['#2e7d32', '#ff9800', '#d32f2f'];

// const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
//   const RADIAN = Math.PI / 180;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//   return (
//     <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14}>
//       {(percent * 100).toFixed(0)}%
//     </text>
//   );
// };

// export default function HealthPieChart() {
//   return (
//     <div className="md:w-full h-[300px] md:h-full">
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={renderCustomLabel}
//             outerRadius={100}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend HorizontalAlign="top" height={36} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Healthy', value: 60 },
  { name: 'At Risk', value: 25 },
  { name: 'Critical', value: 15 },
];

const COLORS = ['#2e7d32', '#ff9800', '#d32f2f'];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function HealthPieChart({ width = 300, height = 300 }) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
