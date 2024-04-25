import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import Singly from './Singly';
import Doubly from './Doubly';
import Circular from './Circular';

class LinkedList extends Component {
    constructor() {
        super();
        this.state = {
            selectedList: "",
            listOutput: null,
        };
    }

    SelectList = () => {
        console.log("Select List...");
    };

    handleListSelect = (e) => {
        const selectedList = e.target.value;
        this.setState({ selectedList });
    };

    handleVisualization = () => {
        switch (this.state.selectedList) {
            case "singly":
                this.setState({ listOutput: <Singly /> });
                break;
            case "doubly":
                this.setState({ listOutput: <Doubly /> });
                break;
            case "circular":
                this.setState({ listOutput: <Circular /> });
                break;
            default:
                this.SelectList();
                break;
        }
    };

    renderListOptions() {
        return (
            <select defaultValue="visualize" onChange={this.handleListSelect}>
                <option disabled value="visualize">Select List</option>
                <option value="singly">Singly Linked List</option>
                <option value="doubly">Doubly Linked List</option>
                <option value="circular">Circular Linked List</option>
            </select>
        );
    }
    

    render() {
        return (
            <>
                <Navbar currentPage="Linked List Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderListOptions()}
                        <button className="visualize-btn" onClick={this.handleVisualization}>
                            {this.state.selectedList === "visualize" ? "Visualize" : `Visualize ${this.state.selectedList}`}
                        </button>
                        <button className="reset-btn" onClick={() => this.setState({ selectedList: "visualize", listOutput: null })}>Reset</button>
                    </div>
                </div>

                <div className="list-container">
                    {this.state.listOutput}
                </div>
            </>
        );
    }
}

export default LinkedList;
