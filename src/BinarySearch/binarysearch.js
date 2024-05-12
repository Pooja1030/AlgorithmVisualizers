import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Menu from "./menu";
import Rects from './rects';
import SidePanel from './Sidepanels'; // Import the SidePanel component
import './style4.css'

class BinarySearch extends Component {
  state = {
    count: 20,
    target: null,
    rects: [],
    isRunning: false,
    currentStep: null,
    sidePanelOpen: false, // State to manage side panel visibility
    algorithmSteps: [
      {
        code: ` Step 1: Initialize low and high pointers for the array.`
      },
      {
        code: ` Step 2: Repeat until low pointer is less than or equal to high pointer.`,
      },
      {
        code: ` Step 3: Calculate mid pointer as the average of low and high pointers.`,
      },
      {
        code: ` Step 4: If the value at mid pointer equals the target, return the index of mid.`,
      },
      {
        code: ` Step 5: If the value at mid pointer is less than the target, move the low pointer to mid + 1.`,
      },
      {
        code: ` Step 6: If the value at mid pointer is greater than the target, move the high pointer to mid - 1.`,
      },
      {
        code: ` Step 7: If the target is not found in the array, return -1.`,
      },
    ]
    
  };
  

  componentDidMount() {
    this.handleRandomize();
  }

  render() {

    const { sidePanelOpen, algorithmSteps } = this.state;


    return (
      <React.Fragment>
        <Navbar currentPage="Binary Search Visualizer" />
        <Menu
  disable={this.state.isRunning}
  onVisualize={this.handleSearch} 
  onRandomize={this.handleRandomize}
  onReset={this.handleReset}
  onCountChange={this.handleCountChange}
  onTargetChange={this.handleTargetChange}
/>

       {/* Side panel toggle button */}
       <button className="side-panel-toggle" onClick={this.toggleSidePanel}>→</button>

{/* Render the side panel component */}
<SidePanel isOpen={sidePanelOpen} onClose={this.toggleSidePanel} algorithmSteps={algorithmSteps}  />


        <div className='justify-content-center'>
          <Rects
            rects={this.state.rects}
            target={this.state.target}
          />
        </div>
        <div className="representation">
    <div className="row mx-auto" id="binarysearchtree-pseudocode">
        {/* <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
            <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">| INSERT NODE |</span>
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">
                        1. Insert a new node with the specified data value into the binary search tree.
                    </span>
                    <span className="comment w-100 mt-1">
                        2. Traverse the tree to find the appropriate position for insertion based on the value.
                    </span>
                    <span className="comment w-100 mt-1"> </span>
                    <span className="comment w-100 mt-1">
                        TIME COMPLEXITY: O(log n) - O(n) depending on the tree structure
                    </span>
                </div>
            </div>
        </div> */}
        {/* <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
            <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">| DELETE NODE |</span>
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">
                        1. Delete a node with the specified data value from the binary search tree.
                    </span>
                    <span className="comment w-100 mt-1">
                        2. Traverse the tree to find the node to be deleted.
                    </span>
                    <span className="comment w-100 mt-1">
                        3. Handle different cases based on the number of children of the node.
                    </span>
                    <span className="comment w-100 mt-1"> </span>
                    <span className="comment w-100 mt-1">
                        TIME COMPLEXITY: O(log n) - O(n) depending on the tree structure
                    </span>
                </div>
            </div>
        </div> */}
        {/* <div className="col-sm-12 col-md-12 col-lg-4 px-0 mr-0">
            <div className="ide w-100">
                <div className="row ml-auto mr-auto 1">
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">| SEARCH NODE |</span>
                    <span className="comment w-100">----------------</span>
                    <span className="comment w-100 mt-1">
                        1. Search for a node with the specified data value in the binary search tree.
                    </span>
                    <span className="comment w-100 mt-1">
                        2. Traverse the tree recursively, comparing the data value with each node's value.
                    </span>
                    <span className="comment w-100 mt-1">
                        3. If the value matches, return the node; otherwise, continue searching in the left or right subtree.
                    </span>
                    <span className="comment w-100 mt-1"> </span>
                    <span className="comment w-100 mt-1">
                        TIME COMPLEXITY: O(log n) - O(n) depending on the tree structure
                    </span>
                </div>
            </div>
        </div> */}
    </div>
</div>
      </React.Fragment>
    );
  }

  handleRandomize = () => {
    const target = Math.floor(Math.random() * this.state.count);
    const rects = Array.from({ length: this.state.count }, (_, index) => ({
      value: index,
      isTarget: false,
      isHighlight: false,
    }));
    this.setState({ target, rects });
  }

  handleReset = () => {
    this.setState({
      isRunning: false,
      currentStep: null,
    });
    this.handleRandomize();
  }

  handleCountChange = (val) => {
    this.setState({ count: val }, this.handleRandomize);
  }

  handleTargetChange = (val) => {
    this.setState({ target: val });
  }

  handleSearch = (searchValue) => {
    this.setState({ isRunning: true, target: searchValue }, () => {
      const { target, rects } = this.state;
      let low = 0;
      let high = rects.length - 1;
      let steps = [];
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        steps.push({ low, high, mid });
        if (rects[mid].value === target) {
          steps.push({ found: true, index: mid });
          break;
        } else if (rects[mid].value < target) {
          steps.push({ mid, direction: 'right' });
          low = mid + 1;
        } else {
          steps.push({ mid, direction: 'left' });
          high = mid - 1;
        }
      }
      this.animateSearch(steps);
  
      // Trigger side panel and display algorithm steps
      this.setState({ sidePanelOpen: true });
    });
  }
  

  animateSearch = (steps) => {
    const animateStep = (index) => {
      if (index === steps.length) {
        this.setState({ isRunning: false });
        return;
      }
      const step = steps[index];
      const { low, high, mid, found, index: targetIndex } = step;
      const updatedRects = this.state.rects.map((rect, i) => {
        if (found && i === targetIndex) {
          return { ...rect, isTarget: true, isHighlight: false };
        } else if (i === low || i === high || i === mid) {
          return { ...rect, isHighlight: true, isTarget: false };
        } else {
          return { ...rect, isHighlight: false, isTarget: false };
        }
      });
      this.setState({ rects: updatedRects, currentStep: step });
      setTimeout(() => {
        animateStep(index + 1);
      }, 1000);
    };
    animateStep(0);
  }
  toggleSidePanel = () => {
    this.setState(prevState => ({
      sidePanelOpen: !prevState.sidePanelOpen,
    }));
  };
}

export default BinarySearch;
