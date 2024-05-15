import React, { Component } from 'react';
import Navbar from "../Components/navbar";
import DiscreteSlider from '../Components/slider';
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
			algorithm: 'kruskal', // Default algorithm
			maxVertices: 5,
			animationSpeed: 50,
			isAnimating: false // Flag to track animation state
		};
		this.animationTimeline = gsap.timeline({ paused: true }); // Initialize GSAP timeline
	}

	componentDidMount() {
		// Initialize your graph data, generate vertices, etc.
		this.generateVertices();
		// this.calculateMST();
	}

	handleAlgorithmChange = (event) => {
		this.setState({ algorithm: event.target.value });
		this.setState({ visitedEdges: [], mstEdges: [] }); // Clear vertices and MST edges
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

	render() {
		const { vertices, edges, visitedEdges, mstEdges, maxHeight, maxWidth, algorithm, animationSpeed } = this.state;
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
						<button className='visualize-btn' onClick={() => this.calculateMST()}>Visualize</button>
						<button className='reset-btn' onClick={() => this.generateVertices()}>Reset</button>
					</div>
				</div>
				{/* Render any UI elements here */}
				<Canvas vertices={vertices} mstEdges={mstEdges} connectingEdges={edges} visitedEdges={visitedEdges}
					width={maxWidth} height={maxHeight} speed={animationSpeed}/>

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

