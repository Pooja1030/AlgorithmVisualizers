import React, { Component } from 'react';

class Kruskal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: [
                [0, 2, 0, 6, 0],
                [2, 0, 3, 8, 5],
                [0, 3, 0, 0, 7],
                [6, 8, 0, 0, 9],
                [0, 5, 7, 9, 0]
            ],
            vertices: 5,
            mstEdges: []
        };
    }

    find(parent, i) {
        while (parent[i] !== i) {
            i = parent[i];
        }
        return i;
    }

    union(parent, rank, x, y) {
        const xRoot = this.find(parent, x);
        const yRoot = this.find(parent, y);

        if (rank[xRoot] < rank[yRoot]) {
            parent[xRoot] = yRoot;
        } else if (rank[xRoot] > rank[yRoot]) {
            parent[yRoot] = xRoot;
        } else {
            parent[yRoot] = xRoot;
            rank[xRoot]++;
        }
    }

    kruskal() {
        const parent = [];
        const rank = [];
        const result = [];

        for (let i = 0; i < this.state.vertices; i++) {
            parent[i] = i;
            rank[i] = 0;
        }

        let e = 0;
        let i = 0;
        const edges = [];

        for (let u = 0; u < this.state.vertices; u++) {
            for (let v = u + 1; v < this.state.vertices; v++) {
                if (this.state.graph[u][v] !== 0) {
                    edges.push([u, v, this.state.graph[u][v]]);
                }
            }
        }

        edges.sort((a, b) => a[2] - b[2]);

        while (e < this.state.vertices - 1) {
            const nextEdge = edges[i++];
            const x = this.find(parent, nextEdge[0]);
            const y = this.find(parent, nextEdge[1]);

            if (x !== y) {
                result[e++] = nextEdge;
                this.union(parent, rank, x, y);
            }
        }

        this.setState({ mstEdges: result });
    }

    render() {
        const { mstEdges } = this.state;

        return (
            <div>
                <h2>Minimum Spanning Tree (Kruskal's Algorithm)</h2>
                <button onClick={() => this.kruskal()}>Generate MST</button>
                <div>
                    {mstEdges.length > 0 && (
                        <div>
                            <h3>Edges in Minimum Spanning Tree:</h3>
                            <ul>
                                {mstEdges.map((edge, index) => (
                                    <li key={index}>{edge[0]} - {edge[1]} (Weight: {edge[2]})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Kruskal;
