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

    // Remove any existing highlights
    svg.selectAll('.highlight').remove();

    // Highlight the new point
    const newPointCircle = svg.append('circle')
      .attr('cx', newPointScaled.x)
      .attr('cy', newPointScaled.y)
      .attr('r', 0)
      .attr('fill', 'red')
      .attr('class', 'highlight');

    gsap.to(newPointCircle.node(), {
      duration: 0.5,
      attr: { r: 8 },
      ease: 'power2.out'
    });

    // Animate neighbors
    neighbors.forEach((neighbor, index) => {
      const neighborPoint = { x: x(neighbor[0]), y: y(neighbor[1]) };
      svg.append('line')
        .attr('class', 'highlight')
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

      svg.append('circle')
        .attr('cx', neighborPoint.x)
        .attr('cy', neighborPoint.y)
        .attr('r', 0)
        .attr('fill', 'purple')
        .attr('class', 'highlight')
        .transition()
        .delay(index * 100)
        .duration(500)
        .attr('r', 6);
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
        .attr('height', 800);

      const margin = { top: 50, right: 20, bottom: 70, left: 70 };
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
        .attr('class', 'data-point');

      gsap.to(circles.nodes(), {
        duration: 1,
        attr: { r: 5 },
        ease: 'power2.out'
      });

      // X-axis
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom / 2 - 50)
        .attr('text-anchor', 'middle')
        .text('Sepal Length (cm)');

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));


      // Y-axis label
      svg.append('text')
        .attr('transform', `translate(${margin.left / 2},${height / 2}) rotate(-90)`) // Adjusted positioning for Y-axis label
        .attr('text-anchor', 'middle')
        .text('Sepal Width (cm)');

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
  ];
  const species = [
    "Iris setosa",
    "Iris versicolor",
    "Iris virginica",
  ]

  return (
    <div>
      <Navbar currentPage="K-Nearest Neighbours" info="knn/info" />
      <div className='menu'>
        {input.map((val, index) => (
          <div key={index} className='input-field'>
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
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "680px", width: "720px" }}>
            <svg ref={svgRef} id="chart"></svg>
          </div>
        </div>
      </div>

      <div className="info-container-2">
        <div className="info-section">
          <h3>Iris Dataset Details</h3>
          <p>The Iris dataset is a classic dataset in machine learning and statistics. It includes 150 observations of iris flowers, each described by four features:</p>
          <ul>
            <li>Sepal length (cm)</li>
            <li>Sepal width (cm)</li>
            <li>Petal length (cm)</li>
            <li>Petal width (cm)</li>
          </ul>
          <p>Each observation belongs to one of three species of iris:</p>
          <ul>
            {species.map((name, index) => (
              <li key={index}>
                <span style={{ color: d3.schemeCategory10[index], marginLeft: "-24px", marginRight: "10px" }}>◉</span>
                {name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default KNN;
