import React, { Component } from 'react';
import Navbar from '../Components/navbar';

class BinaryTree extends Component {
    constructor() {
        super();
        this.state = {
            selectedTraversal: "",
            selectedOperation: "",
            tree: null,
            traversalResult: [],
            operationResult: null,
            stack: [],
            maxStackSize: 1000,
        };
    }

    componentDidMount() {
        this.updateTraversalResult();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTraversal !== this.state.selectedTraversal || prevState.stack !== this.state.stack) {
            this.updateTraversalResult();
        }
    }

    updateTraversalResult() {
        const { selectedTraversal, tree, stack } = this.state;
        let traversalResult = [];
        switch (selectedTraversal) {
            case "inorder":
                traversalResult = this.inorderTraversal(tree);
                break;
            case "preorder":
                traversalResult = this.preorderTraversal(tree);
                break;
            case "postorder":
                traversalResult = this.postorderTraversal(tree);
                break;
            default:
                break;
        }
        this.setState({ traversalResult });
    }

    inorderTraversal(node) {
        if (!node) return [];
        const result = [];
        this.doInorderTraversal(node, result);
        return result;
    }

    doInorderTraversal(node, result) {
        if (!node) return;
        this.doInorderTraversal(node.left, result);
        result.push(node.value);
        this.doInorderTraversal(node.right, result);
    }

    preorderTraversal(node) {
        if (!node) return [];
        const result = [];
        this.doPreorderTraversal(node, result);
        return result;
    }

    doPreorderTraversal(node, result) {
        if (!node) return;
        result.push(node.value);
        this.doPreorderTraversal(node.left, result);
        this.doPreorderTraversal(node.right, result);
    }

    postorderTraversal(node) {
        if (!node) return [];
        const result = [];
        this.doPostorderTraversal(node, result);
        return result;
    }

    doPostorderTraversal(node, result) {
        if (!node) return;
        this.doPostorderTraversal(node.left, result);
        this.doPostorderTraversal(node.right, result);
        result.push(node.value);
    }

    insertNode(value) {
        this.setState(prevState => {
            if (prevState.stack.length >= prevState.maxStackSize) {
                return { operationResult: "Maximum stack size exceeded" };
            }
            const stack = [...prevState.stack, value];
            const traversalResult = [...stack]; // Update traversal result
            return { operationResult: `Inserted: ${value}`, stack, traversalResult };
        });
    }

    deleteNode(value) {
        this.setState(prevState => {
            const index = prevState.stack.indexOf(value);
            if (index === -1) {
                return { operationResult: `Element ${value} not found in stack` };
            }
            const stack = [...prevState.stack.slice(0, index), ...prevState.stack.slice(index + 1)];
            const traversalResult = [...stack]; // Update traversal result
            return { operationResult: `Deleted: ${value}`, stack, traversalResult };
        });
    }

    searchNode(value) {
        const index = this.state.stack.indexOf(value);
        if (index !== -1) {
            this.setState({ operationResult: `Node ${value} found` });
            this.setState({ traversalResult: [value] }); // Update traversal result
        } else {
            this.setState({ operationResult: `Node ${value} not found in stack` });
        }
    }

    resetOperations() {
        this.setState({
            selectedTraversal: "",
            selectedOperation: "",
            traversalResult: [],
            operationResult: null,
            stack: [],
        });
    }

    handleTraversalSelect = (e) => {
        const selectedTraversal = e.target.value;
        this.setState({ selectedTraversal });
    };

    handleOperationSelect = (e) => {
        const selectedOperation = e.target.value;
        this.setState({ selectedOperation });
    };

    handleVisualization = () => {
        const { selectedOperation } = this.state;

        switch (selectedOperation) {
            case "insert":
                const insertValue = parseInt(prompt("Enter the value to insert:"));
                if (!isNaN(insertValue)) {
                    this.insertNode(insertValue);
                }
                break;
            case "delete":
                const deleteValue = parseInt(prompt("Enter the value to delete:"));
                if (!isNaN(deleteValue)) {
                    this.deleteNode(deleteValue);
                }
                break;
            case "search":
                const searchValue = parseInt(prompt("Enter the value to search:"));
                if (!isNaN(searchValue)) {
                    this.searchNode(searchValue);
                }
                break;
            default:
                break;
        }
    };

    renderTraversalOptions() {
        return (
            <select onChange={this.handleTraversalSelect}>
                <option disabled selected value="visualize">Select Traversal</option>
                <option value="inorder">Inorder</option>
                <option value="preorder">Preorder</option>
                <option value="postorder">Postorder</option>
            </select>
        );
    }

    renderOperationOptions() {
        return (
            <select onChange={this.handleOperationSelect}>
                <option disabled selected value="operation">Select Operation</option>
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
                <option value="search">Search</option>
            </select>
        );
    }

    render() {
        return (
            <>
                <Navbar currentPage="Binary Tree Traversal Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderTraversalOptions()}
                        {this.renderOperationOptions()}
                        <button className="visualize-btn" onClick={this.handleVisualization}>
                            Visualize
                        </button>
                        <button className="reset-btn" onClick={() => this.resetOperations()}>Reset</button>
                    </div>
                </div>

                <div className="result-container">
                    {this.state.stack.map((value, index) => (
                        <div key={index} className="stack-item">
                            {value}
                        </div>
                    ))}
                    <div className="traversal-result">
                        {this.state.traversalResult.map((value, index) => (
                            <div key={index} className="node">
                                {value}
                            </div>
                        ))}
                    </div>
                    {this.state.operationResult && (
                        <div className="operation-result">
                            {this.state.operationResult}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default BinaryTree;
