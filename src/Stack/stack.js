import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import DiscreteSlider from '../Components/slider';
import SidePanel from './sidePanelS'; // Import the SidePanel component
import './stack.css';
import { gsap } from 'gsap';

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [maxSize, setSize] = useState(5);
    const [poppedDie, setPoppedDie] = useState(null);
    const [resultText, setResultText] = useState(null);
    const [currVal, setCurrVal] = useState(null);
    const [sidePanelOpen, setSidePanelOpen] = useState(false); // State to manage side panel visibility
    const [algorithmSteps, setAlgorithmSteps] = useState([]); // Define state for algorithm steps
    const [timeComplexity, setTimeComplexity] = useState(null); // State to store time complexity
    const [spaceComplexity, setSpaceComplexity] = useState(null); // State to store space complexity

    // Function to measure time complexity of stack operations
    const measureTimeComplexity = (operation) => {
        let timeComplexity = "";
        // Execute the stack operation here
        if (operation === 'push') {
            timeComplexity = "O(1)";
        } else if (operation === 'pop') {
            timeComplexity = "O(1)";
        } else if (operation === 'peek') {
            timeComplexity = "O(1)";
        } else if (operation === 'isEmpty') {
            timeComplexity = "O(1)";
        } else if (operation === 'size') {
            timeComplexity = "O(1)";
        }
        setTimeComplexity(timeComplexity); // Set the time complexity
    };

    // Function to measure space complexity of stack operations
    const measureSpaceComplexity = (operation) => {
        // Analyze the space requirements of the stack operation
        // Set space complexity value accordingly
        const space = operation === 'push' ? 1 : operation === 'pop' ? -1 : 0; // Example space complexity logic
        setSpaceComplexity(space);
    };

    // Function to perform stack operation analysis
    const analyzeStackOperation = (operation) => {
        measureTimeComplexity(operation);
        measureSpaceComplexity(operation);
    };



    const push = () => {
        setResultText(null);
        setCurrVal(null);
        if (stack.length < maxSize) {
            const newValue = Math.floor(Math.random() * 10) + 1; // Generate random value for new die
            setStack(prevStack => [...prevStack, newValue]);
            setResultText('Pushed: ');
            setCurrVal(newValue);
            triggerSidePanel('Push');
        } else {
            setResultText("");
            setCurrVal('Stack is full');
        }
        analyzeStackOperation('push');
    };

    const pop = () => {
        if (stack.length > 0) {
            setResultText('Popped: ');
            setCurrVal(stack[stack.length - 1]);
            setPoppedDie(stack[stack.length - 1]); // Store the popped die
            setStack(prevStack => prevStack.slice(0, -1)); // Remove top die from stack
            setTimeout(() => {
                setPoppedDie(null); // Clear the popped die after the animation duration
            }, 500); // Adjust animation duration as needed
            triggerSidePanel('Pop');
        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
        analyzeStackOperation('pop');
    };

    const peek = () => {
        if (stack.length > 0) {
            setResultText('Top value: ')
            setCurrVal(stack[stack.length - 1]);
            const timeline = gsap.timeline();
            timeline.to(".top", { background: "#992155", duration: 0.5 });
            timeline.to(".top", { background: "#fb21d3", duration: 0.5, delay: 1 });
        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
        analyzeStackOperation('peek');
    };

    const isEmpty = () => {
        setResultText('Is empty: ')
        setCurrVal(stack.length === 0 ? 'True' : 'False');
        analyzeStackOperation('isEmpty');
    };

    const size = () => {
        setResultText('Size: ')
        setCurrVal(stack.length);
        analyzeStackOperation('size');
    };

    const toggleSidePanel = () => {
        setSidePanelOpen(!sidePanelOpen);
    };

    const triggerSidePanel = (operation) => {
        setSidePanelOpen(true);
        switch (operation) {
            case 'Push':
                setAlgorithmSteps([
                    { code: "Push Operation" },
                    { code: "Step 1: First, check whether or not the stack is full" },
                    { code: "Step 2: If the stack is complete, then exit" },
                    { code: "Step 3: If not, increment the top by one" },
                    { code: "Step 4: Insert a new element where the top is pointing" },
                    { code: "Step 5: Success" }
                ]);
                break;
            case 'Pop':
                setAlgorithmSteps([
                    { code: "Pop Operation" },
                    { code: "Step 1: First, check whether or not the stack is empty" },
                    { code: "Step 2: If the stack is empty, then exit" },
                    { code: "Step 3: If not, access the topmost data element" },
                    { code: "Step 4: Decrement the top by one" },
                    { code: "Step 5: Success" }
                ]);
                break;
            case 'IsEmpty':
                setAlgorithmSteps([
                    { code: "IsEmpty Operation" },
                    { code: "Step 1: Check if the stack is empty" },
                    { code: "Step 2: If the stack is empty, return true" },
                    { code: "Step 3: If not, return false" }
                ]);
                break;
            case 'Peek':
                setAlgorithmSteps([
                    { code: "Peek Operation" },
                    { code: "Step 1: Check if the stack is empty" },
                    { code: "Step 2: If the stack is empty, display an error message" },
                    { code: "Step 3: If not, return the top element of the stack" }
                ]);
                break;
            case 'Size':
                setAlgorithmSteps([
                    { code: "Size Operation" },
                    { code: "Step 1: Get the number of elements in the stack" },
                    { code: "Step 2: Return the count of elements" }
                ]);
                break;
            default:

                break;
        }
    };


    return (
        <>
            <Navbar currentPage="Stack" />
            {/* Side panel toggle button */}
            <button className="side-panel-toggle" onClick={toggleSidePanel}>→</button>
            {/* Render the side panel component */}
            <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} />
            <div className="stack-visualizer">
                <div>
                    <div className="menu">
                        <DiscreteSlider
                            title='Stack size'
                            default={maxSize}
                            onCountChange={setSize}
                            step={1}
                            min={1}
                            max={10} />
                        <button className='visualize-btn' onClick={push}>Push</button>
                        <button className='reset-btn' onClick={pop}>Pop</button>
                        <button onClick={peek}>Peek</button>
                        <button onClick={isEmpty}>IsEmpty</button>
                        <button onClick={size}>Size</button>
                    </div>
                    <div className="result">{currVal !== null && `${resultText} ${currVal}`}</div>
                </div>

                <div className="stack">
                    {stack.map((value, index) => (
                        <div key={index} className={`die ${index === stack.length - 1 ? "top" : ""}`}>
                            {value}
                        </div>
                    ))}
                    {poppedDie && ( // Render the popped die with animation if it exists
                        <div className="die popped" onAnimationEnd={() => setPoppedDie(null)}>
                            {poppedDie}
                        </div>
                    )}
                </div>

                {/* Display time and space complexity analysis */}
                {(timeComplexity || spaceComplexity) && <div className="complexity-analysis">
                    <div className="analysis-title">Time Complexity</div>
                    <div className="analysis-result">{timeComplexity !== null && `Time complexity: ${timeComplexity}`}</div>
                    <div className="analysis-title">Space Complexity</div>
                    <div className="analysis-result">{spaceComplexity !== null && `Space complexity: ${spaceComplexity}`}</div>
                </div>
                }</div>
        </>
    );
};

export default StackVisualizer;
