// MinimumSpanningTree.js
import React, { Component } from "react";
import Navbar from "../Components/navbar";
import Prim from "./Prim";
import Kruskal from "./Kruskal";
import SidePanel from "./sidepanelm"; // Import the SidePanel component

class MinimumSpanningTree extends Component {
  constructor() {
    super();
    this.state = {
      selectedAlgo: "",
      visualizeClicked: false,
      sidePanelOpen: false, // State to manage side panel visibility
      algorithmSteps: [{
        code: `// Step 1: Append the data to the array emulating the functionality of a stack.
stack.push(newValue);`
      },
      {
        code: `// Step 2: Truncate the last element of the array and return it.
const poppedValue = stack.pop();
return poppedValue;`
      },
      {
        code: `// Step 3: Return the element last added to the array without removing it.
return stack[stack.length - 1];`
      }
      // Add more steps if needed
    ], // Define state for algorithm steps
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
            <button
              className="visualize-btn"
              onClick={this.handleVisualizeClick}
            >
              Visualize
            </button>
            <button
              className="reset-btn"
              onClick={() =>
                this.setState({ selectedAlgo: "", visualizeClicked: false })
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
        <SidePanel isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />
{/* Render the side panel component */}
<SidePanel algorithmSteps={algorithmSteps} isOpen={sidePanelOpen} onClose={this.toggleSidePanel} />

        <div className="algo-container">{selectedComponent}</div>
      </>
    );
  }
}

export default MinimumSpanningTree;
