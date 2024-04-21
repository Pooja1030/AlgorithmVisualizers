import React, { Component } from 'react';

class Prim extends Component {
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
            parent: []
        };
    }

    minKey(key, mstSet) {
        let min = Infinity,
            min_index = -1;

        for (let v = 0; v < this.state.vertices; v++) {
            if (mstSet[v] === false && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        }

        return min_index;
    }

    Prim() {
        const parent = [];
        const key = [];
        const mstSet = [];

        for (let i = 0; i < this.state.vertices; i++) {
            key[i] = Infinity;
            mstSet[i] = false;
        }

        key[0] = 0;
        parent[0] = -1;

        for (let count = 0; count < this.state.vertices - 1; count++) {
            const u = this.minKey(key, mstSet);
            mstSet[u] = true;

            for (let v = 0; v < this.state.vertices; v++) {
                if (this.state.graph[u][v] !== 0 && mstSet[v] === false && this.state.graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = this.state.graph[u][v];
                }
            }
        }

        this.setState({ parent });
    }

    render() {
        const { parent } = this.state;

        return (
            <div>
                <h2>Minimum Spanning Tree (Prim's Algorithm)</h2>
                <button onClick={() => this.Prim()}>Generate MST</button>
                <div>
                    {parent.length > 0 && (
                        <div>
                            <h3>Edges in Minimum Spanning Tree:</h3>
                            <ul>
                                {parent.slice(1).map((p, i) => (
                                    <li key={i}>{p + 1} - {i + 1}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Prim;
