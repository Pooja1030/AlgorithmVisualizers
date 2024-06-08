import React, { useState } from 'react';
import LineGraph from '../../Components/LineGraph';
import ComplexityTable from '../../Components/ComplexityTable';
import ComplexityChart from '../../Components/ComplexityChart';
import Navbar from '../../Components/navbar';

const algorithmComplexities = [
    { algorithm: "Binary Search", best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
];

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Best",
            data: Array.from({ length: 100 }, (_, i) => (1)),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Average",
            data: Array.from({ length: 100 }, (_, i) => Math.log2(i + 1)),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Worst",
            data: Array.from({ length: 100 }, (_, i) => Math.log2(i + 1)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
    ],
};

const BinarySearchInfo = () => {
    const [showLineGraph, setShowLineGraph] = useState(true);

    const toggleGraph = () => {
        setShowLineGraph(!showLineGraph);
    };

    return (
        <>
            <Navbar
                currentPage="Binary Search"
                visualizer="binarysearch"
            />

            <div className="info-container-2">
                <div className="info-section">
                    <h2>Binary Search</h2>
                    <p>
                        A binary search is a search algorithm used to find the position of a target value within a sorted array.
                        It works by repeatedly dividing in half the portion of the list that could contain the item, until you've 
                        narrowed down the possible locations to just one.

                    </p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>

            {
                showLineGraph ?
                    <LineGraph
                        data={graphData}
                        title="Binary Search - Time Complexity Graph" />
                    :
                    <ComplexityChart
                        data={algorithmComplexities}
                        title="Binary Search - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable
                title="Binary Search - Time Complexity"
                data={algorithmComplexities} />
        </>

    );
};

export default BinarySearchInfo;
