import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/navbar";
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';

function MultipleLinearRegressionVisualization() {
  const [data, setData] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [predictedOutput, setPredictedOutput] = useState(null);

  // Fetch data from Flask server
  useEffect(() => {
    axios.get('http://localhost:5000/train')
      .then(response => {
        console.log('Data fetched successfully:', response.data); // Debugging statement
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Render chart using D3.js
  useEffect(() => {
    if (data) {
      console.log('Data received:', data); // Debugging statement

      const svg = d3.select('#chart')
        .attr('width', 800)
        .attr('height', 400);

      const margin = { top: 20, right: 30, bottom: 60, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      const x = d3.scaleLinear()
        .domain(d3.extent(data.X_test, d => d[0])) // Assuming the first feature for x-axis
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, d3.max([...data.y_test, ...data.y_pred])]).nice()
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
        .data(data.X_test.map((d, i) => ({ x: d[0], y: data.y_test[i] }))) // Assuming the first feature for x-axis
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
        .datum(data.X_test.map((d, i) => ({ x: d[0], y: data.y_pred[i] }))) // Assuming the first feature for x-axis
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

      console.log('Chart rendered successfully'); // Debugging statement
    }
  }, [data]);

  
  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const predictOutput = () => {
    if (data && inputValues.length === data.coefficients.length) {
      const input = inputValues.map(parseFloat);
      const predicted = data.intercept + data.coefficients.reduce((acc, coeff, i) => acc + coeff * input[i], 0);
      setPredictedOutput(predicted.toFixed(2));
    } else {
      setPredictedOutput('Invalid input! Please enter valid numbers for all variables.');
    }
  };



  return (
    <div>
      <Navbar currentPage="Multiple Linear Regression" /> 
      <svg id="chart"></svg>
      {data && <div>Mean Squared Error: {data.mse}</div>}
      {!data && <div>Loading data...</div>}
      <div>
        {data && data.coefficients.map((coeff, index) => (
          index < 5 && // Limiting the number of input boxes to 5
          <input
            key={index}
            type="number"
            value={inputValues[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Enter value for X${index + 1}`}
          />
        ))}
        <button onClick={predictOutput}>Predict Output</button>
        {predictedOutput && <div>Predicted Output: {predictedOutput}</div>}
      </div>
    </div>
  );
}

export default MultipleLinearRegressionVisualization;
