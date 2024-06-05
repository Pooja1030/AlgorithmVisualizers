import React, { useState } from 'react';
import LineGraph from '../../Components/LineGraph';
import ComplexityTable from '../../Components/ComplexityTable';
import ComplexityChart from '../../Components/ComplexityChart';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const algorithmInfo = [
    {
        title: "N-Queens Problem",
        description: "The N-Queens problem is the challenge of placing N chess queens on an N×N chessboard so that no two queens threaten each other. This means no two queens can share the same row, column, or diagonal.",
        link: 'https://en.wikipedia.org/wiki/Eight_queens_puzzle'
    },
    {
        title: "Backtracking",
        description: "Backtracking is a general algorithmic technique that considers searching every possible combination in order to solve a computational problem. It incrementally builds candidates to the solutions, and abandons each partial candidate (backtracks) as soon as it determines that the candidate cannot possibly be completed to a valid solution.",
        link: 'https://en.wikipedia.org/wiki/Backtracking'
    },
];

const algorithmComplexities = [
    { algorithm: "N-Queens Problem", best: 'O(n!)', average: 'O(n!)', worst: 'O(n!)' },
];

const graphData = {
    labels: Array.from({ length: 8 }, (_, i) => i + 1), // N from 1 to 8 (for simplicity)
    datasets: [
        {
            label: "Best",
            data: Array.from({ length: 8 }, (_, i) => factorial(i + 1)),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.3,
        },
        {
            label: "Average",
            data: Array.from({ length: 8 }, (_, i) => factorial(i + 1)),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.3,
        },
        {
            label: "Worst",
            data: Array.from({ length: 8 }, (_, i) => factorial(i + 1)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.3,
        },
    ],
};

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

const NQueensInfo = () => {
    const [showLineGraph, setShowLineGraph] = useState(true);

    const toggleGraph = () => {
        setShowLineGraph(!showLineGraph);
    };

    return (
        <>
            <Navbar
                currentPage="N-Queens Problem"
                visualizer="queen"
            />
            <div className="info-container">
                {algorithmInfo.map((algo) => (
                    <AlgorithmCard
                        key={algo.title}
                        title={algo.title}
                        link={algo.link}
                        description={algo.description}
                    />
                ))}
            </div>

            {
                showLineGraph ?
                    <LineGraph
                        data={graphData}
                        title="N-Queens Problem - Time Complexity Graph" />
                    :
                    <ComplexityChart
                        data={algorithmComplexities}
                        title="N-Queens Problem - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable
                title="N-Queens Problem - Time Complexity"
                data={algorithmComplexities} />
        </>
    );
};

export default NQueensInfo;
