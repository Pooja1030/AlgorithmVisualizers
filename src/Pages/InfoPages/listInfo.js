import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const linkedListInfo = [
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
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Singly Linked List</h2>
                    <p>
                    In a singly linked list, each node contains a data element and a reference (pointer) to the next node in the 
                    sequence. Traversal is only possible in one direction, from the head (first node) to the tail (last node).    </p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
                <div className="info-section">
                    <h2>Doubly Linked List</h2>
                    <p>
                    A doubly linked list extends the singly linked list by having each node point to both the next and previous nodes.
                     This allows for traversal in both directions, enhancing operations like insertion and deletion.
                    </p>
                     <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Doubly_linked_list" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>


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
