import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Menu from "./menu";
import Rects from './rects';
import SidePanel from './sidepanelso';
import { bubbleSort, selectionSort, insertionSort } from "../algorithms/sortingalgorithms";
import { bubbleSortSteps, selectionSortSteps, insertionSortSteps } from "../algorithms/sortingalgorithms";
import { quickSort , quickSortSteps } from '../algorithms/quickSort';
 
class Sort extends Component {
    state = {
        count: 20,
        rects: [],
        rects2: [],
        doubles: false,
        speed: 50,
        isRunning: false,
        algo1: 0,
        algo2: 0,
        sidePanelOpen: false,
        algorithmSteps: [],
    };

    componentDidMount() {
        this.handleRandomize();
    }

    toggleSidePanel = () => {
        this.setState((prevState) => ({ sidePanelOpen: !prevState.sidePanelOpen }));
    };

    render() {
        return (
            <React.Fragment>
                <Navbar currentPage="Sorting Visualizer" />
                <button className="side-panel-toggle" onClick={this.toggleSidePanel}>
                    →
                </button>
                <SidePanel
                    isOpen={this.state.sidePanelOpen}
                    onClose={this.toggleSidePanel}
                    algorithmSteps={this.state.algorithmSteps}
                />
                <Menu
                    isDisabled={this.state.isRunning}
                    onDoubleChange={this.handleDouble}
                    onVisualize={this.handleSort}
                    onRandomize={this.handleRandomize}
                    onRefresh={this.handleRefresh}
                    onCountChange={this.handleCountChange}
                    onAlgoChanged={this.handleAlgoChanged}
                    onSpeedChange={this.handleSpeedChanged}
                />
                <div className='justify-content-center'>
                    <Rects
                        speed={this.state.speed}
                        rects={this.state.rects}
                    />
                    {this.state.doubles && <hr style={{ width: "90%" }} />}
                    {this.state.doubles &&
                        <Rects
                            rects={this.state.rects2}
                        />}
                </div>
            </React.Fragment>
        );
    }

    handleRandomize = () => {
        const rect = this.getInitialRects(this.state.count);
        const rect2 = rect.slice();
        this.setState({ rects: rect, rects2: rect2 });
    };

    handleRefresh = () => {
        const rects = this.state.rects.map(rect => ({ ...rect, isSorted: false, isSorting: false }));
        const rects2 = rects.slice();
        this.setState({ rects, rects2 });
    };

    handleDouble = (val) => {
        this.setState({ doubles: val });
    };

    handleCountChange = (val) => {
        this.setState({ count: val });
        this.handleRandomize();
    };

    handleAlgoChanged = (pos, val) => {
        // Reset algorithmSteps when a new algorithm is selected
        this.setState({ algorithmSteps: [] });
        if (pos === 0) {
            this.setState({ algo1: val });
        } else {
            this.setState({ algo2: val });
        }
    };

    handleSpeedChanged = (val) => {
        const speed = (760 - val * 7.5);
        this.setState({ speed });
    };

    handleSort = async () => {
        this.setState({ isRunning: true, sidePanelOpen: true });
        let steps1;
        let algorithmSteps;
        switch (this.state.algo1) {
            case 0:
                steps1 = bubbleSort(this.state.rects); // Call bubbleSort to get steps
                algorithmSteps = bubbleSortSteps; // Set algorithmSteps to bubbleSortSteps
                break;
            case 1:
                steps1 = selectionSort(this.state.rects); // Call selectionSort to get steps
                algorithmSteps = selectionSortSteps; // Set algorithmSteps to selectionSortSteps
                break;
            case 2:
                steps1 = insertionSort(this.state.rects); // Call insertionSort to get steps
                algorithmSteps = insertionSortSteps; // Set algorithmSteps to insertionSortSteps
                break;
            case 3:
                steps1 = quickSort(this.state.rects2); // Call quickSort to get steps
                algorithmSteps = quickSortSteps; // Set algorithmSteps to quickSortSteps
                break;
            default:
                console.error("Invalid algorithm selected or steps not defined for the algorithm.");
                break;
        }

        // Handle the case when steps1 or algorithmSteps are undefined
        if (!steps1 || !algorithmSteps) {
            console.error("Steps not defined for the selected algorithm.");
            this.setState({ isRunning: false });
            return;
        }

        // Execute the steps one by one with visualization
        for (let i = 0; i < steps1.length; i++) {
            const step = steps1[i];
            const prevRects = [...this.state.rects];
            const { xx, yy, changed } = step;

            // Highlight the elements being compared or swapped
            prevRects[xx] = { ...prevRects[xx], isSorting: true };
            prevRects[yy] = { ...prevRects[yy], isSorting: true };
            this.setState({ rects: prevRects });

            // Highlight the current algorithm step in the side panel
            if (algorithmSteps[i] && algorithmSteps[i].code) {
                this.setState(prevState => ({ algorithmSteps: [...prevState.algorithmSteps, algorithmSteps[i]] }));
            }

            // Wait for a short duration to visualize the step
            await new Promise(resolve => setTimeout(resolve, this.state.speed));

            // If elements are swapped, update the state with the swapped elements
            if (changed) {
                const temp = prevRects[xx];
                prevRects[xx] = prevRects[yy];
                prevRects[yy] = temp;
                this.setState({ rects: prevRects });
            }

            // Highlight the elements being compared or swapped
            prevRects[xx] = { ...prevRects[xx], isSorting: false };
            prevRects[yy] = { ...prevRects[yy], isSorting: false };
            this.setState({ rects: prevRects });

            // Wait for a short duration before proceeding to the next step
            await new Promise(resolve => setTimeout(resolve, this.state.speed));
        }

        // Reset the state after sorting is completed
        this.setState({ isRunning: false });
    };

    getInitialRects = (tot) => {
        const rects = [];
        for (let i = 0; i < tot; i++) {
            rects.push(this.getRect(i));
        }
        return rects;
    };

    getRect = (kk) => {
        return {
            width: Math.floor(Math.random() * 200) + 50,
            isSorted: false,
            isSorting: false,
            kk: kk
        };
    };
}

export default Sort;
