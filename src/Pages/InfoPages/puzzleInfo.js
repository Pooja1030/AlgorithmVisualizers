import React from 'react';
import Navbar from '../../Components/navbar';

const PuzzleInfo = () => {
    return (
        <>
            <Navbar currentPage="15 Puzzle" visualizer="15-puzzle" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>15 Puzzle</h2>
                    <p>
                        The 15 Puzzle, also known as the Fifteen Puzzle, is a classic sliding puzzle consisting of a 4x4 grid of numbered tiles with one tile missing. The objective is to rearrange the tiles to achieve a specific goal, typically arranging the tiles in ascending numerical order.
                    </p>
                    <p>
                        The puzzle is solved by sliding tiles into the empty space, one at a time, to achieve the desired configuration. The puzzle has been popular for over a century and is known for its challenging nature and interesting mathematical properties.
                    </p>
                    <p>
                        The standard goal of the 15 Puzzle is to arrange the tiles in the following order:
                    </p>
                    <pre>
                        1    2   3   4
                        <br />5    6   7   8
                        <br />9   10  11  12
                        <br />13  14  15  {"  "}
                    </pre>
                    <button>
                        <a href="https://en.wikipedia.org/wiki/15_puzzle" target="_blank" rel="noopener noreferrer">Learn more about the 15 Puzzle</a>
                    </button>
                </div>
                <div className="info-section">
                    <h3>Solving Methods</h3>
                    <p>
                        There are various methods to solve the 15 Puzzle, ranging from simple trial-and-error to more advanced algorithms. Some common approaches include:
                    </p>
                    <ul>
                        <li><strong>Human Strategies:</strong> Human solvers often use a mix of intuition, pattern recognition, and systematic approaches to solve the puzzle.</li>
                        <li><strong>Heuristic Algorithms:</strong> Algorithms such as the A* search algorithm can be used to find the shortest solution path by evaluating the state of the puzzle using heuristic functions like the Manhattan distance.</li>
                        <li><strong>Iterative Deepening A* (IDA*):</strong> This is an extension of A* that uses depth-first search and a heuristic to iteratively explore deeper levels until a solution is found.</li>
                    </ul>
                </div>
                <div className="info-section">
                    <h3>Mathematical Properties</h3>
                    <p>
                        The 15 Puzzle has interesting mathematical properties. One key property is that the puzzle can be solved if and only if the permutation of the tiles is even. This is determined by calculating the parity of the permutation of the tiles.
                    </p>
                    <p>
                        Additionally, the puzzle has a maximum of 20 moves required to solve from any solvable configuration, which has been proven through extensive computational analysis.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PuzzleInfo;
