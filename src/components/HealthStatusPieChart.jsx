import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  healthy: "#2e7d32",
  sick: "#d32f2f",
  under_treatment: "#ff9800",
  recovered: "#2196f3",
};

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function HealthPieChart({ data }) {
  // Transform data into the format expected by recharts
  const chartData = data
    ? Object.entries(data)
        .map(([status, value]) => ({
          name:
            status.charAt(0).toUpperCase() + status.slice(1).replace("_", " "),
          value: value,
        }))
        .filter((item) => item.value > 0)
    : [];

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name.toLowerCase().replace(" ", "_")]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} animals`, name]}
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc" }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1).replace("_", " ")
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
