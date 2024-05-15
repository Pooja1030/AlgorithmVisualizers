import React, { Component } from 'react';
import Navbar from "../Components/navbar";
import DiscreteSlider from '../Components/slider';
import SidePanel from '../Components/sidepanel';
import Canvas from './canvas'; // Assuming you have a Canvas component for drawing
import kruskal from './kruskal';
import prim from './prim';
import { gsap } from 'gsap';

class MST extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vertices: [],
			edges: [],
			visitedEdges: [],
			mstEdges: [],
			maxWidth: 700,
			maxHeight: 500,
			algorithm: '', // Default algorithm
			maxVertices: 5,
			animationSpeed: 50,
			isAnimating: false, // Flag to track animation state

			sidePanelOpen: false,
			algorithmSteps: [],
			timeComplexity: "",
			spaceComplexity: "",
		};
		this.animationTimeline = gsap.timeline({ paused: true }); // Initialize GSAP timeline
	}

	componentDidMount() {
		// Initialize your graph data, generate vertices, etc.
		this.generateVertices();
		// const { algorithm } = this.state;
	
		// this.calculateMST();
	}

	handleAlgorithmChange = (event) => {
		const algorithm = event.target.value;
		this.setState({ algorithm, visitedEdges: [], mstEdges: [] }); // Clear vertices and MST edges
		this.setAlgoSteps(algorithm);
		const timeComplexity = this.calculateTimeComplexity(algorithm);
		const spaceComplexity = this.calculateSpaceComplexity(algorithm);
		this.setState({ timeComplexity, spaceComplexity });
	
	}

	// Define the method to set the animation speed
	setAnimationSpeed = (value) => {
		this.setState({ animationSpeed: value });
	}


	// Define the method to set the maximum number of vertices
	setMaxVertices = (value) => {
		this.setState({ maxVertices: value });
		this.generateVertices();
	}


	generateVertices() {
		this.setState({ vertices: [], edges: [], visitedEdges: [], mstEdges: [] }); // Clear vertices and MST edges
		const numVertices = this.state.maxVertices; // Change this to adjust the number of vertices
		const { maxHeight, maxWidth } = this.state; // Change this to adjust the maximum coordinate value

		const vertices = [];
		for (let i = 0; i < numVertices; i++) {
			// Generate random x and y coordinates
			const x = Math.floor(Math.random() * (maxWidth));
			const y = Math.floor(Math.random() * (maxHeight));
			// Add the vertex to the vertices array
			vertices.push({ id: i, x, y });
		}

		const edges = findConnectingEdges(vertices);

		// Update the component's state with the generated vertices
		this.setState({ vertices, edges });
	}

	calculateMST() {
		const { vertices, edges, algorithm } = this.state;
		let mstEdges = [];
		let visitedEdges = []; // List to store visited edges

		if (algorithm === 'kruskal') {
			({ mstEdges, visitedEdges } = kruskal(vertices, edges));
		} else if (algorithm === 'prim') {
			({ mstEdges, visitedEdges } = prim(vertices, edges));
		}

		this.setState({ mstEdges, visitedEdges });
	}

	visualize() {
		this.calculateMST()
		this.setState({ sidePanelOpen: true });
	}

	setAlgoSteps = (algorithm) => {
		let algorithmSteps = [];
		if (algorithm === "kruskal") {
			algorithmSteps = [
				{ code: " Step 1: Sort all the edges by weight (non-decreasing)." },
				{ code: " Step 2: Pick the edge with the smallest weight." },
				{ code: " Step 3: Check if adding that edge to the MST forms a cycle. If it doesn't, add it." },
				{ code: " Step 4: Repeat steps 2 and 3 until the MST has a length of (number of Vertices - 1)." }
				// Add more steps as needed
			];
		} else if (algorithm === "prim") {
			algorithmSteps = [
				{ code: " Step 1: Initialize the start node and the open set." },
				{ code: " Step 2: Loop until the open set is empty." },
				{ code: " Step 3: Select the node with the lowest f score from the open set." },
				{ code: " Step 4: If the selected node is the finish node, reconstruct the path." },
				{ code: " Step 5: Generate the neighbors of the selected node." },
				{ code: " Step 6: For each neighbor, calculate tentative g score and add it to the open set." },
				{ code: " Step 7: Repeat the loop." }
				// Add more steps as needed
			];
		}
		this.setState({ algorithmSteps });
	}

	// Function to calculate time complexity based on the selected algorithm
	calculateTimeComplexity(algorithm) {
		let timeComplexity = "";
		switch (algorithm) {
			case "prim":
				timeComplexity = "O(V^2)"; // Real time complexity of Prim's Algorithm
				break;
			case "kruskal":
				timeComplexity = "O(E log V)"; // Real time complexity of Kruskal's Algorithm
				break;
			default:
				timeComplexity = "";
		}
		return timeComplexity;
	}

	// Function to calculate space complexity based on the selected algorithm
	calculateSpaceComplexity(algorithm) {
		let spaceComplexity = "";
		switch (algorithm) {
			case "prim":
				spaceComplexity = "O(V)"; // Real space complexity of Prim's Algorithm
				break;
			case "kruskal":
				spaceComplexity = "O(E + V)"; // Real space complexity of Kruskal's Algorithm
				break;
			default:
				spaceComplexity = "";
		}
		return spaceComplexity;
	}

	toggleSidePanel = () => {
		this.setState((prevState) => ({ sidePanelOpen: !prevState.sidePanelOpen }));
	};


	render() {
		const { vertices, edges, visitedEdges, mstEdges, maxHeight, maxWidth, algorithm, animationSpeed } = this.state;
		const { sidePanelOpen, algorithmSteps, timeComplexity, spaceComplexity } = this.state;

		return (
			<div>
				<Navbar currentPage="Minimum Spanning Tree" />
				<div className='menu'>
					{/* <label>Select Algorithm:</label> */}
					<select value={algorithm} onChange={this.handleAlgorithmChange}>
						<option disabled value="">Select Algorithm</option>
						<option value="kruskal">Kruskal's Algorithm</option>
						<option value="prim">Prim's Algorithm</option>
					</select>
					<DiscreteSlider
						title='No. of vertices'
						default={this.state.maxVertices}
						onCountChange={this.setMaxVertices}
						step={1}
						min={3}
						max={10} />
					<DiscreteSlider
						title='Speed'
						default={this.state.animationSpeed}
						onCountChange={this.setAnimationSpeed}
						step={5}
						min={10}
						max={100}
					/>

					<div>
						<button className='visualize-btn' onClick={() => this.visualize()}>Visualize</button>
						<button className='reset-btn' onClick={() => this.generateVertices()}>Reset</button>
					</div>
				</div>

				<button className="side-panel-toggle" onClick={this.toggleSidePanel}>
					→
				</button>

				<SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />

				{/* Render any UI elements here */}
				<Canvas vertices={vertices} mstEdges={mstEdges} connectingEdges={edges} visitedEdges={visitedEdges}
					width={maxWidth} height={maxHeight} speed={animationSpeed} />


				{algorithm && (
					<div className="complexity-analysis">
						<div className="analysis-title">Time Complexity:</div>
						<div className="analysis-result">{timeComplexity !== null ? `${timeComplexity} ms` : "Not measured"}</div>
						<div className="analysis-title">Space Complexity:</div>
						<div className="analysis-result">{spaceComplexity !== null ? `O(${spaceComplexity})` : "Not measured"}</div>
					</div>

				)}

			</div>
		);
	}
}

export default MST;


function findConnectingEdges(vertices) {
	const connectingEdges = [];

	// Iterate over all possible edges between vertices
	for (let i = 0; i < vertices.length; i++) {
		for (let j = i + 1; j < vertices.length; j++) {
			const vertex1 = vertices[i];
			const vertex2 = vertices[j];
			const weight = calculateDistance(vertices[i], vertices[j]);
			const newEdge = {
				from: vertex1,
				to: vertex2,
				weight,
				id: vertex1.id + "-" + vertex2.id
			};
			connectingEdges.push(newEdge);
		}
	}

	return connectingEdges;
}


function calculateDistance(vertex1, vertex2) {
	const dx = vertex1.x - vertex2.x;
	const dy = vertex1.y - vertex2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

