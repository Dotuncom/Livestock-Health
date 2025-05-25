// components/HealthStatusPieChart.jsx
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Pie } from 'react-chartjs-2';
  
  // Register components
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const HealthStatusPieChart = () => {
    const data = {
      labels: ['Healthy', 'At Risk', 'Critical', 'Dead'],
      datasets: [
        {
          label: 'Livestock Health',
          data: [60, 25, 10, 5],
          backgroundColor: [
            '#2E7D32', // Healthy - green
            '#FFA726', // At Risk - orange
            '#D32F2F', // Critical - red
            '#212121', // Dead - black
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#000',
            font: {
              size: 14,
            },
          },
        },
      },
    };
  
    return (
      <div className="w-[270px] h-[275px] bg-white ">
        <Pie data={data} options={options} />
      </div>
    );
  };
  
  export default HealthStatusPieChart;
  