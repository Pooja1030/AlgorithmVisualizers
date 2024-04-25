import React, { Component } from 'react';
import Navbar from '../Components/navbar';

class Queue extends Component {
    constructor() {
        super();
        this.state = {
            queue: [],
            inputValue: '',
        };
    }

    enqueueToQueue = () => {
        const { queue, inputValue } = this.state;
        const updatedQueue = [...queue, inputValue];
        this.setState({ queue: updatedQueue, inputValue: '' });
    };

    dequeueFromQueue = () => {
        const { queue } = this.state;
        if (queue.length === 0) {
            alert("Queue is empty!");
            return;
        }
        const updatedQueue = [...queue];
        updatedQueue.shift();
        this.setState({ queue: updatedQueue });
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    render() {
        const { queue, inputValue } = this.state;

        return (
            <div>
                <Navbar />
                <h2>Queue Data Structure</h2>
                <div>
                    <input type="text" value={inputValue} onChange={this.handleInputChange} />
                    <button onClick={this.enqueueToQueue}>Enqueue</button>
                    <button onClick={this.dequeueFromQueue}>Dequeue</button>
                </div>
                <div>
                    <h3>Queue:</h3>
                    <ul>
                        {queue.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Queue;
