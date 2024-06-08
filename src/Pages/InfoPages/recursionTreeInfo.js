import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';
import LineGraph from '../../Components/LineGraph';

const recursionTreeInfo = [
    {
        title: "Fibonacci Sequence",
        description: "The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1.",
        link: 'https://en.wikipedia.org/wiki/Fibonacci_number'
    },
    {
        title: "Binomial Coefficient",
        description: "The binomial coefficient C(n, k) represents the number of ways to choose k elements from a set of n elements without regard to the order.",
        link: 'https://en.wikipedia.org/wiki/Binomial_coefficient'
    },
    {
        title: "Derangement",
        description: "A derangement of a permutation is a permutation in which no element appears in its original position. The number of derangements of a set of n elements is denoted by !n (subfactorial n).",
        link: 'https://en.wikipedia.org/wiki/Derangement'
    },
    {
        title: "Bigmod",
        description: "Bigmod is an algorithm used to efficiently compute the result of raising a number to a large power modulo another number.",
        link: 'https://en.wikipedia.org/wiki/Modular_exponentiation'
    },
    {
        title: "Stirling's Approximation",
        description: "Stirling's approximation is an approximation for large factorials. It is commonly used in analysis of algorithms to simplify expressions involving factorials.",
        link: 'https://en.wikipedia.org/wiki/Stirling%27s_approximation'
    },
];

const algorithmComplexities = [
    { operation: "Fibonacci", complexity: 'O(2^n)' },
    { operation: "Binomial Coefficient", complexity: 'O(n^2)' },
    { operation: "Derangement", complexity: 'O(n!)' },
    { operation: "Bigmod", complexity: 'O(log n)' },
    { operation: "Stirling's Approximation", complexity: 'O(1)' },
];

const ComplexityTable = ({ title, data }) => {
    return (
        <div className="table-container">
            <h3>{title}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>Complexity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((operation, index) => (
                        <tr key={index}>
                            <td>{operation.operation}</td>
                            <td>{operation.complexity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Fibonacci",
            data: Array.from({ length: 100 }, (_, i) => Math.pow(2, i + 1)),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: 'Derangement',
            data: Array.from({ length: 100 }, (_, i) => factorial(i + 1)),
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Binomial Coefficient",
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
            label: "Bigmod",
            data: Array.from({ length: 100 }, (_, i) => Math.log2(i + 1)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Stirling's Approximation",
            data: Array.from({ length: 100 }, (_, i) => (1)),
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

// Function to calculate factorial
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

const RecursionTreeInfo = () => {
    return (
        <>
            <Navbar currentPage="Recursion Tree" visualizer="recursiontree" />

            <div className="info-container-2">
                <div className="info-section">
                    <h2>Recursion Tree</h2>
                    <p>
                        A recursion tree is a graphical representation that illustrates the execution flow of a recursive function.
                        It provides a visual breakdown of recursive calls, helping to understand the recursive process better.

                        Each node in the tree represents the cost of a single subproblem within the set of recursive function invocations.
                        The tree helps in generating a close estimate of the actual complexity, which can be further verified using methods like the substitution method.
                        The Recursion Tree Method is a way of solving recurrence relations by converting them into recursive trees.
                        It is mainly used to analyze the time complexity of recursive algorithms.
                    </p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>

            <div className="info-container">
                {recursionTreeInfo.map((info) => (
                    <AlgorithmCard
                        key={info.title}
                        title={info.title}
                        link={info.link}
                        description={info.description}
                    />
                ))}
            </div>
            <LineGraph
                data={graphData}
                title="Recursion Tree - Time Complexity"
            />
            <ComplexityTable
                title="Recursion Tree - Time Complexity"
                data={algorithmComplexities}
            />
        </>
    );
};

export default RecursionTreeInfo;
