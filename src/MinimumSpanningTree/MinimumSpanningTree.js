// MinimumSpanningTree.js
import React, { Component } from "react";
import Navbar from "../Components/navbar";
import Prim from "./Prim";
import Kruskal from "./Kruskal";
import SidePanel from "./sidepanelm";

class MinimumSpanningTree extends Component {
  constructor() {
    super();
    this.state = {
      selectedAlgo: "",
      visualizeClicked: false,
      sidePanelOpen: false,
      algorithmSteps: [],
      timeComplexity: "",
      spaceComplexity: "",
    };
  }

  // Function to calculate time complexity based on the selected algorithm
  calculateTimeComplexity(selectedAlgo) {
    let timeComplexity = "";
    switch (selectedAlgo) {
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
  calculateSpaceComplexity(selectedAlgo) {
    let spaceComplexity = "";
    switch (selectedAlgo) {
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

  handleAlgoSelect = (e) => {
    const selectedAlgo = e.target.value;
    this.setState({ selectedAlgo, visualizeClicked: false });

    let algorithmSteps = [];
    if (selectedAlgo === "kruskal") {
      algorithmSteps = Kruskal.steps;
    } else if (selectedAlgo === "prim") {
      algorithmSteps = Prim.steps;
    }

    const timeComplexity = this.calculateTimeComplexity(selectedAlgo);
    const spaceComplexity = this.calculateSpaceComplexity(selectedAlgo);
    this.setState({ algorithmSteps, timeComplexity, spaceComplexity });
  };

  handleVisualizeClick = () => {
    if (this.state.selectedAlgo !== "") {
      const timeComplexity = this.calculateTimeComplexity(this.state.selectedAlgo);
      const spaceComplexity = this.calculateSpaceComplexity(this.state.selectedAlgo);
  
      this.setState({ visualizeClicked: true, sidePanelOpen: true, timeComplexity, spaceComplexity });
    }
  };

  toggleSidePanel = () => {
    this.setState((prevState) => ({ sidePanelOpen: !prevState.sidePanelOpen }));
  };

  renderAlgoOptions() {
    return (
      <select onChange={this.handleAlgoSelect} value={this.state.selectedAlgo}>
        <option disabled value="">
          Select Algorithm
        </option>
        <option value="prim">Prim's Algorithm</option>
        <option value="kruskal">Kruskal's Algorithm</option>
      </select>
    );
  }

  render() {
    const { selectedAlgo, visualizeClicked, sidePanelOpen, algorithmSteps, timeComplexity, spaceComplexity } = this.state;
    let selectedComponent = null;
    if (visualizeClicked) {
      selectedComponent =
        selectedAlgo === "prim" ? (
          <Prim />
        ) : selectedAlgo === "kruskal" ? (
          <Kruskal />
        ) : null;
    }

    return (
      <>
        <Navbar currentPage="Minimum Spanning Tree Visualizer" />
        <div className="menu">
          <div>
            {this.renderAlgoOptions()}
            <button className="visualize-btn" onClick={this.handleVisualizeClick}>
              Visualize
            </button>
            <button
              className="reset-btn"
              onClick={() =>
                this.setState({ selectedAlgo: "", visualizeClicked: false, algorithmSteps: [] })
              }
            >
              Reset
            </button>
          </div>
        </div>

        {selectedAlgo && (
          <div className="complexity-info">
            <p>Time Complexity: {timeComplexity}</p>
            <p>Space Complexity: {spaceComplexity}</p>
          </div>
        )}

        <button className="side-panel-toggle" onClick={this.toggleSidePanel}>
          →
        </button>

        <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />
        <div className="algo-container">{selectedComponent}</div>
      </>
    );
  }
}

export default MinimumSpanningTree;
