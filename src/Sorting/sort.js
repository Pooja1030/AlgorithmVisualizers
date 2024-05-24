import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Menu from "./menu";
import Rects from './rects';
import SidePanel from './sidepanelso';
import { bubbleSort, selectionSort, insertionSort } from "../algorithms/sortingalgorithms";
import { bubbleSortSteps, selectionSortSteps, insertionSortSteps } from "../algorithms/sortingalgorithms";
import { quickSort, quickSortSteps } from '../algorithms/quickSort';

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
        algorithmSteps1: [],
        algorithmSteps2: [],
        defaultTimeComplexity: 'O(n^2)', // Default time complexity
        defaultSpaceComplexity: 'O(1)', // Default space complexity
        realTimeComplexity: '', // Real time complexity
        realSpaceComplexity: '', // Real space complexity
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
                    algorithmSteps1={this.state.algorithmSteps1}
                    algorithmSteps2={this.state.algorithmSteps2}
                    isDouble={this.state.doubles}
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
                {/* Display real-time and space complexities */}
                <div className='complexities'>
                    <p>Time Complexity: {this.state.defaultTimeComplexity}{this.state.realTimeComplexity && ` - ${this.state.realTimeComplexity}`}</p>
                    <p>Space Complexity: {this.state.defaultSpaceComplexity}{this.state.realSpaceComplexity && ` - ${this.state.realSpaceComplexity}`}</p>
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
        this.setState({ algorithmSteps1: [], algorithmSteps2: [] });
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
        this.setState({ isRunning: true, sidePanelOpen: true, algorithmSteps1: [], algorithmSteps2: [] });
        let steps1, steps2;
        let algorithmSteps1, algorithmSteps2;
        let startTime1, endTime1, startTime2, endTime2;
        let timeComplexity1 = '', timeComplexity2 = '';
        let spaceComplexity1 = '', spaceComplexity2 = '';
        let spaceUsage1 = 0, spaceUsage2 = 0;

        switch (this.state.algo1) {
            case 0:
                startTime1 = performance.now();
                steps1 = bubbleSort(this.state.rects); // Call bubbleSort to get steps
                endTime1 = performance.now();
                algorithmSteps1 = bubbleSortSteps; // Set algorithmSteps to bubbleSortSteps
                timeComplexity1 = `${(endTime1 - startTime1).toFixed(2)} ms`; // Update time complexity
                spaceUsage1 = this.state.rects.length * 4; // Assuming each rect object takes 4 bytes
                spaceComplexity1 = `${spaceUsage1} bytes`; // Update space complexity
                break;
            case 1:
                startTime1 = performance.now();
                steps1 = selectionSort(this.state.rects); // Call selectionSort to get steps
                endTime1 = performance.now();
                algorithmSteps1 = selectionSortSteps; // Set algorithmSteps to selectionSortSteps
                timeComplexity1 = `${(endTime1 - startTime1).toFixed(2)} ms`; // Update time complexity
                spaceUsage1 = this.state.rects.length * 4; // Assuming each rect object takes 4 bytes
                spaceComplexity1 = `${spaceUsage1} bytes`; // Update space complexity
                break;
            case 2:
                startTime1 = performance.now();
                steps1 = insertionSort(this.state.rects); // Call insertionSort to get steps
                endTime1 = performance.now();
                algorithmSteps1 = insertionSortSteps; // Set algorithmSteps to insertionSortSteps
                timeComplexity1 = `${(endTime1 - startTime1).toFixed(2)} ms`; // Update time complexity
                spaceUsage1 = this.state.rects.length * 4; // Assuming each rect object takes 4 bytes
                spaceComplexity1 = `${spaceUsage1} bytes`; // Update space complexity
                break;
            default:
                console.error("Invalid algorithm selected or steps not defined for the algorithm.");
                break;
        }

        if (this.state.doubles) {
            switch (this.state.algo2) {
                case 0:
                    startTime2 = performance.now();
                    steps2 = bubbleSort(this.state.rects2); // Call bubbleSort to get steps
                    endTime2 = performance.now();
                    algorithmSteps2 = bubbleSortSteps; // Set algorithmSteps to bubbleSortSteps
                    timeComplexity2 = `${(endTime2 - startTime2).toFixed(2)} ms`; // Update time complexity
                    spaceUsage2 = this.state.rects2.length * 4; // Assuming each rect object takes 4 bytes
                    spaceComplexity2 = `${spaceUsage2} bytes`; // Update space complexity
                    break;
                case 1:
                    startTime2 = performance.now();
                    steps2 = selectionSort(this.state.rects2); // Call selectionSort to get steps
                    endTime2 = performance.now();
                    algorithmSteps2 = selectionSortSteps; // Set algorithmSteps to selectionSortSteps
                    timeComplexity2 = `${(endTime2 - startTime2).toFixed(2)} ms`; // Update time complexity
                    spaceUsage2 = this.state.rects2.length * 4; // Assuming each rect object takes 4 bytes
                    spaceComplexity2 = `${spaceUsage2} bytes`; // Update space complexity
                    break;
                case 2:
                    startTime2 = performance.now();
                    steps2 = insertionSort(this.state.rects2); // Call insertionSort to get steps
                    endTime2 = performance.now();
                    algorithmSteps2 = insertionSortSteps; // Set algorithmSteps to insertionSortSteps
                    timeComplexity2 = `${(endTime2 - startTime2).toFixed(2)} ms`; // Update time complexity
                    spaceUsage2 = this.state.rects2.length * 4; // Assuming each rect object takes 4 bytes
                    spaceComplexity2 = `${spaceUsage2} bytes`; // Update space complexity
                    break;
                case 3:
                    startTime2 = performance.now();
                    steps2 = quickSort(this.state.rects2); // Call quickSort to get steps
                    endTime2 = performance.now();
                    algorithmSteps2 = quickSortSteps; // Set algorithmSteps to quickSortSteps
                    timeComplexity2 = `${(endTime2 - startTime2).toFixed(2)} ms`; // Update time complexity
                    spaceUsage2 = this.state.rects2.length * 4; // Assuming each rect object takes 4 bytes
                    spaceComplexity2 = `${spaceUsage2} bytes`; // Update space complexity
                    break;
                default:
                    console.error("Invalid algorithm selected or steps not defined for the algorithm.");
                    break;
            }

            const maxSteps = Math.max(steps1.length, steps2.length);

            for (let i = 0; i < maxSteps; i++) {
                if (i < steps1.length) {
                    const step1 = steps1[i];
                    const prevRects1 = [...this.state.rects];
                    const { xx: xx1, yy: yy1, changed: changed1 } = step1;

                    prevRects1[xx1] = { ...prevRects1[xx1], isSorting: true };
                    prevRects1[yy1] = { ...prevRects1[yy1], isSorting: true };
                    this.setState({ rects: prevRects1 });

                    if (algorithmSteps1[i] && algorithmSteps1[i].code) {
                        this.setState(prevState => ({ algorithmSteps1: [...prevState.algorithmSteps1, algorithmSteps1[i]] }));
                    }

                    await new Promise(resolve => setTimeout(resolve, this.state.speed));

                    if (changed1) {
                        const temp = prevRects1[xx1];
                        prevRects1[xx1] = prevRects1[yy1];
                        prevRects1[yy1] = temp;
                        this.setState({ rects: prevRects1 });
                    }

                    prevRects1[xx1] = { ...prevRects1[xx1], isSorting: false };
                    prevRects1[yy1] = { ...prevRects1[yy1], isSorting: false };
                    this.setState({ rects: prevRects1 });

                    await new Promise(resolve => setTimeout(resolve, this.state.speed));
                }

                if (i < steps2.length) {
                    const step2 = steps2[i];
                    const prevRects2 = [...this.state.rects2];
                    const { xx: xx2, yy: yy2, changed: changed2 } = step2;

                    prevRects2[xx2] = { ...prevRects2[xx2], isSorting: true };
                    prevRects2[yy2] = { ...prevRects2[yy2], isSorting: true };
                    this.setState({ rects2: prevRects2 });

                    if (algorithmSteps2[i] && algorithmSteps2[i].code) {
                        this.setState(prevState => ({ algorithmSteps2: [...prevState.algorithmSteps2, algorithmSteps2[i]] }));
                    }

                    await new Promise(resolve => setTimeout(resolve, this.state.speed));

                    if (changed2) {
                        const temp = prevRects2[xx2];
                        prevRects2[xx2] = prevRects2[yy2];
                        prevRects2[yy2] = temp;
                        this.setState({ rects2: prevRects2 });
                    }

                    prevRects2[xx2] = { ...prevRects2[xx2], isSorting: false };
                    prevRects2[yy2] = { ...prevRects2[yy2], isSorting: false };
                    this.setState({ rects2: prevRects2 });

                    await new Promise(resolve => setTimeout(resolve, this.state.speed));
                }
            }
        } else {
            // Execute the sorting algorithm steps one by one with visualization for the first algorithm
            for (let i = 0; i < steps1.length; i++) {
                const step = steps1[i];
                const prevRects = [...this.state.rects];
                const { xx, yy, changed } = step;

                // Highlight the elements being compared or swapped
                prevRects[xx] = { ...prevRects[xx], isSorting: true };
                prevRects[yy] = { ...prevRects[yy], isSorting: true };
                this.setState({ rects: prevRects });

                // Highlight the current algorithm step in the side panel
                if (algorithmSteps1[i] && algorithmSteps1[i].code) {
                    this.setState(prevState => ({ algorithmSteps1: [...prevState.algorithmSteps1, algorithmSteps1[i]] }));
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

                // Unhighlight the elements after comparison or swap
                prevRects[xx] = { ...prevRects[xx], isSorting: false };
                prevRects[yy] = { ...prevRects[yy], isSorting: false };
                this.setState({ rects: prevRects });

                // Wait for a short duration before proceeding to the next step
                await new Promise(resolve => setTimeout(resolve, this.state.speed));
            }
        }

        // Update state with real-time and space complexity
        this.setState({
            isRunning: false,
            realTimeComplexity: timeComplexity1,
            realSpaceComplexity: spaceComplexity1,
        });

        if (this.state.doubles) {
            this.setState({
                realTimeComplexity: `${timeComplexity1}, ${timeComplexity2}`,
                realSpaceComplexity: `${spaceComplexity1}, ${spaceComplexity2}`,
            });
        }
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
