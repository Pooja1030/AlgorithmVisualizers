import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const stackInfo = [
    {
        title: "Push Operation",
        description: "Push adds an item to the top of the stack. If the stack is full, then it is said to be an Overflow condition.",
    },
    {
        title: "Pop Operation",
        description: "Pop removes an item from the top of the stack. The items are popped in the reversed order in which they are pushed. If the stack is empty, then it is said to be an Underflow condition.",
    },
    {
        title: "Peek Operation",
        description: "Peek returns the top element of the stack without removing it.",
    },
    {
        title: "isEmpty Operation",
        description: "isEmpty returns true if the stack is empty, otherwise false.",
    },
    {
        title: "Size Operation",
        description: "Size returns the number of elements in the stack.",
    },
];

const algorithmComplexities = [
    { operation: "Push", complexity: 'O(1)' },
    { operation: "Pop", complexity: 'O(1)' },
    { operation: "Peek", complexity: 'O(1)' },
    { operation: "isEmpty", complexity: 'O(1)' },
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


const StackInfo = () => {
    return (
        <>
            <Navbar currentPage="Stack" visualizer="stack" />

            <div className="info-container-2">
                <div className="info-section">
                    <h2>Stack</h2>
                    <p>
                        A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
                        It behaves like a stack of plates, where the last plate added is the first one to be removed.
                        Stacks have one end for both insertion and deletion of elements.
                        Common operations on a stack include push (adding an element) and pop (removing an element).
                        Examples of stacks in real life include the call stack in programming and the undo feature in applications.
                    </p>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>

            <div className="info-container">
                {stackInfo.map((info) => (
                    <AlgorithmCard
                        key={info.title}
                        title={info.title}
                        link={info.link}
                        description={info.description}
                    />
                ))}
            </div>
            <ComplexityTable
                title="Stack Operations - Time Complexity"
                data={algorithmComplexities} />
        </>
    );
};

export default StackInfo;
