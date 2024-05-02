import React, { Component } from 'react';
import Navbar from '../Components/navbar';
import BinaryTreeView from './BinaryTreeView'; // Assuming BinaryTreeView component for visualization
import './style1.css'
class BinaryTree extends Component {
    constructor() {
        super();
        this.state = {
            selectedTraversal: "",
            tree: null,
            traversalResult: [],
            stack: [],
            maxStackSize: 1000,
            insertValue: '',
            deleteValue: '',
            searchValue: '',
            operationResult: null,
            visualizeClicked: false,
        };
    }

    componentDidMount() {
        // Initialize tree or perform any necessary setup
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedTraversal !== this.state.selectedTraversal || prevState.stack !== this.state.stack) {
            this.updateTraversalResult();
        }
    }

    updateTraversalResult() {
        const { selectedTraversal, tree, stack, visualizeClicked } = this.state;
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

        if (visualizeClicked) {
            // Call visualization logic here based on traversalResult and stack
            // Example: this.visualizeBinaryTree(traversalResult, stack);
            this.setState({ visualizeClicked: false }); // Reset visualizeClicked
        }
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

    insertNode = () => {
        const { insertValue } = this.state;
        if (insertValue.trim() === '') {
            this.setState({ operationResult: 'Please enter a value to insert.' });
            return;
        }
        this.setState(prevState => {
            if (prevState.stack.length >= prevState.maxStackSize) {
                return { operationResult: "Maximum stack size exceeded" };
            }
            const value = parseInt(insertValue);
            if (!isNaN(value)) {
                const stack = [...prevState.stack, value];
                const traversalResult = [...stack]; // Update traversal result
                return { operationResult: `Inserted: ${value}`, stack, traversalResult, insertValue: '' };
            } else {
                return { operationResult: 'Invalid input. Please enter a valid number.' };
            }
        }, () => {
            this.setState({ visualizeClicked: true }); // Trigger visualization after insertion
        });
    }

    deleteNode = () => {
        const { deleteValue, stack } = this.state;
        const value = parseInt(deleteValue);
        if (!isNaN(value)) {
            const index = stack.indexOf(value);
            if (index === -1) {
                this.setState({ operationResult: `Element ${value} not found in stack`, deleteValue: '' });
            } else {
                const newStack = [...stack.slice(0, index), ...stack.slice(index + 1)];
                const traversalResult = [...newStack]; // Update traversal result
                this.setState({ operationResult: `Deleted: ${value}`, stack: newStack, traversalResult, deleteValue: '' });
            }
        } else {
            this.setState({ operationResult: 'Invalid input. Please enter a valid number.', deleteValue: '' });
        }
    }

    searchNode = () => {
        const { searchValue, stack } = this.state;
        const value = parseInt(searchValue);
        if (!isNaN(value)) {
            const index = stack.indexOf(value);
            if (index !== -1) {
                this.setState({ operationResult: `Node ${value} found`, traversalResult: [value], searchValue: '' });
            } else {
                this.setState({ operationResult: `Node ${value} not found in stack`, searchValue: '' });
            }
        } else {
            this.setState({ operationResult: 'Invalid input. Please enter a valid number.', searchValue: '' });
        }
    }

    handleTraversalSelect = (e) => {
        const selectedTraversal = e.target.value;
        this.setState({ selectedTraversal });
    };

    handleInsertInputChange = (e) => {
        this.setState({ insertValue: e.target.value });
    }

    handleDeleteInputChange = (e) => {
        this.setState({ deleteValue: e.target.value });
    }

    handleSearchInputChange = (e) => {
        this.setState({ searchValue: e.target.value });
    }

    handleVisualization = () => {
        const { selectedTraversal, stack } = this.state;
    
        if (selectedTraversal) {
            let traversalResult = [];
            switch (selectedTraversal) {
                case "inorder":
                    traversalResult = this.inorderTraversal(stack); // Assuming traversal on stack
                    break;
                case "preorder":
                    traversalResult = this.preorderTraversal(stack); // Assuming traversal on stack
                    break;
                case "postorder":
                    traversalResult = this.postorderTraversal(stack); // Assuming traversal on stack
                    break;
                default:
                    break;
            }
            this.setState({ traversalResult, visualizeClicked: true });
        } else {
            this.setState({ operationResult: 'Please select a traversal before visualizing.' });
        }
    };
    

    resetOperations = () => {
        this.setState({
            selectedTraversal: "",
            traversalResult: [],
            operationResult: null,
            stack: [],
            insertValue: '',
            deleteValue: '',
            searchValue: '',
        });
    }

    render() {
        return (
            <>
                <Navbar currentPage="Binary Tree Traversal Visualizer" />
                <div className='menu'>
                    <div>
                        <select onChange={this.handleTraversalSelect}>
                            <option disabled selected value="visualize">Select Traversal</option>
                            <option value="inorder">Inorder</option>
                            <option value="preorder">Preorder</option>
                            <option value="postorder">Postorder</option>
                        </select>
                        <input type="number" placeholder="Insert value" value={this.state.insertValue} onChange={this.handleInsertInputChange} />
                        <button className="insert-btn" onClick={this.insertNode}>Insert</button>
                        <input type="number" placeholder="Delete value" value={this.state.deleteValue} onChange={this.handleDeleteInputChange} />
                        <button className="delete-btn" onClick={this.deleteNode}>Delete</button>
                        <input type="number" placeholder="Search value" value={this.state.searchValue} onChange={this.handleSearchInputChange} />
                        <button className="search-btn" onClick={this.searchNode}>Search</button>
                        <button className="visualize-btn" onClick={this.handleVisualization}>
                            Visualize
                        </button>
                        <button className="reset-btn" onClick={this.resetOperations}>Reset</button>
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
                    {/* {this.state.operationResult && (
                        <div className="operation-result">
                            {this.state.operationResult}
                        </div>
                    )} */}
                </div>

                {/* Visualization component */}
                {this.state.visualizeClicked && (
                    <BinaryTreeView tree={this.state.tree} />
                )}
            </>
        );
    }
}

export default BinaryTree;
