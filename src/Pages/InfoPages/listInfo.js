import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const linkedListInfo = [
    {
        title: "Singly Linked List",
        description: "A singly linked list is a collection of nodes where each node contains a data value and a reference (link) to the next node in the sequence.",
        link: 'https://en.wikipedia.org/wiki/Linked_list'
    },
    {
        title: "Doubly Linked List",
        description: "A doubly linked list is a linked list in which each node keeps an explicit reference to the node before it and a reference to the node after it.",
        link: 'https://en.wikipedia.org/wiki/Doubly_linked_list'
    },
    {
        title: "Insertion Operations",
        description: "Insertion operations add new nodes to the linked list.",
    },
    {
        title: "Deletion Operations",
        description: "Deletion operations remove nodes from the linked list.",
    },
    {
        title: "Search Operation",
        description: "Search operation finds a node with a given value in the linked list.",
    },
    {
        title: "Traversal Operation",
        description: "Traversal operation visits each node in the linked list in a specified order.",
    },
];

const algorithmComplexities = [
    { operation: "Insertion - Beginning", complexity: 'O(1)' },
    { operation: "Insertion - After/Before Node", complexity: 'O(n)' },
    { operation: "Insertion - End", complexity: 'O(n)' },
    { operation: "Deletion - Beginning", complexity: 'O(1)' },
    { operation: "Deletion - Middle", complexity: 'O(n)' },
    { operation: "Deletion - End", complexity: 'O(n)' },
    { operation: "Search", complexity: 'O(n)' },
    { operation: "Traversal", complexity: 'O(n)' },
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

const LinkedListInfo = () => {
    return (
        <>
            <Navbar currentPage="Linked List" visualizer="linkedlist" />
            <div className="info-container">
                {linkedListInfo.map((info) => (
                    <AlgorithmCard
                        key={info.title}
                        title={info.title}
                        link={info.link}
                        description={info.description}
                    />
                ))}
            </div>
            <ComplexityTable
                title="Linked List Operations - Time Complexity"
                data={algorithmComplexities}
            />
        </>
    );
};

export default LinkedListInfo;
