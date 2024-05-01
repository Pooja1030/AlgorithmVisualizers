// BinaryTreeView.js
import React, { Component } from 'react';
import './style1.css';

class BinaryTreeView extends Component {
    renderNode(node, index) {
        if (!node) return null;

        return (
            <div key={index} className="node">
                <div>{node}</div>
            </div>
        );
    }

    renderTree() {
        const { elements, selectedTraversal } = this.props;
        if (!elements || elements.length === 0) return null;

        // Sort elements if required
        let sortedElements = [...elements];
        if (selectedTraversal === "inorder") {
            sortedElements.sort((a, b) => a - b);
        } else if (selectedTraversal === "postorder") {
            sortedElements.sort((a, b) => b - a);
        }

        return (
            <div className="binary-tree fade-in"> {/* Apply fade-in class here */}
                {sortedElements.map((element, index) => (
                    this.renderNode(element, index)
                ))}
            </div>
        );
    }

    render() {
        return (
            <div className="traversal-result"> {/* Apply fade-in class here */}
                {this.renderTree()}
            </div>
        );
    }
}

export default BinaryTreeView;
