import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import FlipMove from 'react-flip-move';
import '../helpers/array_helpers';
import './style.css';
import { times } from 'lodash';
import SidePanel from './sidepanelp';

const FLIP_DURATION = 750;

const Puzzle = () => {
    const [squares, setSquares] = useState(times(16, i => ({ value: i })));
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [algorithmSteps, setAlgorithmSteps] = useState([
        { 
            code: ' Step 1: Shuffle the puzzle tiles randomly to create a solvable configuration.',
            description: 'Shuffle the puzzle tiles randomly to create a solvable configuration. This step ensures that the puzzle starts in a randomized state, allowing for a challenge to solve.'
        },
        { 
            code: ' Step 2: Implement an algorithm to solve the puzzle.',
            description: 'Implement an algorithm to solve the puzzle. There are various algorithms available for solving puzzles like the 15 Puzzle, such as A* search algorithm, breadth-first search, depth-first search, etc. Choose an algorithm that suits your needs and implement it.'
        },
        { 
            code: ' Step 3: Execute the algorithm to solve the puzzle.',
            description: 'Execute the implemented algorithm to solve the puzzle. This step involves running the algorithm on the initial puzzle configuration generated in step 1. The algorithm will systematically rearrange the tiles until the puzzle is solved.'
        },
        { 
            code: ' Step 4: Check if the puzzle is solved.',
            description: 'Check if the puzzle is solved after executing the algorithm. Verify whether the puzzle tiles are arranged in the correct order according to the puzzle rules. If the puzzle is solved, proceed to the next step; otherwise, continue executing the algorithm.'
        },
        { 
            code: ' Step 5: Display the solution steps (optional).',
            description: 'Display the solution steps if desired. Once the puzzle is solved, you may want to show the sequence of moves or steps taken to solve the puzzle. This can provide insights into the solving process and help users understand how the solution was achieved.'
        }
        // Add more steps as needed
    ]);
    const [timeComplexity, setTimeComplexity] = useState('');
    const [spaceComplexity, setSpaceComplexity] = useState('');

    const balsal = async () => {
        // Open side panel when the user clicks on the "Animate" button
        setSidePanelOpen(true);

        // Measure time complexity
        const start = performance.now();

        for (let i = 0; i < 15; i++) {
            setSquares(prevSquares => prevSquares.slice().swap(i, i + 1));
            await sleep(500);
        }

        const end = performance.now();
        const duration = end - start;
        setTimeComplexity(`O(n) - ${duration.toFixed(2)} ms`);

        // Measure space complexity
        const space = 1024; // Example space allocation
        setSpaceComplexity(`O(1) - ${space} bytes`);
    }

    const toggleSidePanel = () => {
        setSidePanelOpen(prevState => !prevState);
    };

    return (
        <div style={{ backgroundColor: "#57407c" }} className={'full-height'}>
            <Navbar currentPage="15 Puzzle" />
            <div className={'justify-content-around '} style={{ textAlign: "center" }}>
                <div style={{ textAlign: "center", height: "440px", width: "440px", margin: 'auto' }} className={"m-5"}>
                    <FlipMove duration={FLIP_DURATION} easing="cubic-bezier(.12,.36,.14,1.2)">
                        {squares.map((stt) =>
                            <div key={stt.value} className={stt.value === 0 ? "square " : stt.value % 2 === 0 ? 'square shadow correct pt-1' : 'square shadow painted pt-1'}>
                                {stt.value === 0 ? "" : stt.value}
                            </div>
                        )}
                        <br />
                    </FlipMove>
                    <button className={"btn btn-secondary"} onClick={balsal}>Animate</button>
                </div>
                <button className="side-panel-toggle" onClick={toggleSidePanel}>→</button>
                <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={toggleSidePanel} />

                {/* Render time and space complexity */}
                <div className="complexity-analysis">
                    <div className="analysis-title">Time Complexity</div>
                    <div className="analysis-result">{timeComplexity}</div>
                    <div className="analysis-title">Space Complexity</div>
                    <div className="analysis-result">{spaceComplexity}</div>
                </div>
            </div>
        </div>
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Puzzle;
