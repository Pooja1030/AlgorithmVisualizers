import React, { Component } from 'react';
import Navbar from '../Pages/navbar';

class BinaryTree extends Component {
    constructor() {
        super();
        this.state = {
            selectedTraversal: "",
            tree: this.generateTree(),
            traversalResult: [],
        };
    }

    generateTree() {
        // Generate a binary tree with dummy data for demonstration
        // Modify this function to generate your desired binary tree structure
        const root = {
            value: 1,
            left: {
                value: 2,
                left: {
                    value: 4,
                    left: null,
                    right: null,
                },
                right: {
                    value: 5,
                    left: null,
                    right: null,
                },
            },
            right: {
                value: 3,
                left: null,
                right: null,
            },
        };
        return root;
    }

    inorderTraversal(node) {
        if (!node) return;
        this.setState({ traversalResult: [] }, () => {
            this.doInorderTraversal(node);
        });
    }

    doInorderTraversal(node) {
        if (!node) return;
        this.doInorderTraversal(node.left);
        this.setState(prevState => ({
            traversalResult: [...prevState.traversalResult, node.value]
        }));
        this.doInorderTraversal(node.right);
    }

    preorderTraversal(node) {
        if (!node) return;
        this.setState({ traversalResult: [] }, () => {
            this.doPreorderTraversal(node);
        });
    }

    doPreorderTraversal(node) {
        if (!node) return;
        this.setState(prevState => ({
            traversalResult: [...prevState.traversalResult, node.value]
        }));
        this.doPreorderTraversal(node.left);
        this.doPreorderTraversal(node.right);
    }

    postorderTraversal(node) {
        if (!node) return;
        this.setState({ traversalResult: [] }, () => {
            this.doPostorderTraversal(node);
        });
    }

    doPostorderTraversal(node) {
        if (!node) return;
        this.doPostorderTraversal(node.left);
        this.doPostorderTraversal(node.right);
        this.setState(prevState => ({
            traversalResult: [...prevState.traversalResult, node.value]
        }));
    }

    handleTraversalSelect = (e) => {
        const selectedTraversal = e.target.value;
        this.setState({ selectedTraversal });
    };

    handleVisualization = () => {
        const { selectedTraversal, tree } = this.state;
        switch (selectedTraversal) {
            case "inorder":
                this.inorderTraversal(tree);
                break;
            case "preorder":
                this.preorderTraversal(tree);
                break;
            case "postorder":
                this.postorderTraversal(tree);
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

    render() {
        return (
            <>
                <Navbar currentPage="Binary Tree Traversal Visualizer" />
                <div className='menu'>
                    <div>
                        {this.renderTraversalOptions()}
                        <button className="visualize-btn" onClick={this.handleVisualization}>
                            Visualize
                        </button>
                        <button className="reset-btn" onClick={() => this.setState({ traversalResult: [] })}>Reset</button>
                    </div>
                </div>

                <div className="traversal-container">
                    {this.state.traversalResult.map((node, index) => (
                        <div key={index} className="node">
                            {node}
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

export default BinaryTree;
