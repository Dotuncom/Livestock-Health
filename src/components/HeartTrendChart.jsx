//src/components/HeartTrendChart.jsx
// components/HeartTrendChart.jsx
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

// Register components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HeartTrendChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Heart Rate (BPM)",
        data: [52, 58, 65, 73, 80, 88, 85],
        borderColor: "green",
        fill: false,
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
        // text: "Heart Trend for 005",
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
        min: 50,
        max: 95,
        ticks: {
          callback: (value) => `${value} BPM`
        },
        title: {
          display: true,
          text: "BPM"
        }
      }
    }
  };

  return (
    <div className="w-[543px] h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default HeartTrendChart;
