// BinaryTreeView.js

import React, { Component } from 'react';
import './style1.css';

class BinaryTreeView extends Component {
    renderNode(node, level, index, offsetX, offsetY) {
        if (!node) return null;

        const circleRadius = 30;
        const circleSpacing = 100;
        const verticalSpacing = 150;

        // Calculate position for current node
        const x = offsetX + index * circleSpacing;
        const y = offsetY + level * verticalSpacing;

        // Draw circle for current node
        const circle = (
            <circle key={node} cx={x} cy={y} r={circleRadius} fill="white" stroke="black" strokeWidth="2" />

        );

        // Draw text for current node
        const text = (
            <text key={`${node}-text`} x={x} y={y} textAnchor="middle" dy=".3em">{node}</text>
        );

        // Draw arrows for child nodes
        const arrows = node.children.map((child, idx) => {
            const childX = offsetX + (idx - (node.children.length - 1) / 2) * circleSpacing;
            const childY = offsetY + (level + 1) * verticalSpacing;
            return (
                <line key={`${node}-${child}-line`} x1={x} y1={y} x2={childX} y2={childY} stroke="black" strokeWidth="2" />
            );
        });

        // Recursively render child nodes
        const children = node.children.map((child, idx) => {
            return this.renderNode(child, level + 1, idx, offsetX, offsetY);
        });

        return [circle, text, ...arrows, ...children];
    }

    render() {
        const { tree } = this.props;
        if (!tree) return null;

        // Calculate total width and height of the tree
        const totalWidth = this.calculateTotalWidth(tree);
        const totalHeight = this.calculateTotalHeight(tree);

        // Calculate offset to center the tree horizontally
        const offsetX = (totalWidth - 100) / 2; // Subtracting 100 to account for circle radius
        const offsetY = 50; // Initial Y offset

        return (
            <svg width={totalWidth} height={totalHeight}>
                {this.renderNode(tree, 0, 0, offsetX, offsetY)}
            </svg>
        );
    }

    // Helper function to calculate total width of the tree
    calculateTotalWidth(node) {
        if (!node) return 0;
        const childWidths = node.children.map(child => this.calculateTotalWidth(child));
        return Math.max(100, childWidths.reduce((acc, curr) => acc + curr, 0) + (node.children.length - 1) * 100);
    }

    // Helper function to calculate total height of the tree
    calculateTotalHeight(node) {
        if (!node) return 0;
        const childHeights = node.children.map(child => this.calculateTotalHeight(child));
        return Math.max(100, (node.children.length > 0 ? 150 : 0) + childHeights.reduce((acc, curr) => acc + curr, 0));
    }
}

export default BinaryTreeView;
