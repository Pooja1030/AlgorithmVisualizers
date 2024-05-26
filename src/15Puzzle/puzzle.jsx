import React, { useState, Component } from 'react';
import Navbar from '../Components/navbar';
import SidePanel from '../Components/sidepanel';
import './helpers/array_helpers';
import './style.css';
import FlipMove from 'react-flip-move';
import { times } from 'lodash';
import { ListRounded } from '@material-ui/icons';
import ComplexityAnalysis from "../Components/ComplexityAnalysis";

const FLIP_DURATION = 750;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to generate a hardcoded sequence of moves to solve the puzzle
function generateMoveSequence() {
    return [
        [0, 1], [1, 2], [2, 3], [3, 7],
        [7, 6], [6, 5], [5, 4], [4, 0],
        [0, 1], [1, 5], [5, 6], [6, 7],
        [7, 11], [11, 15]

        // !!! This is not the solution, Find & add steps here
    ];
}

class Puzzle extends Component {
    constructor() {
        super();
        this.state = {
            squares: times(16, i => ({
                value: i
            })),
            moveIndex: 0,
            moves: generateMoveSequence(),
            isPlaying: false,
            intervalId: null,
            sidePanelOpen: false, // State to manage side panel visibility
            algorithmSteps: [
                { code: ' Step 1: Shuffle the puzzle tiles randomly to create a solvable configuration.', },
                { code: ' Step 2: Implement an algorithm to solve the puzzle.', },
                { code: ' Step 3: Execute the algorithm to solve the puzzle.', },
                { code: ' Step 4: Check if the puzzle is solved.', },
                { code: ' Step 5: Display the solution steps (optional).', }],
            timeComplexity: "O(n)", // State to store time complexity
            spaceComplexity: "O(1)", // State to store space complexity
        };
    }

    componentDidMount() {
        this.setState({ intervalId: setInterval(this.handleNextStep, FLIP_DURATION) });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    handleNext = () => {
        if (this.state.moveIndex < this.state.moves.length) {
            this.setState(state => {
                const move = state.moves[state.moveIndex];
                const newSquares = state.squares.slice();
                const temp = newSquares[move[0]];
                newSquares[move[0]] = newSquares[move[1]];
                newSquares[move[1]] = temp;
                return {
                    squares: newSquares,
                    moveIndex: state.moveIndex + 1
                };
            });
        }
    };

    handlePrevious = () => {
        if (this.state.moveIndex > 0) {
            this.setState(state => {
                const move = state.moves[state.moveIndex - 1];
                const newSquares = state.squares.slice();
                const temp = newSquares[move[1]];
                newSquares[move[1]] = newSquares[move[0]];
                newSquares[move[0]] = temp;
                return {
                    squares: newSquares,
                    moveIndex: state.moveIndex - 1
                };
            });
        }
    };

    handlePlayPause = () => {
        const { isPlaying, intervalId } = this.state;
        if (isPlaying) {
            clearInterval(intervalId);
        } else {
            const newIntervalId = setInterval(this.handleNext, FLIP_DURATION);
            this.setState({ intervalId: newIntervalId });
        }
        this.setState({ isPlaying: !isPlaying });
    }


    reset = () => {
        this.setState({
            squares: times(16, i => ({
                value: i
            })),
            moveIndex: 0
        });
    };

    // Function to toggle side panel
    toggleSidePanel = () => {
        this.setState(prevState => ({
            sidePanelOpen: !prevState.sidePanelOpen,
        }));
    };

    render() {
        // const { sidePanelOpen, algorithmSteps, timeComplexity, spaceComplexity } = this.state;

        return (
            <div style={{ backgroundColor: "#57407c" }} className={'full-height'}>
                <Navbar currentPage="15 Puzzle" />

                {/* Side panel toggle button */}
                {/* <button className="side-panel-toggle" onClick={this.toggleSidePanel}>  <ListRounded className='sidepanel-icon' />
          View steps
       </button> */}

                {/* Render the side panel component */}
                {/* <SidePanel isOpen={sidePanelOpen} onClose={this.toggleSidePanel} algorithmSteps={algorithmSteps} /> */}

                <div className={'justify-content-around '} style={{ textAlign: "Center" }}>
                    <div style={{ textAlign: "center", height: "440px", width: "440px", margin: 'auto' }} className={"m-5"}>
                        <FlipMove duration={FLIP_DURATION} easing="cubic-bezier(.12,.36,.14,1.2)">
                            {this.state.squares.map((stt) => (
                                <div key={stt.value} className={stt.value === 0 ? "square " : stt.value % 2 === 0 ? 'square shadow correct pt-1' : 'square shadow painted pt-1'}>
                                    {stt.value === 0 ? "" : stt.value}
                                </div>
                            ))}
                            <br />
                        </FlipMove>
                        <button className={"btn btn-secondary m-2"} onClick={this.handlePrevious}>Previous</button>
                        <button className={"btn btn-secondary m-1"} onClick={this.handlePlayPause}>{this.state.isPlaying ? "Pause" : "Play"}</button>
                        <button className={"btn btn-secondary m-2"} onClick={this.handleNext}>Next</button>
                        <button className={"btn btn-secondary m-2"} onClick={this.reset}>Reset</button>
                    </div>
                </div>
                {/* Render time and space complexity */}

                {/* <ComplexityAnalysis
                    timeComplexity={timeComplexity}
                    spaceComplexity={spaceComplexity}
                /> */}

            </div>
        );
    }
}

export default Puzzle;
