import React, { Component } from 'react';
import './Prim.css';


class Prim extends Component {
    static steps = [
        { code: " Step 1: Initialize the start node and the open set." },
        { code: " Step 2: Loop until the open set is empty." },
        { code: " Step 3: Select the node with the lowest f score from the open set." },
        { code: " Step 4: If the selected node is the finish node, reconstruct the path." },
        { code: " Step 5: Generate the neighbors of the selected node." },
        { code: " Step 6: For each neighbor, calculate tentative g score and add it to the open set." },
        { code: " Step 7: Repeat the loop." }
        // Add more steps as needed
    ];
    constructor(props) {
        super(props);
        this.state = {
            vertices: [],
            edges: [],
            animationSpeed: 1000,
            visited: new Set(),
            mstEdges: [],
        };
    }

    componentDidMount() {
        this.generateGraph();
    }

    generateGraph() {
        const vertices = [];
        const edges = [];

        // Generate random values for vertices
        for (let i = 1; i <= 5; i++) {
            vertices.push(Math.floor(Math.random() * 100)); // Random values between 0 and 99
        }

        // Generate random edges with weights
        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                const u = vertices[i];
                const v = vertices[j];
                const weight = Math.floor(Math.random() * 10) + 1; // Random weight between 1 and 10
                edges.push([u, v, weight]);
            }
        }

        // Sorting edges by weight
        edges.sort((a, b) => a[2] - b[2]);

        this.setState({ vertices, edges }, () => {
            this.prim();
        });
    }

    async prim() {
        const { vertices, edges, animationSpeed } = this.state;

        const visited = new Set();
        const mstEdges = [];

        for (let i = 0; i < edges.length; i++) {
            const [u, v, weight] = edges[i];
            visited.add(u);
            visited.add(v);
            mstEdges.push([u, v]);
            this.setState({ visited, mstEdges: [...mstEdges] });
            await new Promise(resolve => setTimeout(resolve, animationSpeed));
        }
    }

    render() {
        const { vertices, visited, mstEdges } = this.state;

        return (
            <div className="container">
                <div className="graph">
                    <h2>Minimum Spanning Tree (Prim's Algorithm)</h2>
                    <svg className="canvas" viewBox={`0 0 600 200`}>
                        {mstEdges.map(([u, v], index) => (
                            <line
                                key={index}
                                x1={(u - 1) * 100 + 50}
                                y1="100"
                                x2={(v - 1) * 100 + 50}
                                y2="100"
                                className="edge"
                            />
                        ))}
                        {vertices.map((vertex, index) => (
                            <g key={index}>
                                <circle cx={(index) * 100 + 50} cy="100" r="20" className="vertex" />
                                <text x={(index) * 100 + 50} y="105" textAnchor="middle" className={visited.has(vertex) ? "visited-vertex-text" : "vertex-text"}>
                                    {vertex}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
                <div className="representation">
                    <div className="row ml-auto mr-auto mt-1">
                        <div className="ide w-100">
                            <span>q = graph.getNeighbours(start).sortAscending()</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 2">
                            <span>mst = [start]</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 3">
                            <span><span className="op">while</span>(!q.empty())</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 4">
                            <span>next = q.popFirst()</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 5">
                            <span><span className="op">if</span>(notVisited(next.vertex))</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 6">
                            <span>visit(next.vertex)</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 7">
                            <span>q.add(graph.getNeighbours(next.vertex))</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 8">
                            <span>q.sortAscending()</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1 9">
                            <span>mst.append(next.vertex)</span>
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
                            <span className="comment">1. Mark all vertices as unvisited.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">2. Visit the first vertex.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">3. Find all edges of the vertex and add them to a queue
                                (cost ascending).</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">4. Dequeue the first element.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">
                                - If the destination vertex has been visited, ignore the
                                edge.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">
                                - If it's not been visited, visit it and repeat steps 3 -
                                4.</span>
                        </div>
                        <div className="row ml-auto mr-auto mt-1">
                            <span className="comment">5. The visited vertices and edges form the minimum spanning
                                tree of the graph.</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Prim;
