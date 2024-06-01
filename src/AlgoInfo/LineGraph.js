// src/components/LineGraph.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = () => {
  const labels = Array.from({ length: 100 }, (_, i) => i + 1); // n from 1 to 100

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Bubble Sort O(n^2)',
        data: labels.map((n) => n * n),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4, // Smooth lines
      },
      {
        label: 'Insertion Sort O(n^2)',
        data: labels.map((n) => n * n),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4,
      },
      {
        label: 'Selection Sort O(n^2)',
        data: labels.map((n) => n * n),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4,
      },
      {
        label: 'Merge Sort O(n log n)',
        data: labels.map((n) => n * Math.log2(n)),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4,
      },
      {
        label: 'Quick Sort O(n log n)',
        data: labels.map((n) => n * Math.log2(n)),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4,
      },
      {
        label: 'Heap Sort O(n log n)',
        data: labels.map((n) => n * Math.log2(n)),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 7,
        hitRadius: 10,
        tension: 0.4,
      },
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Input Size (n)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Complexity',
        },
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:  "Sorting Algorithms - Time Complexity Chart"    },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
