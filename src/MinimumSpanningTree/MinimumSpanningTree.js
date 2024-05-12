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
    };
  }

  handleAlgoSelect = (e) => {
    const selectedAlgo = e.target.value;
    this.setState({ selectedAlgo, visualizeClicked: false });

    // Generate algorithm steps based on the selected algorithm
    let algorithmSteps = [];
    if (selectedAlgo === "kruskal") {
      algorithmSteps = Kruskal.steps;
    } else if (selectedAlgo === "prim") {
      algorithmSteps = Prim.steps;
    }

    this.setState({ algorithmSteps });
  };

  handleVisualizeClick = () => {
    if (this.state.selectedAlgo !== "") {
      // Open side panel and trigger visualization
      this.setState({ visualizeClicked: true, sidePanelOpen: true });
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
    const { selectedAlgo, visualizeClicked, sidePanelOpen, algorithmSteps } = this.state;
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

        {/* Side panel toggle button */}
        <button className="side-panel-toggle" onClick={this.toggleSidePanel}>
          →
        </button>

        {/* Render the side panel component */}
        <SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />
        <div className="algo-container">{selectedComponent}</div>
      </>
    );
  }
}

export default MinimumSpanningTree;
