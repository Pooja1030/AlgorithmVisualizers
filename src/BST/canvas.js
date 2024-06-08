import React, { Component } from 'react';
import { gsap } from 'gsap';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.animationTimeline = gsap.timeline({ paused: true }); // Initialize GSAP timeline
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        this.animationTimeline.clear();

        // Get SVG element
        const svg = this.svgRef.current;

        // Clear SVG content
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Draw the binary tree
        if (this.props.tree) {
            this.drawTree(svg, this.props.tree, this.props.width / 2, 50, 200, 50);
        }

        // Start the animation timeline
        this.animationTimeline.play();
    }

    drawTree(svg, node, x, y, xOffset, yOffset) {
        if (!node) return;

        // Draw left edge and subtree
        if (node.left) {
            this.drawEdge(svg, node, node.left, x, y, x - xOffset, y + yOffset);
            this.drawTree(svg, node.left, x - xOffset, y + yOffset, xOffset / 2, yOffset);
        }

        // Draw right edge and subtree
        if (node.right) {
            this.drawEdge(svg, node, node.right, x, y, x + xOffset, y + yOffset);
            this.drawTree(svg, node.right, x + xOffset, y + yOffset, xOffset / 2, yOffset);
        }

        // Draw the node
        this.drawNode(svg, node, x, y);
    }

    drawNode(svg, node, x, y) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('id', `node-${node.id}`);
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 20);
        circle.setAttribute('fill', "#0077ff");
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.textContent = node.value;
        svg.appendChild(text);
    }

    drawEdge(svg, from, to, x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('id', `edge-${from.id}-${to.id}`);
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', 2);
        svg.appendChild(line);
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg
                ref={this.svgRef}
                width={width}
                height={height}
            />
        );
    }
}

Canvas.defaultProps = {
    width: 1000,
    height: 500
};

export default Canvas;
