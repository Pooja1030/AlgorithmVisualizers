import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import SidePanel from './sidepanell'; // Import the SidePanel component
import './linkedlist.css';
import SinglyLinkedList from './SinglyLinkedList'; // Import SinglyLinkedList
import DoublyLinkedList from './DoublyLinkedList'; // Import DoublyLinkedList
// import CircularLinkedList from './CircularLinkedList'; // Import CircularLinkedList
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { gsap } from 'gsap';

const LinkedListVisualizer = () => {
    const [linkedlist, setLinkedList] = useState(null); // State to hold the linked list instance
    const [resultText, setResultText] = useState('');
    const [currVal, setCurrVal] = useState('');
    const [listType, setListType] = useState('');
    const [insertPosition, setInsertPosition] = useState('Beginning'); // State to hold the selected position for insertion
    const [deletePosition, setDeletePosition] = useState('Beginning'); // State to hold the selected position for deletion
    const [newValue, setNewValue] = useState('');
    const [nodeValue, setNodeValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sidePanelOpen, setSidePanelOpen] = useState(false); // State to manage side panel visibility
    const [algorithmSteps, setAlgorithmSteps] = useState([]);

    useEffect(() => {
        // Define your algorithm steps here
        const steps = [
            { code: "1. Insert at the beginning" },
            { code: "- Create new node" },
            { code: "- Change next of new node to point to head" },
            { code: "- Change head to point to recently created node" },
            { code: "2. Insert at the End" },
            { code: "- Create new node" },
            { code: "- Traverse to last node" },
            { code: "- Change next of last node to recently created node" },
            { code: "3. Insert at the Middle" },
            { code: "- Create new node" },
            { code: "- Traverse to node just before the required position of new node" },
            { code: "- Change next pointers to include new node in between" },

        ];

        setAlgorithmSteps(steps);
    }, []);



    const handleListTypeChange = (event) => {
        const type = event.target.value.toLowerCase();
        setListType(type);
        resetLinkedList();
        switch (type) {
            case 'singly':
                setLinkedList(new SinglyLinkedList());
                break;
            case 'doubly':
                setLinkedList(new DoublyLinkedList());
                break;
            // case 'circular':
            //     setLinkedList(new CircularLinkedList());
            //     break;
            default:
                // Handle default case if needed
                break;
        }
    };

    const handleInsertPositionChange = (event) => {
        setInsertPosition(event.target.value);
    };

    const handleDeletePositionChange = (event) => {
        setDeletePosition(event.target.value);
    };

    const handleInputChange = (event) => {
        setNewValue(event.target.value);
    };

    const handleNodeValueChange = (event) => {
        setNodeValue(event.target.value);
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };


    const insertNode = () => {
        if (linkedlist) {
            let newData = newValue.trim();
            if (!newData) {
                newData = Math.floor(Math.random() * 100) + 1; // Generate random data if no value is specified
            }
            if (insertPosition === 'Beginning') {
                linkedlist.insertAtBeginning(newData);
                setResultText('Inserted at beginning:');
                setCurrVal(newData);
            } else if (insertPosition === 'After Node') {
                const prevNodeData = parseInt(nodeValue.trim());
                const foundNode = linkedlist.search(prevNodeData);
                if (foundNode) {
                    linkedlist.insertAfterNode(prevNodeData, newData);
                    setResultText('Inserted after ' + prevNodeData + ': ');
                    setCurrVal(newData);
                } else {
                    setResultText('Node not found');
                    setCurrVal('');
                }
            } else if (insertPosition === 'Before Node') {
                const nextNodeData = parseInt(nodeValue.trim());
                const foundNode = linkedlist.search(nextNodeData);
                if (foundNode) {
                    linkedlist.insertBeforeNode(nextNodeData, newData);
                    setResultText('Inserted before ' + nextNodeData + ': ');
                    setCurrVal(newData);
                } else {
                    setResultText('Node not found');
                    setCurrVal('');
                }
            } else if (insertPosition === 'End') {
                linkedlist.insertAtEnd(newData);
                setResultText('Inserted at end:');
                setCurrVal(newData);
            }

            // Call animateInsertion after performing the insertion
            animateInsertion(insertPosition, newData);
        }
    };

    const deleteNode = () => {
        if (linkedlist) {
            if (deletePosition === 'Beginning') {
                const removedData = linkedlist.deleteAtBeginning();
                if (removedData !== null) {
                    setResultText('Deleted from beginning:');
                    setCurrVal(removedData);
                } else {
                    setResultText('List is empty');
                    setCurrVal('');
                }
            } else if (deletePosition === 'Middle') {
                const dataToDelete = parseInt(nodeValue.trim());
                const foundNode = linkedlist.search(dataToDelete);
                if (foundNode) {
                    linkedlist.deleteFromMiddle(dataToDelete);
                    setResultText('Deleted node:');
                    setCurrVal(dataToDelete);
                } else {
                    setResultText('Node not found');
                    setCurrVal('');
                }
            }
            else if (deletePosition === 'End') {
                const removedData = linkedlist.deleteFromEnd();
                if (removedData !== null) {
                    setResultText('Deleted from end:');
                    setCurrVal(removedData);
                } else {
                    setResultText('List is empty');
                    setCurrVal('');
                }
            }
        }
    };

    const searchNode = () => {
        if (linkedlist && searchValue) {
            const valueToSearch = parseInt(searchValue.trim());
            const foundNode = linkedlist.search(valueToSearch);
            if (foundNode) {
                setResultText('Node found:');
                setCurrVal(valueToSearch);
            } else {
                setResultText('Node not found');
                setCurrVal('');
            }
            animateSearch(valueToSearch);
        }
    };

    const traverseList = () => {
        if (linkedlist) {
            const traversalResult = linkedlist.traverse();
            // console.log(traversalResult); // Output the traversal result to console
            return traversalResult;
        }
    };

    const animateHead = (timeline) => {
        // Highlight head-null node and next arrow
        timeline.to("#head-null-node .head-node", { color: "#dc16d2", duration: 1 })
            .to("#head-null-node .head-node", { color: "#007bff", duration: 0.5 })
            .to("#head-arrow", { fill: "#dc16d2", duration: .5 }, "-=1")
            .to("#head-arrow", { scale: 1.2, duration: .5 }, "+=.5")
            .to("#head-arrow", { fill: "#000", scale: 1, duration: .5 });
    }

    const animateNull = (timeline) => {
        // Highlight null node
        timeline.to("#null-node", { color: "#dc16d2", duration: 1 }, "-=1")
            .to("#null-node", { color: "#007bff", duration: 1 });
    }

    const animateNodes = (list, timeline) => {
        list.forEach((listNode, index) => {
            // If stopPosition is reached, break the loop
            const currentNode = `#list-node-${listNode.data} `;
            const currentNodeBox = currentNode + " .box";
            const nextBox = currentNode + " .next";
            const nextArrowElement = currentNode + " .nextArrow";

            // timeline
            // Highlight current node box
            timeline.to(currentNodeBox, { backgroundColor: "#f9d0ff", color: "#dc16d2", borderColor: "#dc16d2", duration: 1.5 }, "-=1")
                .to(currentNodeBox, { backgroundColor: "#f0f0f0", color: "#007bff", borderColor: "#007bff", duration: 1 },);

            // Highlight next node box
            timeline.to(nextBox, { backgroundColor: "#6b94bc", duration: 0.5 }, "-=2")
                .to(nextBox, { backgroundColor: "#dc16d2", duration: 1 }, "-=1")
                .to(nextBox, { backgroundColor: "#6b94bc", duration: 0.5 });

            // Highlight next arrow
            timeline.to(nextArrowElement, { fill: "#dc16d2", duration: .5 }, "-=2")
                .to(nextArrowElement, { scale: 1.2, duration: .5 },)
                .to(nextArrowElement, { fill: "#000", scale: 1, duration: .5 });
        });

    }

    const animateTraversal = async () => {
        const list = traverseList();
        if (list.length === 0) return;

        const timeline = gsap.timeline();

        // Highlight head-null node and next arrow
        animateHead(timeline);
        // Highlight each list node box and next arrow
        animateNodes(list, timeline);
        // Highlight null node
        animateNull(timeline);

        // show travsersal result
        const traversalResult = linkedlist.displayList();
        setResultText("Linked list: ");
        setCurrVal(traversalResult);
    };

    const animateInsertion = async (insertPosition, newData) => {
        await new Promise(resolve => setTimeout(resolve, 5)); // Wait for insertion to complete

        const list = traverseList();
        const index = list.findIndex(node => node.data === newData);
        let nodesBefore = [];
        let nodesAfter = [];
        if (index !== -1) {
            nodesBefore = list.slice(0, index); // Exclude the node with the data
            nodesAfter = list.slice(index + 1); // Exclude the node with the data
        } else {
            // If the target data is not found, the whole array is considered as nodes before the target
            nodesBefore = list;
        }

        const newNode = document.querySelector(`#list-node-${newData} .box`);
        if (newNode) {
            gsap.set(newNode, { opacity: 0, y: -75 });
        } else return;

        const timeline = gsap.timeline();

        const nextBox = `#list-node-${newData} .next`;
        const nextArrowElement = `#list-node-${newData} .nextArrow`;
        let prevBox;
        let prevArrowElement;
        if (listType === 'doubly') {
            prevBox = `#list-node-${newData} .prev`;
            prevArrowElement = `#list-node-${newData} .prevArrow`;
        }

        // start animation
        // display node
        timeline.set(newNode, { opacity: 1, y: -75, },);
        gsap.set(nextArrowElement, { opacity: 0, fill: "#dc16d2" });
        prevArrowElement && gsap.set(prevArrowElement, { opacity: 0, fill: "#dc16d2" });

        // animate head
        animateHead(timeline);

        if (insertPosition === 'Beginning' && listType === 'doubly') {
            if (nodesAfter.length === 0) {
                gsap.set("#head-null-node .prev-null-node", { opacity: 0 });
                gsap.set("#head-null-node .prevArrow", { fill: "#dc16d2", opacity: 0, });
            } else {
                timeline.set("#head-null-node .prev-null-node", { color: "#dc16d2", duration: 1 })
                    .to("#head-null-node .prevArrow", { fill: "#000", scale: 1, duration: .5 });
                // .to("#head-null-node .prev-null-node", { color: "#007bff", duration: 0.5 })
                // .to("#head-null-node .prevArrow", { fill: "#dc16d2", duration: .5 }, "-=1")
                // .to("#head-null-node .prevArrow", { scale: 1.2, duration: .5 }, "+=.5")
            }
        }

        // animate nodes before the new node
        if (insertPosition === 'After Node' || insertPosition === 'End') {
            animateNodes(nodesBefore, timeline);
        }

        // slide nodes after new node to right
        nodesAfter.forEach((listNode, index) => {
            const currentNode = `#list-node-${listNode.data} `;
            gsap.set(currentNode, { x: `${listType === 'doubly' ? -206 : -146}` }); // Delay the start of each node's animation
        });
        nodesAfter.forEach((listNode, index) => {
            const currentNode = `#list-node-${listNode.data} `;
            gsap.to(currentNode, { x: 0, duration: 1, delay: (nodesBefore.length + 1) * 3 }); // Delay the start of each node's animation
        });

        // hide null node if no nodes after
        if (nodesAfter.length === 0) {
            gsap.set("#null-node", { opacity: 0 })
        }
        else {
            gsap.set("#null-node", { x: `${listType === 'doubly' ? -206 : -146}` });
            gsap.to("#null-node", { x: 0, duration: 1, delay: (nodesBefore.length + 1) * 3 });
        }

        // place new node
        timeline.to(newNode, { opacity: 1, y: 0, duration: 1 }, "+=.5");

        // Highlight next node box
        timeline.to(nextBox, { backgroundColor: "#6b94bc", duration: 0.5 }, "-=2")
            .to(nextBox, { backgroundColor: "#dc16d2", duration: 1 }, "+=1")
            .to(nextBox, { backgroundColor: "#6b94bc", duration: 0.5 });

        // point arrow to next node
        timeline
            .to(nextArrowElement, { opacity: 1, x: -10, scale: 1.2, duration: 1 }, "-=.5")
            .to(nextArrowElement, { x: 0, fill: "#000", scale: 1, duration: .5 });

        // if next pointer is null, animate it
        timeline.to("#null-node", { opacity: 1 })
        if (nodesAfter.length === 0)
            animateNull(timeline);

        // Highlight prev node box
        if (prevBox) {
            timeline.to(prevBox, { backgroundColor: "#6b94bc", duration: 0.5 }, "-=2")
                .to(prevBox, { backgroundColor: "#dc16d2", duration: 1 }, "+=1")
                .to(prevBox, { backgroundColor: "#6b94bc", duration: 0.5 });
        }

        // if prev node is null, animate it 
        if (nodesBefore.length === 0 && listType === 'doubly') {
            timeline.to("#head-null-node .prevArrow", { opacity: 1, x: 10, scale: 1.2, duration: 0.5 },)
                .to("#head-null-node .prevArrow", { x: 0, fill: "#000", scale: 1, duration: 1 },)
                .to("#head-null-node .prev-null-node", { opacity: 1, color: "#dc16d2", duration: 1 })
                .to("#head-null-node .prev-null-node", { color: "#007bff", duration: 0.5 });
        }

        if (nodesAfter.length > 0 && listType === 'doubly') {
            const nextNode = nodesAfter[0];
            const nextPrev = `#list-node-${nextNode.data} .prev`;
            timeline.to(nextPrev, { backgroundColor: "#6b94bc", duration: 0.5 }, "-=2")
                .to(nextPrev, { backgroundColor: "#dc16d2", duration: 1 }, "+=1")
                .to(nextPrev, { backgroundColor: "#6b94bc", duration: 0.5 });
        }

        // point arrow to prev node
        if (prevArrowElement) {
            timeline.set(prevArrowElement, { opacity: 1 })
            timeline.to(prevArrowElement, { x: "+=10", scale: 1.2, duration: 0.5 },)
                .to(prevArrowElement, { x: 0, fill: "#000", scale: 1, duration: 1, });
        }


        console.log("finish animation");
    };

    const animateSearch = async (nodeData) => {
        const list = traverseList();
        const index = list.findIndex(node => node.data === nodeData);
        let nodesBefore = [];
        if (index !== -1) {
            nodesBefore = list.slice(0, index); // Exclude the node with the data
        } else {
            // If the target data is not found, the whole array is considered as nodes before the target
            nodesBefore = list;
        }

        // start animation
        const timeline = gsap.timeline();

        // animate head and the nodes before
        animateHead(timeline);
        animateNodes(nodesBefore, timeline);

        const searchNode = document.querySelector(`#list-node-${nodeData} .box`);
        if (!searchNode) {
            animateNull(timeline);
            return;
        };

        const nextBox = document.querySelector(`#list-node-${nodeData} .next`);
        let prevBox = "";
        if (listType === 'doubly') {
            prevBox = `#list-node-${nodeData} .prev`;
        }

        // reach the node
        timeline.to(searchNode, { backgroundColor: "#f9d0ff", color: "#dc16d2", borderColor: "#dc16d2", duration: 1.5 }, "-=1")
            .to(searchNode, { backgroundColor: "#f0f0f0", color: "#007bff", borderColor: "#007bff", duration: 1 },);

        // Highlight the node found
        timeline.to(searchNode, { backgroundColor: "#d3f7db", color: "#015719", borderColor: "#08ad37", duration: 1.5 })
            .to(nextBox, { backgroundColor: "#72cd87", duration: 1.5 }, "<");
        if (prevBox) timeline.to(prevBox, { backgroundColor: "#72cd87", duration: 1.5 }, "<");

        // reset style
        timeline.to(searchNode, { backgroundColor: "#f0f0f0", color: "#007bff", borderColor: "#007bff", duration: 1 }, "+=2")
            .to(nextBox, { backgroundColor: "#6b94bc", duration: 0.5 }, "<");
        if (prevBox)
            timeline.to(prevBox, { backgroundColor: "#6b94bc", duration: 0.5 }, "<");
    };

    const resetLinkedList = () => {
        setLinkedList(null);
        setResultText('');
        setCurrVal('');
    };

    const renderNodes = () => {
        let current = linkedlist.head;
        const nodes = [];
        // head
        nodes.push(
            <div id="head-null-node" className="list-node">
                <div className="box head">
                    <div className='head-node'>HEAD</div>
                    {listType === 'doubly' && current && <div className="prev-null-node">NULL</div>}
                </div>
                <div className='arrowIcons'>
                    <EastIcon className='nextArrow' id="head-arrow" />
                    {listType === 'doubly' && current && <WestIcon className='prevArrow' />}
                </div>
            </div>
        );
        // other nodes
        while (current !== null) {
            nodes.push(
                <div key={current.data} id={(`list-node-${current.data}`)} className="list-node">
                    <div className="box">
                        {listType === 'doubly' && <div className="prev">prev</div>}
                        <div className="data">
                            {current.data}
                        </div>
                        <div className="next">next</div>
                    </div>
                    <div className='arrowIcons'>
                        <EastIcon className='nextArrow' />
                        {listType === 'doubly' && current.next && <WestIcon className='prevArrow' />}
                    </div>
                </div>
            );
            current = current.next;
        }
        // null
        nodes.push(
            <div key="null" className="list-node">
                <div id="null-node" className="box null">NULL</div>
            </div>
        );
        return nodes;
    };

    const toggleSidePanel = () => {
        setSidePanelOpen(!sidePanelOpen);
    };

    return (
        <>
            <Navbar currentPage="Linked List" />
            <button className="side-panel-toggle" onClick={toggleSidePanel}>→</button>
            <SidePanel isOpen={sidePanelOpen} onClose={toggleSidePanel} /> {/* Render the side panel component */}
            <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} />

            <div className="linkedlist-visualizer">
                <div>
                    <div className="menu">
                        <select value={listType} onChange={handleListTypeChange}>
                            <option disabled value="">Select Linked List</option>
                            <option value="singly">Singly Linked List</option>
                            <option value="doubly">Doubly Linked List</option>
                            {/* <option disabled value="circular">Circular Linked List</option> */}
                        </select>

                        {/* insert */}
                        <select value={insertPosition} onChange={handleInsertPositionChange}>
                            <option value="Beginning">Beginning</option>
                            <option value="After Node">After Node</option>
                            {listType === 'doubly' && <option value="Before Node">Before Node</option>}
                            <option value="End">End</option>
                        </select>
                        {
                            (insertPosition === 'After Node' || insertPosition === 'Before Node') &&
                            <input
                                type="text"
                                placeholder={insertPosition === 'After Node' ? "Prev node" : "Next node"}
                                value={nodeValue}
                                onChange={handleNodeValueChange}
                            />
                        }

                        <input type="text" value={newValue} onChange={handleInputChange} placeholder="New value" />
                        <button className='visualize-btn' onClick={insertNode}>Insert</button>

                        {/* delete */}
                        <select value={deletePosition} onChange={handleDeletePositionChange}>
                            <option value="Beginning">Beginning</option>
                            <option value="Middle">Middle</option>
                            <option value="End">End</option>
                        </select>
                        {
                            deletePosition === 'Middle' &&
                            <input
                                type="text"
                                placeholder="Enter node value"
                                value={nodeValue}
                                onChange={handleNodeValueChange}
                            />
                        }
                        <button className='reset-btn' onClick={deleteNode}>Delete</button>
                    </div>

                    {/* search */}
                    <input type="text" value={searchValue} onChange={handleSearchInputChange} placeholder="Search Node" />
                    <button className='visualize-btn' onClick={searchNode}>Search Node</button>

                    <button className='' onClick={animateTraversal}>Traverse</button>
                    <button className='reset-btn' onClick={resetLinkedList}>Reset</button>
                    <div className="result">{resultText && `${resultText} ${currVal}`}</div>
                </div>

                <div className="linkedlist">
                    <div className="list">
                        {linkedlist && renderNodes()}
                    </div>
                </div>



                <div className="representation">
                    <div className="row mx-auto" id="linkedlist-pseudocode">
                        <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div className="ide w-100">
                                <div className="row ml-auto mr-auto 1">
                                    <h3>INSERT </h3>
                                    <span className="comment w-100 mt-1">
                                        Add a new element to the linked list
                                    </span>
                                    <span className="comment w-100 mt-1"> </span>
                                    <span className="comment w-100 mt-1">
                                        TIME COMPLEXITY: O(1) - O(n) depending on the position
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div className="ide w-100">
                                <div className="row ml-auto mr-auto 1">
                                    <h3>DELETE </h3>
                                    <span className="comment w-100 mt-1">
                                        Remove the existing elements
                                    </span>
                                    <span className="comment w-100 mt-1"> </span>
                                    <span className="comment w-100 mt-1">
                                        TIME COMPLEXITY: O(1) - O(n) depending on the position
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
                            <div className="ide w-100">
                                <div className="row ml-auto mr-auto 1">
                                    <h3>SEARCH </h3>
                                    <span className="comment w-100 mt-1">
                                        Find a node in the linked list
                                    </span>
                                    <span className="comment w-100 mt-1"> </span>
                                    <span className="comment w-100 mt-1">
                                        TIME COMPLEXITY: O(n)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinkedListVisualizer;
