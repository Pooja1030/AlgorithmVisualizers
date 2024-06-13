import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/navbar";
import axios from 'axios';
import * as d3 from 'd3';
import { gsap } from 'gsap';

function KMeans() {
  const [data, setData] = useState(null);
  const [numClusters, setNumClusters] = useState(3);
  const [inputValues, setInputValues] = useState([]);
  const [predictedCluster, setPredictedCluster] = useState(null);
  const [xFeature, setXFeature] = useState('sepal length (cm)');
  const [yFeature, setYFeature] = useState('sepal width (cm)');

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
        .attr('height', 600);

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = +svg.attr('width') - margin.left - margin.right;
      const height = +svg.attr('height') - margin.top - margin.bottom;

      svg.selectAll('*').remove(); // Clear previous elements if any

      const xIndex = data.feature_names.indexOf(xFeature);
      const yIndex = data.feature_names.indexOf(yFeature);

      // Scale the data to fit within the chart dimensions
      const x = d3.scaleLinear()
        .domain(d3.extent(data.data, d => d[xIndex]))
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data.data, d => d[yIndex]))
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
          x: d[xIndex],
          y: d[yIndex],
          cluster: data.clusters[i]
        })))
        .enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 0)
        .style('fill', d => color(d.cluster))
        .on('mouseover', (event, d) => {
          d3.select(event.target).transition().duration(200).attr('r', 7);
          const tooltip = d3.select('#tooltip');
          tooltip.style('visibility', 'visible')
            .style('left', `${event.pageX - 350}px`)
            .style('top', `${event.pageY - 350}px`)
            .html(`Cluster: ${d.cluster}<br/>x: ${d.x}<br/>y: ${d.y}`);
        })
        .on('mouseout', (event) => {
          d3.select(event.target).transition().duration(200).attr('r', 5);
          d3.select('#tooltip').style('visibility', 'hidden');
        });

      gsap.to(circles.nodes(), {
        duration: 1,
        attr: { r: 5 },
        ease: 'power2.out'

      });

      // Plot the centroids
      const rects = svg.selectAll('rect')
        .data(data.centroids)
        .enter()
        .append('rect')
        .attr('x', d => x(d[xIndex]) - 5)
        .attr('y', d => y(d[yIndex]) - 5)
        .attr('width', 15)
        .attr('height', 15)
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
        .attr('transform', `translate(${margin.left / 2 - 10},${height / 2})rotate(-90)`)
        .text(yFeature);

      svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${width / 2},${height - margin.bottom / 3 + 10})`)
        .text(xFeature);
    }
  }, [data, xFeature, yFeature]);

  const handleNumClustersChange = (e) => {
    setNumClusters(e.target.value);
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = parseFloat(value);
    setInputValues(newValues);
  };

  const handlePredict = () => {
    setPredictedCluster("");
    axios.post('http://localhost:5000/predict-cluster', {
      data: inputValues,
      num_clusters: numClusters
    })
      .then(response => {
        setPredictedCluster(response.data.cluster);
      })
      .catch(error => console.error('Error predicting cluster:', error));
  };

  const species = [
    "Iris setosa",
    "Iris versicolor",
    "Iris virginica",
  ]

  return (
    <div>
      <Navbar currentPage="K-means Clustering"
        info="kmeans/info" />

      <div className='menu'>
        <label htmlFor="numClusters">Number of clusters:</label>
        <input
          type="number"
          id="numClusters"
          value={numClusters}
          onChange={handleNumClustersChange}
          min="1"
          max="3"
        />
        <label htmlFor="xFeature">X-Axis:</label>
        <select id="xFeature" value={xFeature} onChange={(e) => setXFeature(e.target.value)}>
          {data && data.feature_names.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <label htmlFor="yFeature">Y-Axis:</label>
        <select id="yFeature" value={yFeature} onChange={(e) => setYFeature(e.target.value)}>
          {data && data.feature_names.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>

        <div style={{ display: "flex" }}>
          {data && data.feature_names.map((name, index) => (
            <div key={index}>
              <input
                type="number"
                placeholder={name}
                value={inputValues[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
          <button className='visualize-btn' onClick={handlePredict}>Predict Cluster</button>
        </div>
      </div>

      {predictedCluster !== null && (
        <div className='result'>
          Predicted Cluster: {predictedCluster} <br />
          <strong>{species[predictedCluster]}</strong>
        </div>
      )}
      <div className='regression'>
        <div className="graph-container">
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "550px", width: "750px" }}>

            <svg id="chart"></svg>
            <div id="tooltip" className='tooltip'></div>
          </div>
        </div>
      </div>


      <div className="info-container-2">
        <div className="info-section">  <h3>Iris Dataset Details</h3>
          <p>The Iris dataset is a classic dataset in machine learning and statistics.
            It includes 150 observations of iris flowers, each described by four features:</p>
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

export default KMeans;
