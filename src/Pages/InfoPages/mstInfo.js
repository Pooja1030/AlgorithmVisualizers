import React, { useState } from 'react';
import LineGraph from '../../Components/LineGraph';
import ComplexityTable from '../../Components/ComplexityTable';
import ComplexityChart from '../../Components/GraphComplexityChart.js';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const algorithmInfo = [
    {
        title: "Prim's Algorithm",
        description: "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. It starts with an arbitrary vertex and grows the tree one vertex at a time by adding the cheapest edge that connects the tree to a vertex not yet in the tree.",
        link: 'https://en.wikipedia.org/wiki/Prim%27s_algorithm'
    },
    {
        title: "Kruskal's Algorithm",
        description: "Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph. It starts with the edges sorted by weight and adds the lowest-weight edges that do not form cycles, until all vertices are connected.",
        link: 'https://en.wikipedia.org/wiki/Kruskal%27s_algorithm'
    },
];

const algorithmComplexities = [
    { algorithm: "Prim's Algorithm", best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
    { algorithm: "Kruskal's Algorithm", best: 'O(E log V)', average: 'O(E log V)', worst: 'O(E log V)' },
];

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Prim's Algorithm",
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Kruskal's Algorithm",
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
    ],
};

const MSTInfo = () => {
    const [showLineGraph, setShowLineGraph] = useState(true);

    const toggleGraph = () => {
        setShowLineGraph(!showLineGraph);
    };

    return (
        <>
            <Navbar
                currentPage="Minimum Spanning Tree"
                visualizer="MinimumSpanningTree"
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
                        title="Minimum Spanning Trees - Time Complexity Graph" />
                    :
                    <ComplexityChart
                        data={algorithmComplexities}
                        title="Minimum Spanning Trees - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable
                title="Minimum Spanning Trees - Time Complexity"
                data={algorithmComplexities} />
        </>

    );
};

export default MSTInfo;
