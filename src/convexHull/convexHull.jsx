import React, { Component } from 'react';
import Canvas from "./canvas";
import Navbar from '../Components/navbar';
import Menu from "./menu";
import SidePanel from './sidepanelh'; // Import SidePanel component

class ConvexHull extends Component {
    state = {
        dots: [],
        lines: [],
        isAlgoLive: false,
        width: 100,
        height: 100,
        isRunning: false,
        speed: 100,
        number: 50,
        sidePanelOpen: false, // State to manage side panel visibility
        algorithmSteps: [
            { description: 'Step 1: Choose the point with the lowest y-coordinate. If there are multiple points, choose the leftmost one.' },
            { description: 'Step 2: Sort the remaining points by the polar angle they make with the chosen point.' },
            { description: 'Step 3: Iterate through the sorted points and add them to the convex hull if they make a counterclockwise turn with the last two points on the hull.' },
            { description: 'Step 4: Continue adding points until you reach the starting point again.' },
            { description: 'Step 5: The set of points added forms the convex hull.' }
        ],
        timeComplexity: '', // State to hold time complexity
        spaceComplexity: '' // State to hold space complexity
    }

    constructor() {
        super();
        this.setState({ width: window.innerWidth, height: window.innerHeight - 200 });
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight - 100,
            dots: getNewDots(this.state.number)
        });
        this.calculateComplexities(); // Calculate complexities after dots are set
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dots !== this.state.dots) {
            this.calculateComplexities(); // Recalculate complexities if dots change
        }
    }

    render() {
        return (
            <div>
                <Navbar currentPage="Convex Hull" />
                {/* Display time and space complexities */}
                <div className="complexities">
                    <p>Time Complexity: {this.state.timeComplexity}</p>
                    <p>Space Complexity: {this.state.spaceComplexity}</p>
                </div>
                {/* Rest of the component */}
                {/* Side panel toggle button */}
                <button className="side-panel-toggle" onClick={this.toggleSidePanel}>
                    →
                </button>

                {/* Render the side panel component */}
                <SidePanel isOpen={this.state.sidePanelOpen} onClose={this.toggleSidePanel} algorithmSteps={this.state.algorithmSteps} />

                <Menu
                    onRefresh={this.handleRefreshDots}
                    onVisualize={this.handleVisualize}
                    onChangeSpeed={this.changeSpeed}
                    onChangeValues={this.handleValueIncease}
                />
                <Canvas
                    width={this.state.width}
                    height={this.state.height}
                    dots={this.state.dots}
                    onTurnOff={this.handleTurnOff}
                    onGoing={this.state.isRunning}
                    speed={this.state.speed}
                />
            </div>
        );
    }

    calculateComplexities() {
        // You can calculate the complexities based on the current state or data
        // For example, you can estimate time and space complexities based on the number of dots
        const timeComplexity = 'O(n log n)'; // Placeholder value, replace with actual calculation
        const spaceComplexity = 'O(n)'; // Placeholder value, replace with actual calculation
        this.setState({ timeComplexity, spaceComplexity });
    }

    handleValueIncease = (value) => {
        this.setState({ number: value });
        this.handleRefreshDots();
    }

    changeSpeed = (speed) => {
        this.setState({ speed: 600 - speed * 10 });
    }

    toggleSidePanel = () => {
        this.setState(prevState => ({ sidePanelOpen: !prevState.sidePanelOpen }));
    }

    handleVisualize = () => {
        this.setState({ isRunning: true, sidePanelOpen: true }); // Open side panel when visualizing
    }

    handleTurnOff = () => {
        this.setState({ isRunning: false });
    }

    handleRefreshDots = () => {
        this.setState({ isRunning: false });
        this.setState({ dots: getNewDots(this.state.number) });
    }

    handleMoreDot = () => {
        const row = Math.floor(Math.random() * 400) + 10;
        const col = Math.floor(Math.random() * 400) + 10;
        const dot = {
            row: row,
            col: col
        }
        const dots = this.state.dots;
        dots.push(dot);
        this.setState(dots);
    }
}

function getNewDots(number) {
    const dots = [];
    for (let i = 0; i < number; i++) {
        dots.push(getDot());
    }
    dots.sort((a, b) => {
        if (a.xx !== b.xx) {
            return a.xx - b.xx;
        } else {
            return a.yy - b.yy;
        }
    });
    return dots;
}

function getDot() {
    const width = window.innerWidth - 50;
    const height = window.innerHeight - 250;
    const rowpos = Math.floor(Math.random() * height) + 25;
    const colpos = Math.floor(Math.random() * width) + 25;
    return {
        xx: colpos,
        yy: rowpos,
    }
}

export default ConvexHull;
