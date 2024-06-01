import React, { useState } from 'react';
import LineGraph from './LineGraph';
import ComplexityTable from '../Components/ComplexityTable';
import ComplexityChart from '../Components/ComplexityChart';
import Navbar from '../Components/navbar';

const algorithmDescriptions = [
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
        description: 'Heap Sort is a comparison-based sorting algorithm. Heapsort can be thought of as an improved selection sort: like that algorithm, it divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.',
        link: 'https://en.wikipedia.org/wiki/Heapsort'
    },
];

const sortingComplexities = [
    {
        name: 'Bubble Sort',
        best: 'O(n)',
        average: 'O(n^2)',
        worst: 'O(n^2)'
    },
    {
        name: 'Insertion Sort',
        best: 'O(n)',
        average: 'O(n^2)',
        worst: 'O(n^2)'
    },
    {
        name: 'Selection Sort',
        best: 'O(n^2)',
        average: 'O(n^2)',
        worst: 'O(n^2)'
    },
    {
        name: 'Merge Sort',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
    },
    {
        name: 'Quick Sort',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n^2)'
    },
    {
        name: 'Heap Sort',
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)'
    },
];

const labels = ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort',];
const chartData = [2, 2, 2, 1.5, 1.5, 1.5,];

const SortingAlgorithmCard = ({ title, description, link }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
            <button>
                <a href={link} target="_blank" rel="noopener noreferrer">Read More</a>
            </button>
        </div>
    );
};

const SortingComparison = () => {
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
            <div className="comparison-container">
                {algorithmDescriptions.map((algo) => (
                    <SortingAlgorithmCard
                        key={algo.title}
                        title={algo.title}
                        link={algo.link}
                        description={algo.description}
                    />
                ))}
            </div>

            {
                showLineGraph ? <LineGraph /> :
                    <ComplexityChart
                        labels={labels}
                        data={chartData}
                        title="Sorting Algorithms - Relative Complexity Graph"
                    />
            }
            <button onClick={toggleGraph}>
                {showLineGraph ? 'Show Relative Complexity Graph' : 'Show Time Complexity Graph'}
            </button>

            <ComplexityTable title="Sorting Algorithms - Time Complexity" data={sortingComplexities} />
        </>

    );
};

export default SortingComparison;