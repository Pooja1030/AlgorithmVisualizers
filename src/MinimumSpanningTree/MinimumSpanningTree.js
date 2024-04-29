// MinimumSpanningTree.js
import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Prim from './Prim';
import Kruskal from './Kruskal';

class MinimumSpanningTree extends Component {
    constructor() {
        super();
        this.state = {
            selectedAlgo: "",
        };
    }

    componentDidMount() {
        // Display "Visualize" button by default
        this.setState({ selectedAlgo: "visualize" });
    }

    handleAlgoSelect = (e) => {
        const selectedAlgo = e.target.value;
        if (selectedAlgo === "visualize") {
            this.visualizeMST(selectedAlgo);
        } else {
            this.setState({ selectedAlgo });
        }
    };

    visualizeMST = (selectedAlgo) => {
        this.setState({ selectedAlgo });
    };

    renderAlgoOptions() {
        return (
            <select onChange={this.handleAlgoSelect}>
                <option disabled selected value="visualize">Select Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
                <option value="kruskal">Kruskal's Algorithm</option>
            </select>
        );
    }

    render() {
        const { selectedAlgo } = this.state;
        const selectedComponent = selectedAlgo === "prim" ? <Prim /> : selectedAlgo === "kruskal" ? <Kruskal /> : null;

        return (
            <>
                <Navbar currentPage="Minimum Spanning Tree Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderAlgoOptions()}
                        <button className="visualize-btn" onClick={() => this.visualizeMST("visualize")}>
                            {selectedAlgo === "visualize" ? "Visualize" : `Visualize ${selectedAlgo}`}
                        </button>
                        <button className="reset-btn" onClick={() => this.setState({ selectedAlgo: "visualize" })}>Reset</button>
                    </div>
                </div>

                <div className="algo-container">
                    {selectedComponent}
                </div>
            </>
        );
    }
}

export default MinimumSpanningTree;
