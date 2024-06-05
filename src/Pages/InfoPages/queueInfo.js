import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const queueInfo = [
    {
        title: "Queue",
        description: "A queue is a linear data structure that follows a particular order in which the operations are performed. The order is FIFO (First In First Out).",
        link: 'https://en.wikipedia.org/wiki/Queue_(abstract_data_type)'
    },
    {
        title: "Enqueue Operation",
        description: "Enqueue adds an item to the rear end of the queue. If the queue is full, then it is said to be an Overflow condition.",
    },
    {
        title: "Dequeue Operation",
        description: "Dequeue removes an item from the front end of the queue. The items are dequeued in the same order in which they are enqueued. If the queue is empty, then it is said to be an Underflow condition.",
    },
    {
        title: "Peek Operation",
        description: "Peek returns the front element of the queue without removing it.",
    },
    {
        title: "isEmpty Operation",
        description: "isEmpty returns true if the queue is empty, otherwise false.",
    },
    {
        title: "isFull Operation",
        description: "isFull returns true if the queue is full, otherwise false.",
    },
    {
        title: "Size Operation",
        description: "Size returns the number of elements in the queue.",
    },
];

const algorithmComplexities = [
    { operation: "Enqueue", complexity: 'O(1)' },
    { operation: "Dequeue", complexity: 'O(1)' },
    { operation: "Peek", complexity: 'O(1)' },
    { operation: "isEmpty", complexity: 'O(1)' },
    { operation: "isFull", complexity: 'O(1)' },
    { operation: "Size", complexity: 'O(1)' },
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

const QueueInfo = () => {
    return (
        <>
            <Navbar currentPage="Queue" visualizer="queue" />
            <div className="info-container">
                {queueInfo.map((info) => (
                    <AlgorithmCard
                        key={info.title}
                        title={info.title}
                        link={info.link}
                        description={info.description}
                    />
                ))}
            </div>
            <ComplexityTable
                title="Queue Operations - Time Complexity"
                data={algorithmComplexities} />
        </>
    );
};

export default QueueInfo;
