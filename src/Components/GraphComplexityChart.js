import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComplexityChart = ({ data, title }) => {
  const [chartType, setChartType] = useState('bar');

  const labels = data.map(item => item.algorithm);

  const convertToLogScale = (complexity) => {
    const complexityMap = {
      'O(1)': 1,
      'O(log V)': 10,
      'O(V)': 100,
      'O(E)': 1000,
      'O(V + E)': 10000,
      'O(V log V)': 100000,
      'O(E log V)': 1000000,
      'O(V^2)': 10000000,
      'O(V E)': 100000000,
      'O(2^V)': 1000000000,
      'O(V!)': 10000000000,
    };
    return complexityMap[complexity] || 0;
  };

  const bestCase = data.map(item => convertToLogScale(item.best));
  const averageCase = data.map(item => convertToLogScale(item.average));
  const worstCase = data.map(item => convertToLogScale(item.worst));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Best Case',
        data: bestCase,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: chartType === 'bar' ? 'bar' : 'line',
      },
      {
        label: 'Average Case',
        data: averageCase,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        type: chartType === 'bar' ? 'bar' : 'line',
      },
      {
        label: 'Worst Case',
        data: worstCase,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: chartType === 'bar' ? 'bar' : 'line',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Time Complexity (log scale)',
        },
        ticks: {
          callback: function(value, index, values) {
            const logLabels = {
              1: 'O(1)',
              10: 'O(log V)',
              100: 'O(V)',
              1000: 'O(E)',
              10000: 'O(V + E)',
              100000: 'O(V log V)',
              1000000: 'O(E log V)',
              10000000: 'O(V^2)',
              100000000: 'O(V E)',
              1000000000: 'O(2^V)',
              10000000000: 'O(V!)',
            };
            return logLabels[value] || '';
          }
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="chart-container">
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setChartType('bar')} disabled={chartType === 'bar'}>
          Bar Chart
        </button>
        <button onClick={() => setChartType('line')} disabled={chartType === 'line'}>
          Line Chart
        </button>
      </div>
      {chartType === 'bar' ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ComplexityChart;
