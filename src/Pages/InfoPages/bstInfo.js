import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';
import ComplexityTable from '../../Components/ComplexityTable';
import LineGraph from '../../Components/LineGraph';

const bstInfo = [
    {
        title: "Insert Operation",
        description: "Insert adds a new node with the given value to the BST while maintaining its binary search tree property.",
    },
    {
        title: "Delete Operation",
        description: "Delete removes a node with the given value from the BST while maintaining its binary search tree property.",
    },
    {
        title: "Search Operation",
        description: "Search finds a node with the given value in the BST. If found, it returns true; otherwise, it returns false.",
    },
    {
        title: "Preorder Traversal",
        description: "Preorder traversal visits each node before its descendants. The order is root, left subtree, right subtree.",
    },
    {
        title: "Inorder Traversal",
        description: "Inorder traversal visits each node between its left and right descendants. The order is left subtree, root, right subtree.",
    },
    {
        title: "Postorder Traversal",
        description: "Postorder traversal visits each node after its descendants. The order is left subtree, right subtree, root.",
    },
];

const algorithmComplexities = [
    { algorithm: "Insert", best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    { algorithm: "Delete", best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    { algorithm: "Search", best: 'O(1)', average: 'O(log n)', worst: 'O(n)' },
    { algorithm: "Traversal", average: 'O(n)' },
];

const graphData = {
    labels: Array.from({ length: 100 }, (_, i) => i + 1),
    datasets: [
        {
            label: "Best",
            data: Array.from({ length: 100 }, (_, i) => (1)),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Average",
            data: Array.from({ length: 100 }, (_, i) => Math.log2(i + 1)),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
        {
            label: "Worst",
            data: Array.from({ length: 100 }, (_, i) => (i + 1)),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 7,
            hitRadius: 10,
            tension: 0.4,
        },
    ],
};

const BSTInfo = () => {
    return (
        <>
            <Navbar currentPage="Binary Search Tree" visualizer="BinarySearchTree" />

            <div className="info-container-2">
                <div className="info-section">
                    <h2>Binary Search Tree (BST)</h2>
                    <p>
                        A binary search tree (BST) is a binary tree data structure where each node 
                        has at most two children, referred to as the left child and the right child. In a BST,
                         the left child's key is always less than the parent's key, and the right child's key is 
                         always greater than the parent's key. This property allows for efficient searching, insertion, 
                         and deletion operations.
                    </p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Binary_search_tree" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>

            <div className="info-container">
                {bstInfo.map((info) => (
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
                title="Binary Search Tree - Time Complexity"
            />
            <ComplexityTable
                title="Binary Search Tree Operations - Time Complexity"
                data={algorithmComplexities} />
        </>
    );
};

export default BSTInfo;
