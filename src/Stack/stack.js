import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import DiscreteSlider from '../Components/slider';
import './stack.css'; 

const StackVisualizer = () => {
    const [stack, setStack] = useState([]);
    const [maxSize, setSize] = useState(5);
    const [poppedDie, setPoppedDie] = useState(null);
    const [resultText, setResultText] = useState(null);
    const [currVal, setCurrVal] = useState(null);

    const push = () => {
        setResultText(null);
        setCurrVal(null);
        if (stack.length < maxSize) {
            const newValue = Math.floor(Math.random() * 10) + 1; // Generate random value for new die
            setStack(prevStack => [...prevStack, newValue]);
        } else {
            setResultText("");
            setCurrVal('Stack is full');
        }
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
        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
    };

    const peek = () => {
        if (stack.length > 0) {
            setResultText('Top value: ')
            setCurrVal(stack[stack.length - 1]);
        } else {
            setResultText("");
            setCurrVal('Stack is empty');
        }
    };

    const isEmpty = () => {
        setResultText('Is empty: ')
        setCurrVal(stack.length === 0 ? 'True' : 'False');
    };

    const size = () => {
        setResultText('Size: ')
        setCurrVal(stack.length);
    };


    return (
        <>
            <Navbar currentPage="Stack" />

            <div className="stack-visualizer">
                <div>
                    <div className="menu">
                        <DiscreteSlider
                            title='Stack size'
                            defaultValue={maxSize}
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
                        <div key={index} className="die">
                            {value}
                        </div>
                    ))}
                    {poppedDie && ( // Render the popped die with animation if it exists
                        <div className="die popped" onAnimationEnd={() => setPoppedDie(null)}>
                            {poppedDie}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StackVisualizer;
