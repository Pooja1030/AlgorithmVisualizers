// KNN.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';

function KNN() {
  const [input, setInput] = useState([5.1, 3.5, 1.4, 0.2]); // Default input values for Iris dataset
  const [prediction, setPrediction] = useState('');
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  const handleInputChange = (index, value) => {
    const newInput = [...input];
    newInput[index] = parseFloat(value);
    setInput(newInput);
  };

  const handlePredict = () => {
    axios.post('http://localhost:5000/predict', { data: input })
      .then(response => {
        setPrediction(response.data.prediction);
        animatePrediction(input, response.data.neighbors);
      })
      .catch(error => console.error('Error predicting:', error));
  };

  const animatePrediction = (newPoint, neighbors) => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 60, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) - 0.5, d3.max(data, d => d.x) + 0.5])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) - 0.5, d3.max(data, d => d.y) + 0.5])
      .range([height - margin.bottom, margin.top]);

    const newPointScaled = { x: x(newPoint[0]), y: y(newPoint[1]) };

    // Highlight the new point
    svg.append('circle')
      .attr('cx', newPointScaled.x)
      .attr('cy', newPointScaled.y)
      .attr('r', 0)
      .attr('fill', 'red')
      .attr('class', 'new-point')
      .transition()
      .duration(500)
      .attr('r', 5);

    // Animate neighbors
    neighbors.forEach((neighbor, index) => {
      const neighborPoint = { x: x(neighbor[0]), y: y(neighbor[1]) };
      svg.append('line')
        .attr('x1', newPointScaled.x)
        .attr('y1', newPointScaled.y)
        .attr('x2', newPointScaled.x)
        .attr('y2', newPointScaled.y)
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .transition()
        .delay(index * 100)
        .duration(500)
        .attr('x2', neighborPoint.x)
        .attr('y2', neighborPoint.y);
    });
  };

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current)
        .attr('width', 800)
        .attr('height', 400);

      const margin = { top: 20, right: 30, bottom: 60, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.x) - 0.5, d3.max(data, d => d.x) + 0.5])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.y) - 0.5, d3.max(data, d => d.y) + 0.5])
        .range([height - margin.bottom, margin.top]);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      svg.selectAll('*').remove();

      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 5)
        .attr('fill', d => color(d.label));

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom / 2)
        .attr('text-anchor', 'middle')
        .text('Feature 1');

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('dy', '1em')
        .attr('text-anchor', 'middle')
        .text('Feature 2');

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div>
      <h1>KNN Prediction</h1>
      <div>
        {input.map((val, index) => (
          <div key={index}>
            <label>Feature {index + 1}:</label>
            <input
              type="number"
              value={val}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={handlePredict}>Predict</button>
      {prediction && <div>Prediction: {prediction}</div>}
      <svg ref={svgRef} id="chart"></svg>
    </div>
  );
}

export default KNN;
