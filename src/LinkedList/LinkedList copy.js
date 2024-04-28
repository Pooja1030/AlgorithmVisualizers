// LinkedListVisualizer.js
import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import './linkedlist.css';
import SinglyLinkedList from './SinglyLinkedList'; // Import SinglyLinkedList
import DoublyLinkedList from './DoublyLinkedList'; // Import DoublyLinkedList
import CircularLinkedList from './CircularLinkedList'; // Import CircularLinkedList

const LinkedListVisualizer = () => {
    const [linkedlist, setLinkedList] = useState(null); // State to hold the linked list instance
    const [resultText, setResultText] = useState('');
    const [currVal, setCurrVal] = useState('');
    const [listType, setListType] = useState('Singly');

    // Function to handle dropdown change
    const handleListTypeChange = (event) => {
        const type = event.target.value.toLowerCase(); // Convert to lowercase
        setListType(type);
        if (type === 'singly') {
            setLinkedList(new SinglyLinkedList()); // Create a new Singly Linked List instance
        } else if (type === 'doubly') {
            setLinkedList(new DoublyLinkedList()); // Create a new Doubly Linked List instance
        } else if (type === 'circular') {
            setLinkedList(new CircularLinkedList()); // Create a new Circular Linked List instance
        }
    };

    // Function to insert a node at the beginning of the linked list
    const insertAtBeginning = () => {
        if (linkedlist) {
            const newData = Math.floor(Math.random() * 100) + 1; // Generate random data for the new node
            linkedlist.insertAtBeginning(newData);
            setResultText('Inserted at beginning:');
            setCurrVal(newData);
        }
    };

    // Function to delete the first node from the linked list
    const deleteAtBeginning = () => {
        if (linkedlist) {
            const removedData = linkedlist.deleteAtBeginning();
            if (removedData !== null) {
                setResultText('Deleted from beginning:');
                setCurrVal(removedData);
            } else {
                setResultText('List is empty');
                setCurrVal('');
            }
        }
    };

    // Function to display the linked list
    const displayList = () => {
        if (linkedlist) {
            setResultText('Linked List:');
            setCurrVal(linkedlist.displayList());
        }
    };

    // Function to reset the linked list and clear all data
    const resetLinkedList = () => {
        setLinkedList(null);
        setResultText('');
        setCurrVal('');
    };

    // Function to render linked list nodes
    const renderNodes = () => {
        let current = linkedlist.head;
        const nodes = [];
        while (current !== null) {
            nodes.push(
                <div key={current.data} className="node">
                    <div className="box">{current.data}</div>
                    {current.next && <div className="arrow"></div>}
                </div>
            );
            if (listType === 'circular' && current.next === linkedlist.head) break; // Break the loop for circular linked list
            current = current.next;
        }
        return nodes;
    };

    return (
        <>
            <Navbar currentPage="Linked List" />

            <div className="linkedlist-visualizer">
                <div>
                    <div className="menu">
                        <select defaultValue="visualize" onChange={handleListTypeChange}>
                            <option disabled value="visualize">Select Linked List</option>
                            <option value="singly">Singly Linked List</option>
                            <option value="doubly">Doubly Linked List</option>
                            <option value="circular">Circular Linked List</option>
                        </select>
                        <button className='visualize-btn' onClick={insertAtBeginning}>Insert at Beginning</button>
                        <button className='reset-btn' onClick={deleteAtBeginning}>Delete from Beginning</button>
                        <button className='visualize-btn' onClick={displayList}>Display</button>
                        <button className='reset-btn' onClick={resetLinkedList}>Reset</button>
                    </div>
                    <div className="result">{resultText && `${resultText} ${currVal}`}</div>
                </div>
                <div className="linkedlist">
                    <div className="list">
                        {/* Render linked list nodes */}
                        {linkedlist && renderNodes()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinkedListVisualizer;
