import React, { Component } from 'react';
import './Kruskal.css';
// import sidePanel from './sidepanelm'; // Import the SidePanel component


class Kruskal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vertices: [],
            edges: [],
            mstEdges: [], // Store edges of the minimum spanning tree
            animationSpeed: 1000,
            // sidePanelOpen: false // State to manage side panel visibility
        };
    }

    componentDidMount() {
        this.generateGraph();
        this.runKruskalAlgorithm();
    }

    generateGraph() {
        const vertices = Array.from({ length: 5 }, (_, index) => ({
            id: index,
            x: (index + 1) * 100,
            y: 100,
            label: this.generateRandomLabel(),
        }));

        this.setState({ vertices });
    }

    generateRandomLabel() {
        // Function to generate a random vertex label
        return Math.floor(Math.random() * 1000);
    }

    runKruskalAlgorithm() {
        // Sample graph edges for demonstration
        const edges = [
            [0, 1, 2],
            [0, 3, 6],
            [1, 2, 3],
            [1, 3, 8],
            [1, 4, 5],
            [2, 4, 7],
            [3, 4, 9]
        ];

        // Sorting edges by weight
        edges.sort((a, b) => a[2] - b[2]);

        // Animation delay based on the speed
        const animationDelay = this.state.animationSpeed;

        // Function to animate MST edges sequentially
        const animateMST = async () => {
            for (let i = 0; i < edges.length; i++) {
                const [u, v, weight] = edges[i];
                this.setState({ mstEdges: this.state.mstEdges.concat([[u, v]]) });
                await new Promise(resolve => setTimeout(resolve, animationDelay));
            }
        };

        // Start animation
        animateMST();
    }

    // toggleSidePanel = () => {
    //     this.setState(prevState => ({
    //         sidePanelOpen: !prevState.sidePanelOpen
    //     }));
    // };

    render() {
        return (
            <>
            {/* Render the side panel toggle button */}
            {/* <button className="side-panel-toggle" onClick={this.toggleSidePanel}>→</button> */}
                {/* Render the SidePanel component */}
                {/* <sidePanel isOpen={this.state.sidePanelOpen} onClose={this.toggleSidePanel} /> */}
                {/* Render the rest of the Kruskal component */}
            <div className="container">
                <div className="graph">
                    <h2>Minimum Spanning Tree (Kruskal's Algorithm)</h2>
                    <svg className="canvas" viewBox={`0 0 600 200`}>
                        {this.state.mstEdges.map(([u, v], index) => (
                            <line
                                key={index}
                                x1={this.state.vertices[u].x}
                                y1={this.state.vertices[u].y}
                                x2={this.state.vertices[v].x}
                                y2={this.state.vertices[v].y}
                                className="edge"
                            />
                        ))}
                        {this.state.vertices.map(({ id, x, y, label }) => (
                            <g key={id}>
                                <circle cx={x} cy={y} r="20" className="vertex" />
                                <text x={x} y={y + 5} textAnchor="middle" className="vertex-text">{label}</text>
                            </g>
                        ))}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3"
                                orient="auto" fill="#007bff">
                                <polygon points="0 0, 10 3, 0 6" />
                            </marker>
                        </defs>
                    </svg>
                </div>
                <div className="representation">
                    <div className="ide w-100">
                        <div className="row ml-auto mr-auto 1">
                            <span>q = graph.getEdges().sortAscending()</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 2">
                            <span>mst = []</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 3">
                            <span><span className="op"> while</span> (mst.length &lt; graph.numVertices() - 1)</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 4">
                            <span>next = q.popFirst()</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 5">
                            <span><span className="op"> if</span> (!formsCycle(mst, cycle))</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 6">
                            <span>mst.push(next)</span>
                        </div>
                    </div>
                    <div className="explanation w-100">
                        <div className="row ml-auto mr-auto">
                            <span className="comment w-100">SHORT EXPLANATION</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment w-100">---------------------</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">1. Sort all the edges by weight (non-decreasing)</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">2. Pick the edge with the smallest weight.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">3. Check if adding that edge to the MST forms a cycle. IF it doesn't,add it.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">4. Repeat steps 2 and 3 until MST has a length of (number of Vertices - 1).</span>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Kruskal;
