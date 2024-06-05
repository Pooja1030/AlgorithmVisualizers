import React, { useState } from 'react';
import LineGraph from '../../Components/LineGraph';
import ComplexityTable from '../../Components/ComplexityTable';
import ComplexityChart from '../../Components/GraphComplexityChart.js';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const algorithmInfo = [
    {
        title: "Dijkstra's Algorithm",
        description: "Dijkstra's algorithm is a greedy algorithm used for finding the shortest path between nodes in a graph, particularly for graphs with non-negative edge weights. It maintains a set of nodes whose shortest distance from the source is known and expands the shortest path greedily.",
        link: 'https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm'
    },
    {
        title: "A* Search Algorithm",
        description: "A* (pronounced 'A star') is a graph traversal and path search algorithm that is widely used in pathfinding and graph traversal. It uses a best-first search and employs a heuristic function to guide the search.",
        link: 'https://en.wikipedia.org/wiki/A*_search_algorithm'
    },
    {
        title: "Depth-First Search (DFS)",
        description: "Depth-first search is an algorithm for traversing or searching tree or graph data structures. It starts at the root node and explores as far as possible along each branch before backtracking.",
        link: 'https://en.wikipedia.org/wiki/Depth-first_search'
    },
    {
        title: "Breadth-First Search (BFS)",
        description: "Breadth-first search is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
        link: 'https://en.wikipedia.org/wiki/Breadth-first_search'
    },
];

const algorithmComplexities = [
    { algorithm: "Dijkstra's Algorithm", best: 'O((V + E) log V)', average: 'O(V log V)', worst: 'O(V^2)' },
    { algorithm: "A* Search Algorithm", best: 'O(1)', average: 'O(log V)', worst: 'O(V + E)' },
    { algorithm: "Depth-First Search (DFS)", best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
    { algorithm: "Breadth-First Search (BFS)", best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
];

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Dijkstra's Algorithm",
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
            label: "A* Search Algorithm",
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Depth-First Search (DFS)",
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * (i + 1)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Breadth-First Search (BFS)",
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * (i + 1)),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
    ],
};

const PathfinderInfo = () => {
    const [showLineGraph, setShowLineGraph] = useState(true);

    const toggleGraph = () => {
        setShowLineGraph(!showLineGraph);
    };

    return (
        <>
            <Navbar
                currentPage="Pathfinding Algorithms"
                visualizer="pathfinder"
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
                        title="Pathfinding Algorithms - Time Complexity Graph" />
                    :
                    <ComplexityChart
                        data={algorithmComplexities}
                        title="Pathfinding Algorithms - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable
                title="Pathfinding Algorithms - Time Complexity"
                data={algorithmComplexities} />
        </>

    );
};

export default PathfinderInfo;
