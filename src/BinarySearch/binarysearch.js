import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Menu from "./menu";
import Rects from './rects';
// import '../App.css';

class BinarySearch extends Component {
  state = {
    count: 20,
    target: null,
    rects: [],
    isRunning: false,
    currentStep: null,
  };

  componentDidMount() {
    this.handleRandomize();
  }

  render() {
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

        <div className='justify-content-center'>
          <Rects
            rects={this.state.rects}
            target={this.state.target}
          />
        </div>
        <div className="representation">
          <div className="ide w-100">
            <div className="row ml-auto mr-auto">
              <span>Pseudocode:</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <pre>
                {`function binarySearch(array, target) {
  let low = 0;
  let high = array.length - 1;
  
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  return -1;
}`}
              </pre>
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
              <span>1. Set low to 0 and high to length of array - 1.</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>2. Repeat while low is less than or equal to high:</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>    a. Set mid to the middle index between low and high.</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>    b. If the target is found at mid, return mid.</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>    c. If the target is less than the value at mid, set high to mid - 1.</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>    d. If the target is greater than the value at mid, set low to mid + 1.</span>
            </div>
            <div className="row ml-auto mr-auto mt-1">
              <span>3. If the target is not found, return -1.</span>
            </div>
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
    this.setState({ isRunning: true, target: searchValue }, ()=>{

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
      }, 100);
    };
    animateStep(0);
  }
}

export default BinarySearch;
