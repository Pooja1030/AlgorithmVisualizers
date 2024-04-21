// Singly.js
import React, { Component } from 'react';

class Singly extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        };
    }

    // Implement the singly linked list algorithm
    componentDidMount() {
        // Example: Create a singly linked list with some elements
        const newList = ["A", "B", "C", "D", "E"];
        this.setState({ list: newList });
    }

    render() {
        return (
            <div>
                {/* Display the singly linked list */}
                {this.state.list.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        );
    }
}

export default Singly;
