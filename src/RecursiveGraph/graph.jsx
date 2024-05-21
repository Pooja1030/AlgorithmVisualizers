import React, { Component } from 'react';
import CanvasSvg from "./canvasSVG";
import { getTree } from "./fib";
import Menu from "./menu";
import Navbar from '../Components/navbar';
import Details from "./details";
import SidePanel from './sidepanelg';
import './style7.css';

class Graph extends Component {
    constructor() {
        super();
        this.state = {
            root: undefined,
            vertices: [],
            edges: [],
            current: -1,
            n: 0,
            r: 2,
            algo: 0,
            offset: 0,
            sidePanelOpen: false, // State variable for side panel visibility
            algorithmSteps: [
                { code: " Step 1: Set initial values for root, vertices, edges, current, n, r, and algo." },
                { code: " Step 2: Generate the Fibonacci tree based on the input values." },
                { code: " Step 3: Recursively traverse the tree and add vertices and edges." },
                { code: " Step 4: Update vertices and edges state to trigger re-rendering." }
            ],
            timeComplexity: 'O(n)', // Default time complexity
            spaceComplexity: 'O(n)' // Default space complexity
        }
    }

    // Function to calculate time complexity
    calculateTimeComplexity = (callback) => {
        const startTime = performance.now();
        callback();
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        this.setState({ timeComplexity: `${executionTime.toFixed(2)} milliseconds` });
    }

    // Function to calculate space complexity
    calculateSpaceComplexity = () => {
        const treeSize = this.state.vertices.length + this.state.edges.length;
        this.setState({ spaceComplexity: `${treeSize} units` });
    }

    setAlgo = (pos, val) => {
        if (pos === 0) {
            this.setState({ algo: val });
        }
    }

    setN = (pos, val) => {
        if (pos === 0) {
            this.setState({ n: val });
        }
    }

    setR = (pos, val) => {
        if (pos === 0) {
            this.setState({ r: val });
        }
    }

    toggleSidePanel = () => {
        const selectedAlgorithm = this.getSelectedAlgorithm(); // Get the selected algorithm
        const selectedAlgorithmSteps = setAlgorithmSteps(selectedAlgorithm); // Get steps for the selected algorithm
        this.setState(prevState => ({
            sidePanelOpen: !prevState.sidePanelOpen, // Toggle the side panel state
            algorithmSteps: selectedAlgorithmSteps // Update algorithm steps
        }));
    };

    getSelectedAlgorithm() {
        switch (this.state.algo) {
            case 0:
                return "Fibonacci";
            case 1:
                return "Binomial Coefficient";
            case 2:
                return "Derangement";
            case 3:
                return "Bigmod";
            case 4:
                return "Stirling2";
            // Add cases for other algorithms
            default:
                return ""; // Default case if algo value doesn't match any algorithm
        }
    }

    addNumber = () => {
        this.calculateTimeComplexity(() => {
            let tree = getTree(this.state.n, this.state.algo, this.state.r);
            this.setState({ edges: [], vertices: [], offset: tree.x });

            // Recursively traverse the tree and add vertices and edges
            this.recur(tree, undefined);

            // Calculate space complexity
            this.calculateSpaceComplexity();

            // Trigger the side panel and generate algorithm steps
            this.toggleSidePanel();
        });
    }

    recur = async (node, parent) => {
        let vertices = this.state.vertices;
        let current = this.state.vertices.length;

        if (parent !== undefined) {
            if (node.children.length)
                vertices.push({
                    label: node.tree.label,
                    val: 0,
                    x: node.x,
                    y: node.y,
                    px: parent.x,
                    py: parent.y
                });
            else
                vertices.push({
                    label: node.tree.label,
                    val: node.tree.node,
                    x: node.x,
                    y: node.y,
                    px: parent.x,
                    py: parent.y
                });

            this.setState({ vertices, current });

            let edges = this.state.edges;
            edges.push({
                x1: parent.x,
                y1: parent.y,
                x2: node.x,
                y2: node.y
            });
            this.setState({ edges });
        } else {
            if (node.children.length)
                vertices.push({
                    label: node.tree.label,
                    val: 0,
                    x: node.x,
                    y: node.y,
                    px: node.x,
                    py: node.y
                });
            else
                vertices.push({
                    label: node.tree.label,
                    val: node.tree.node,
                    x: node.x,
                    y: node.y,
                    px: node.x,
                    py: node.y
                });
            this.setState({ vertices, current });
        }
        await sleep(500);

        for (let i = 0; i < node.children.length; i++) {
            await this.recur(node.children[i], node);
            this.setState({ current });
            await sleep(500);
        }
        let verticess = [...this.state.vertices];
        verticess[current].val = node.tree.node;
        this.setState({ vertices: verticess });
    }

    render() {
        return (
            <div>
                <Navbar currentPage="Recursion Tree" />
                <Menu
                    setN={this.setN}
                    setR={this.setR}
                    onAlgoChanged={this.setAlgo}
                    onStart={() => {
                        this.addNumber();
                    }}
                    algorithmSteps={this.state.algorithmSteps} // Pass algorithm steps to the Menu component
                />
                <Details algo={this.state.algo} />
                {/* Side panel toggle button */}
                <button className="side-panel-toggle" onClick={this.toggleSidePanel}> →</button>
                {/* Side Panel */}
                <SidePanel algorithmSteps={this.state.algorithmSteps} isOpen={this.state.sidePanelOpen} onClose={this.toggleSidePanel} />
                <CanvasSvg
                    vertices={this.state.vertices}
                    edges={this.state.edges}
                    current={this.state.current}
                    offset={this.state.offset}
                />

                {/* Display time and space complexity */}
                <div className="complexity-analysis">
                    <div className="analysis-title">Complexity Analysis</div>
                    <div className="analysis-result">Time Complexity: {this.state.timeComplexity}</div>
                    <div className="analysis-result">Space Complexity: {this.state.spaceComplexity}</div>
                </div>
            </div>
        );
    }
}

function setAlgorithmSteps(task) {
    let algorithmSteps = [];
    switch (task) {
        case "Fibonacci":
            algorithmSteps = generateFibonacciSteps();
            break;
        case "Binomial Coefficient":
            algorithmSteps = generateBinomialCoefficientSteps();
            break;
        case "Derangement":
            algorithmSteps = generateDerangementSteps();
            break;
        case "Bigmod":
            algorithmSteps = generateBigmodSteps();
            break;
        case "Stirling2":
            algorithmSteps = generateStirling2Steps();
            break;
        // Add cases for other tasks
        default:
            algorithmSteps = [];
    }
    return algorithmSteps;
}

function generateFibonacciSteps() {
    return [
        { code: "Fibonacci Sequence" },
        { code: "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones." },
        { code: "Step 1: Set initial values for the first two Fibonacci numbers." },
        { code: "Step 2: Calculate the next Fibonacci number by adding the previous two numbers." },
        { code: "Step 3: Repeat step 2 until the desired number of Fibonacci numbers are generated." }
    ];
}

function generateBinomialCoefficientSteps() {
    return [
        { code: "Binomial Coefficient" },
        { code: "The binomial coefficient is a mathematical function that gives the number of combinations of size k that can be chosen from n distinct items." },
        { code: "Step 1: Define the binomial coefficient formula." },
        { code: "Step 2: Calculate the factorial of the input values." },
        { code: "Step 3: Apply the binomial coefficient formula to calculate the result." }
    ];
}

// Function to generate steps for the Derangement task
function generateDerangementSteps() {
    return [
        { code: "Derangement" },
        { code: "A derangement is a permutation of the elements of a set, such that no element appears in its original position." },
        { code: "Step 1: Determine the total number of elements in the set." },
        { code: "Step 2: Calculate the number of derangements using a recursive formula or combinatorial method." },
        { code: "Step 3: Use the calculated value to solve problems related to permutations with restrictions." }
    ];
}

// Function to generate steps for the Bigmod task
function generateBigmodSteps() {
    return [
        { code: "Bigmod" },
        { code: "Bigmod is a mathematical operation to calculate large exponents modulo a number efficiently." },
        { code: "Step 1: Define the base, exponent, and modulus." },
        { code: "Step 2: Implement an efficient algorithm such as binary exponentiation to compute (base^exponent) % modulus." },
        { code: "Step 3: Return the result of the bigmod operation." }
    ];
}

// Function to generate steps for the Stirling2 task
function generateStirling2Steps() {
    return [
        { code: "Stirling2" },
        { code: "Stirling numbers of the second kind represent the number of ways to partition a set of n elements into k non-empty subsets." },
        { code: "Step 1: Determine the total number of elements in the set (n) and the number of subsets (k)." },
        { code: "Step 2: Use a recursive or combinatorial method to calculate the Stirling number of the second kind for the given parameters." },
        { code: "Step 3: Interpret the calculated value in the context of combinatorial problems involving partitions and subsets." }
    ];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Graph;
