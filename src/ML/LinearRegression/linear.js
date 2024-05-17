import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';
import { Tooltip } from '@mui/material';
// import Navbar from '../Components/navbar';

function LinearRegressionVisualization() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [predictedOutput, setPredictedOutput] = useState('');

  // Fetch data from Flask server
  useEffect(() => {
    console.log('Fetching data from Flask server...');
    axios.get('http://localhost:5000/linear-regression-data')
      .then(response => {
        console.log('Data fetched successfully:', response.data);  // Log the response data
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

// Predict output based on user input
const predictOutput = () => {
  console.log('Data:', data);
  console.log('Input value:', inputValue);
  
  if (data && !isNaN(parseFloat(inputValue)) && !isNaN(data.intercept) && !isNaN(data.coefficient)) {
    const input = parseFloat(inputValue);
    console.log('Input:', input);
    console.log('Intercept:', data.intercept);
    console.log('Coefficient:', data.coefficient);
    
    if (isNaN(data.intercept) || isNaN(data.coefficient) || isNaN(input)) {
      console.log('One of the values is NaN.');
      setPredictedOutput('Invalid input! Please enter a valid number.');
      return;
    }
    
    const predicted = data.intercept + data.coefficient * input;
    console.log('Predicted:', predicted);
    
    setPredictedOutput(predicted.toFixed(2));
  } else {
    setPredictedOutput('Invalid input! Please enter a valid number.');
  }
};



  // Render chart using D3.js
  // Render chart using D3.js
useEffect(() => {
  if (data) {
    console.log('Data received:', data);  // Log the data to verify it is set correctly
    const svg = d3.select('#chart')
      .attr('width', 800)
      .attr('height', 400);

    const margin = { top: 20, right: 30, bottom: 60, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain(d3.extent(data.x_test))
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max([...data.y_test, ...data.y_predicted])]).nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll('*').remove(); // Clear previous elements if any

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Animate scatter plot points
    svg.selectAll('circle')
      .data(data.x_test.map((d, i) => ({ x: d, y: data.y_test[i] })))
      .enter()
      .append('circle')
      .attr('cx', d => margin.left)
      .attr('cy', d => height - margin.bottom)
      .attr('r', 5)
      .style('fill', 'blue')
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .style('opacity', 1);

    // Render line representing predicted values
    const line = svg.append('path')
      .datum(data.x_test.map((d, i) => ({ x: d, y: data.y_predicted[i] })))
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => margin.left)
        .y(d => height - margin.bottom)
      );

    const length = line.node().getTotalLength();
    line.attr('stroke-dasharray', length)
      .attr('stroke-dashoffset', length)
      .transition()
      .duration(2000)
      .attr('d', d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y))
      )
      .attr('stroke-dashoffset', 0);

    console.log('Chart rendered successfully');
  }
}, [data]);


  // Handle input value change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    console.log('Data:', data);
    console.log('Input value:', inputValue);
    console.log('Intercept:', data?.intercept);
    console.log('Coefficient:', data?.coefficient);
  }, [data, inputValue]);


  return (
    <div>
      {/* <Navbar currentPage="LinearRegression" /> */}
      <h1>Linear Regression Visualization</h1>
      <p>Data visualization should appear below:</p>
      {/* <div>Data: {JSON.stringify(data)}</div> Display raw data for debugging */}
      <svg id="chart"></svg>
      {data && <div>Mean Squared Error: {data.mse}</div>}
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter input value"
        />
        <button onClick={predictOutput}>Predict Output</button>
        <div>Predicted Output: {predictedOutput}</div>
      </div>
      {!data && <div>Loading data...</div>}
    </div>
  );
}

export default LinearRegressionVisualization;
