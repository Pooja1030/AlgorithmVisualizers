import React from 'react';
import Navbar from '../../Components/navbar';
import AlgorithmCard from '../../Components/AlgorithmCard';

const stackInfo = [
    {
        title: "Stack",
        description: "A stack is a linear data structure which follows a particular order in which the operations are performed. The order may be LIFO (Last In First Out) or FILO (First In Last Out).",
        link: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)'
    },
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
