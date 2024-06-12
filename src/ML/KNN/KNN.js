import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/navbar";
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';

function KNN() {
  const [input, setInput] = useState(Array(4).fill('')); // Initialize with empty strings
  const [prediction, setPrediction] = useState('');
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  const handleInputChange = (index, value) => {
    const newInput = [...input];
    newInput[index] = value;
    setInput(newInput);
  };

  const handlePredict = () => {
    const inputValues = input.map(val => parseFloat(val));
    axios.post('http://localhost:5000/predict', { data: inputValues })
      .then(response => {
        setPrediction(response.data.prediction);
        animatePrediction(inputValues, response.data.neighbors);
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
    const newPointCircle = svg.append('circle')
      .attr('cx', newPointScaled.x)
      .attr('cy', newPointScaled.y)
      .attr('r', 0)
      .attr('fill', 'red');

    gsap.to(newPointCircle.node(), {
      duration: 0.5,
      attr: { r: 5 },
      ease: 'power2.out'
    });

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
        .attr('height', 600);

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

      const circles = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 0)
        .attr('fill', d => color(d.label))
        .attr('class', 'new-point');

      gsap.to(circles.nodes(), {
        duration: 1,
        attr: { r: 5 },
        ease: 'power2.out'
      });

      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom / 2 - 30)
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

  const features = [
    "Sepal length (cm)",
    "Sepal width (cm)",
    "Petal length (cm)",
    "Petal width (cm)",
  ]

  return (
    <div>
      <Navbar currentPage="K-Nearest Neighbours"
        info="knn/info" />
      <div className='menu'>
        {input.map((val, index) => (
          <div key={index}>
            <label>{features[index]}:</label>
            <input
              type="number"
              value={val}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button className='visualize-btn' onClick={handlePredict}>Predict</button>
      </div>
      {prediction && <div className='result'>Prediction: {prediction}</div>}

      <div className='regression'>
        <div className="graph-container">
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "550px", width: "750px" }}>
            <svg ref={svgRef} id="chart"></svg>
          </div>
        </div>
      </div>

      <div className="info-container-2">
        <div className="info-section">  <h3>Iris Dataset Details</h3>
          <p>The Iris dataset is a classic dataset in machine learning and statistics. It includes 150 observations of iris flowers, each described by four features:</p>
          <ul>
            <li>Sepal length (cm)</li>
            <li>Sepal width (cm)</li>
            <li>Petal length (cm)</li>
            <li>Petal width (cm)</li>
          </ul>
          <p>Each observation belongs to one of three species of iris:</p>
          <ul>
            <li>Iris setosa</li>
            <li>Iris versicolor</li>
            <li>Iris virginica</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default KNN;

