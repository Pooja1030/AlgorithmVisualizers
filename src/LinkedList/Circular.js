// Circular.js
import React, { Component } from 'react';

class Circular extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        };
    }

    // Implement the circular linked list algorithm
    componentDidMount() {
        // Example: Create a circular linked list with some elements
        const newList = ["1", "2", "3", "4", "5"];
        this.setState({ list: newList });
    }

    render() {
        return (
            <div>
                {/* Display the circular linked list */}
                {this.state.list.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        );
    }
}

export default Circular;
