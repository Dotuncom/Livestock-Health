//src/components/TemperatureTrendChart.jsx
// components/TemperatureTrendChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureTrendChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Temperature (F)",
        data: [97.8, 98.6, 99.2, 99.0, 100.5, 101.8, 102.2],
        fill: false,
        borderColor: "green",
        tension: 0.4,
        pointRadius: 2,
        pointBackgroundColor: "green"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Temperature Trend for 005",
        font: {
          size: 16
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "°F"
        },
        ticks: {
          callback: (value) => `${value} F`
        },
        min: 97,
        max: 103
      }
    }
  };

  return (
    <div className="w-[497px] h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureTrendChart;
