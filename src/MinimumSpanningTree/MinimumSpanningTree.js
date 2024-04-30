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
            visualizeClicked: false,
        };
    }

    handleAlgoSelect = (e) => {
        const selectedAlgo = e.target.value;
        this.setState({ selectedAlgo, visualizeClicked: false });
    };

    handleVisualizeClick = () => {
        if (this.state.selectedAlgo !== "") {
            this.setState({ visualizeClicked: true });
        }
    };

    renderAlgoOptions() {
        return (
            <select onChange={this.handleAlgoSelect} value={this.state.selectedAlgo}>
                <option disabled value="">Select Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
                <option value="kruskal">Kruskal's Algorithm</option>
            </select>
        );
    }

    render() {
        const { selectedAlgo, visualizeClicked } = this.state;
        let selectedComponent = null;
        if (visualizeClicked) {
            selectedComponent = selectedAlgo === "prim" ? <Prim /> : selectedAlgo === "kruskal" ? <Kruskal /> : null;
        }

        return (
            <>
                <Navbar currentPage="Minimum Spanning Tree Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderAlgoOptions()}
                        <button className="visualize-btn" onClick={this.handleVisualizeClick}>
                            Visualize
                        </button>
                        <button className="reset-btn" onClick={() => this.setState({ selectedAlgo: "", visualizeClicked: false })}>Reset</button>
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
