import React, { Component } from 'react';
import Navbar from '../Pages/navbar';

class StackVisualization extends Component {
    constructor() {
        super();
        this.state = {
            stack: [],
            inputValue: '',
        };
    }

    pushToStack = () => {
        const { stack, inputValue } = this.state;
        const updatedStack = [...stack, inputValue];
        this.setState({ stack: updatedStack, inputValue: '' });
    };

    popFromStack = () => {
        const { stack } = this.state;
        if (stack.length === 0) {
            alert("Stack is empty!");
            return;
        }
        const updatedStack = [...stack];
        updatedStack.pop();
        this.setState({ stack: updatedStack });
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    render() {
        const { stack, inputValue } = this.state;

        return (
            <>
                <Navbar currentPage="Stack Visualization" />
                <div className='menu'>
                    <div>
                        <input type="text" value={inputValue} onChange={this.handleInputChange} />
                        <button className="visualize-btn" onClick={this.pushToStack}>Push</button>
                        <button className="reset-btn" onClick={this.popFromStack}>Pop</button>
                    </div>
                </div>

                <div className="stack-container">
                    <h2>Stack Data Structure</h2>
                    <div>
                        <div>
                            <h3>Stack:</h3>
                            <ul>
                                {stack.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default StackVisualization;
