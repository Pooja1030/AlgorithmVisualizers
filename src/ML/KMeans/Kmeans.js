// KMeansVisualization.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';

function KMeansVisualization() {
  const [data, setData] = useState(null);
  const [numClusters, setNumClusters] = useState(3);
  const [inputValues, setInputValues] = useState([]);
  const [predictedCluster, setPredictedCluster] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/kmeans?num_clusters=${numClusters}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [numClusters]);

  useEffect(() => {
    if (data) {
      const svg = d3.select('#chart')
        .attr('width', 800)
        .attr('height', 400);

      const margin = { top: 20, right: 30, bottom: 60, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      svg.selectAll('*').remove(); // Clear previous elements if any

      // Scale the data to fit within the chart dimensions
      const x = d3.scaleLinear()
        .domain(d3.extent(data.data, d => d[0])) // Assuming the first feature for x-axis
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data.data, d => d[1])) // Assuming the second feature for y-axis
        .range([height - margin.bottom, margin.top]);

      // Append axes
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5));

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5));

      // Create color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Plot the data points
      const circles = svg.selectAll('circle')
        .data(data.data.map((d, i) => ({
          x: d[0],
          y: d[1],
          cluster: data.clusters[i]
        })))
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 5)
        .style('fill', d => color(d.cluster))
        .style('opacity', 0);

      gsap.to(circles.nodes(), {
        duration: 1,
        opacity: 1,
        stagger: 0.05
      });

      // Plot the centroids
      const rects = svg.selectAll('rect')
        .data(data.centroids)
        .enter()
        .append('rect')
        .attr('x', d => x(d[0]) - 5)
        .attr('y', d => y(d[1]) - 5)
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', 'black')
        .style('opacity', 0);

      gsap.to(rects.nodes(), {
        duration: 1,
        opacity: 1,
        delay: 0.5
      });

      // Add axis labels
      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${margin.left / 2},${height / 2})rotate(-90)`)
        .text(data.feature_names[1]);

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height - margin.bottom / 3})`)
        .text(data.feature_names[0]);
    }
  }, [data]);

  const handleNumClustersChange = (e) => {
    setNumClusters(e.target.value);
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = parseFloat(value);
    setInputValues(newValues);
  };

  const handlePredict = () => {
    axios.post('http://localhost:5000/predict', {
      data: inputValues,
      num_clusters: numClusters
    })
      .then(response => {
        setPredictedCluster(response.data.cluster);
      })
      .catch(error => console.error('Error predicting cluster:', error));
  };

  return (
    <div>
      <h1>K-means Clustering Visualization</h1>
      <label htmlFor="numClusters">Number of clusters:</label>
      <input
        type="number"
        id="numClusters"
        value={numClusters}
        onChange={handleNumClustersChange}
        min="1"
      />
      <svg id="chart"></svg>
      <div>
        {data && data.feature_names.map((name, index) => (
          <div key={index}>
            <label>{name}:</label>
            <input
              type="number"
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handlePredict}>Predict Cluster</button>
        {predictedCluster !== null && (
          <div>
            Predicted Cluster: {predictedCluster}
          </div>
        )}
      </div>
    </div>
  );
}

export default KMeansVisualization;
