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

    SelectAlgo = () => {
        console.log("Select Algorithm...");
    };

    handleAlgoSelect = (e) => {
        const selectedAlgo = e.target.value;
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
        return (
            <>
                <Navbar currentPage="Minimum Spanning Tree Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderAlgoOptions()}
                        <button className="visualize-btn" onClick={this.SelectAlgo}>
                            {this.state.selectedAlgo === "visualize" ? "Visualize" : `Visualize ${this.state.selectedAlgo}`}
                        </button>
                        <button className="reset-btn" onClick={() => this.setState({ selectedAlgo: "visualize" })}>Reset</button>
                    </div>
                </div>

                <div className="algo-container">
                    {this.state.selectedAlgo === "visualize" ? null :
                        this.state.selectedAlgo === "prim" ? <Prim /> :
                            this.state.selectedAlgo === "kruskal" ? <Kruskal /> :
                                null
                    }
                </div>
            </>
        );
    }
}

export default MinimumSpanningTree;
