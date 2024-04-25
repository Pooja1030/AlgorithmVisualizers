import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Menu from "./menu";
import Rects from './rects';
import '../App.css';

class BinarySearch extends Component {
  state = {
    count: 20,
    target: null,
    rects: [],
    isRunning: false,
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
          onViusalize={this.handleSearch}
          onRandomize={this.handleRandomize}
          onRefresh={this.handleRefresh}
          onCountChange={this.handleCountChange}
          onTargetChange={this.handleTargetChange}
        />
        <div className='justify-content-center'>
          <Rects
            rects={this.state.rects}
            target={this.state.target}
          />
        </div>
      </React.Fragment>
    );
  }

  handleRandomize = () => {
    const target = Math.floor(Math.random() * this.state.count);
    const rects = Array.from({ length: this.state.count }, (_, index) => ({
      value: index,
      isTarget: false,
    }));
    this.setState({ target, rects });
  }

  handleRefresh = () => {
    this.setState({ isRunning: false });
    this.handleRandomize();
  }

  handleCountChange = (val) => {
    this.setState({ count: val }, this.handleRandomize);
  }

  handleTargetChange = (val) => {
    this.setState({ target: val });
  }

  handleSearch = () => {
    this.setState({ isRunning: true });
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
  }

  animateSearch = (steps) => {
    const animateStep = (index) => {
      if (index === steps.length) {
        this.setState({ isRunning: false });
        return;
      }
      const step = steps[index];
      const { low, high, mid, found, index: targetIndex, direction } = step;
      const updatedRects = this.state.rects.map((rect, i) => {
        if (found && i === targetIndex) {
          return { ...rect, isTarget: true };
        } else if (i === low || i === high || i === mid) {
          return { ...rect, isHighlight: true };
        } else {
          return { ...rect, isHighlight: false, isTarget: false };
        }
      });
      this.setState({ rects: updatedRects });
      setTimeout(() => {
        animateStep(index + 1);
      }, 1000);
    };
    animateStep(0);
  }
}

export default BinarySearch;
