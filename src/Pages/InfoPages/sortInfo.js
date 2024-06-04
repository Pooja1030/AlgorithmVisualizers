import React, { useState } from 'react';
import LineGraph from '../../Components/LineGraph';
import ComplexityTable from '../../Components/ComplexityTable';
import ComplexityChart from '../../Components/ComplexityChart';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const algorithmInfo = [
    {
        title: 'Bubble Sort',
        description: 'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        link: 'https://en.wikipedia.org/wiki/Bubble_sort'
    },
    {
        title: 'Insertion Sort',
        description: 'Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.',
        link: 'https://en.wikipedia.org/wiki/Insertion_sort'
    },
    {
        title: 'Selection Sort',
        description: 'Selection Sort is an in-place comparison sorting algorithm. It has an O(n^2) time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort.',
        link: 'https://en.wikipedia.org/wiki/Selection_sort'
    },
    {
        title: 'Merge Sort',
        description: 'Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. Most implementations produce a stable sort, meaning that the order of equal elements is the same in the input and output.',
        link: 'https://en.wikipedia.org/wiki/Merge_sort'
    },
    {
        title: 'Quick Sort',
        description: 'Quick Sort is an efficient sorting algorithm. Developed by Tony Hoare in 1959, it is still a commonly used algorithm for sorting. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.',
        link: 'https://en.wikipedia.org/wiki/Quicksort'
    },
    {
        title: 'Heap Sort',
        description: 'Heap Sort is a comparison-based sorting algorithm. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.',
        link: 'https://en.wikipedia.org/wiki/Heapsort'
    },
];

const algorithmComplexities = [
    { algorithm: 'Bubble Sort', best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    { algorithm: 'Insertion Sort', best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    { algorithm: 'Selection Sort', best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    { algorithm: 'Merge Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    { algorithm: 'Quick Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    { algorithm: 'Heap Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
];

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: 'Bubble Sort O(n^2)',
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * (i + 1)),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: 'Insertion Sort O(n^2)',
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * (i + 1)),
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
            label: 'Merge Sort O(n log n)',
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
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
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
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
            data: Array.from({ length: 100 }, (_, i) => (i + 1) * Math.log2(i + 1)),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
    ],
};

const SortingInfo = () => {
    const [showLineGraph, setShowLineGraph] = useState(true);

    const toggleGraph = () => {
        setShowLineGraph(!showLineGraph);
    };

    return (
        <>
            <Navbar
                currentPage="Sorting Algorithms"
                visualizer="sort"
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
                        title="Sorting Algorithms - Time Complexity Graph" />
                    :
                    <ComplexityChart
                        data={algorithmComplexities}
                        title="Sorting Algorithms - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable
                title="Sorting Algorithms - Time Complexity"
                data={algorithmComplexities} />
        </>

    );
};

export default SortingInfo;