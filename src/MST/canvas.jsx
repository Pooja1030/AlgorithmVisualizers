import React, { Component } from 'react';
import { gsap } from 'gsap'; // Import GSAP for animation

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

        // Draw edges that connect the vertices
        this.drawEdges(svg);

        // Draw vertices 
        this.drawVertices(svg);

        // Animate MST
        this.animateMST(svg);

    }

    drawVertices(svg) {
        const { vertices } = this.props;
        vertices.forEach(vertex => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('id', `vertex-${vertex.id}`);
            circle.setAttribute('cx', vertex.x);
            circle.setAttribute('cy', vertex.y);
            circle.setAttribute('r', 15);
            circle.setAttribute('fill', "#4942E4");
            svg.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', vertex.x);
            text.setAttribute('y', vertex.y + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', 'white');
            text.textContent = String.fromCharCode(65 + vertex.id);
            svg.appendChild(text);
        });
    }

    drawEdges(svg) {
        const { connectingEdges } = this.props;
        connectingEdges.forEach(edge => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('id', `edge-${edge.id}`); // Set edge ID as the ID for the line
            line.setAttribute('x1', edge.from.x);
            line.setAttribute('y1', edge.from.y);
            line.setAttribute('x2', edge.to.x);
            line.setAttribute('y2', edge.to.y);
            line.setAttribute('stroke', 'lightgray');
            line.setAttribute('stroke-width', 1);
            svg.appendChild(line);

            const midX = (edge.from.x + edge.to.x) / 2;
            const midY = (edge.from.y + edge.to.y) / 2;

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('id', `edge-${edge.id}-weight`); // Set edge ID as the ID for the line
            text.setAttribute('x', midX);
            text.setAttribute('y', midY - 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('stroke', 'white');
            text.setAttribute('stroke-width', 5);
            text.setAttribute('paint-order', "stroke");
            text.textContent = parseInt(edge.weight / 10).toString();
            svg.appendChild(text);
        });
    }

    animateMST(svg) {
        // Get visited edges and MST edges
        const { visitedEdges, mstEdges, speed } = this.props;

        // Animate both visited edges and MST edges sequentially
        visitedEdges.forEach((visitedEdge, index) => {
            const animationDuration = 0.5;
            const delay = (50 - speed) / 100;

            const isMSTEdge = mstEdges.some(mstEdge =>
                (mstEdge.from.id === visitedEdge.from.id && mstEdge.to.id === visitedEdge.to.id) ||
                (mstEdge.from.id === visitedEdge.to.id && mstEdge.to.id === visitedEdge.from.id)
            );

            const line = document.querySelector(`#edge-${visitedEdge.id}`);
            const vertexFrom = document.querySelector(`#vertex-${visitedEdge.from.id}`);
            const vertexTo = document.querySelector(`#vertex-${visitedEdge.to.id}`);
            const text = document.querySelector(`#edge-${visitedEdge.id}-weight`);

            this.animationTimeline.to(visitedEdge, {
                duration: animationDuration,
                onUpdate: () => {
                    line.setAttribute('stroke', "black");
                    line.setAttribute('stroke-width', 2);
                },
                delay: delay
            });

            let targetColor = isMSTEdge ? "#B31312" : "lightgray";
            let strokeWidth = isMSTEdge ? 2 : 1;
            this.animationTimeline.to(visitedEdge, {
                duration: animationDuration,
                onUpdate: () => {
                    line.setAttribute('stroke', targetColor);
                    line.setAttribute('stroke-width', strokeWidth);
                    if (isMSTEdge) {
                        vertexFrom.setAttribute('fill', "#B31312");
                        vertexTo.setAttribute('fill', "#B31312");
                        text.setAttribute('font-weight', "bold");

                    }
                },
            });

        });

        // Start the animation timeline
        this.animationTimeline.play();
    }

    render() {
        const { width, height } = this.props;
        return (
            <svg
                ref={this.svgRef}
                width={width}
                height={height}
                style={{ border: '1px solid gray', marginBottom: "60px" }}
            />
        );
    }
}

export default Canvas;
