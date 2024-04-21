// Doubly.js
import React, { Component } from 'react';

class Doubly extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        };
    }

    // Implement the doubly linked list algorithm
    componentDidMount() {
        // Example: Create a doubly linked list with some elements
        const newList = ["X", "Y", "Z"];
        this.setState({ list: newList });
    }

    render() {
        return (
            <div>
                {/* Display the doubly linked list */}
                {this.state.list.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        );
    }
}

export default Doubly;
