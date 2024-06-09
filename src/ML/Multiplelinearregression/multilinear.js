import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { Scatter, Chart } from 'react-chartjs-2';
import Navbar from '../../Components/navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const MultiLinearRegression = () => {
  const [points, setPoints] = useState([]);
  const [coefficients, setCoefficients] = useState([0, 0, 0]);
  const [error, setError] = useState(0);
  const [inputX1, setInputX1] = useState('');
  const [inputX2, setInputX2] = useState('');
  const [inputY, setInputY] = useState('');
  const [predictedY, setPredictedY] = useState(null);
  const [steps, setSteps] = useState([]);
  const [hyperplaneData, setHyperplaneData] = useState([]);

  useEffect(() => {
    if (points.length > 2) {
      calculateMultiLinearRegression();
      // Generate hyperplane data
      // const hyperplaneData = generateHyperplaneData(coefficients);
      // setHyperplaneData(hyperplaneData);
    }
  }, [points]);

  const addPoint = () => {
    const x1 = parseFloat(inputX1);
    const x2 = parseFloat(inputX2);
    const y = parseFloat(inputY);
    if (!isNaN(x1) && !isNaN(x2) && !isNaN(y)) {
      setPoints([...points, { x1, x2, y }]);
      setInputX1('');
      setInputX2('');
      setInputY('');
    }
  };

  const calculateMultiLinearRegression = () => {
    const n = points.length;
    if (n < 3) {
      setCoefficients([0, 0, 0]);
      setSteps([]);
      return;
    }

    const sumX1 = points.reduce((acc, point) => acc + point.x1, 0);
    const sumX2 = points.reduce((acc, point) => acc + point.x2, 0);
    const sumY = points.reduce((acc, point) => acc + point.y, 0);
    const sumX1Y = points.reduce((acc, point) => acc + point.x1 * point.y, 0);
    const sumX2Y = points.reduce((acc, point) => acc + point.x2 * point.y, 0);
    const sumX1X1 = points.reduce((acc, point) => acc + point.x1 * point.x1, 0);
    const sumX2X2 = points.reduce((acc, point) => acc + point.x2 * point.x2, 0);
    const sumX1X2 = points.reduce((acc, point) => acc + point.x1 * point.x2, 0);

    const denominator = n * (sumX1X1 * sumX2X2 - sumX1X2 * sumX1X2) -
      sumX1 * (sumX1 * sumX2X2 - sumX2 * sumX1X2) +
      sumX2 * (sumX1 * sumX1X2 - sumX2 * sumX1X1);

    if (denominator === 0) {
      setCoefficients([0, 0, 0]);
      setSteps(["Denominator is zero, cannot compute regression coefficients."]);
      return;
    }

    const b0 = (sumY * (sumX1X1 * sumX2X2 - sumX1X2 * sumX1X2) -
      sumX1 * (sumX1Y * sumX2X2 - sumX2Y * sumX1X2) +
      sumX2 * (sumX1Y * sumX1X2 - sumX2Y * sumX1X1)) / denominator;

    const b1 = (n * (sumX1Y * sumX2X2 - sumX2Y * sumX1X2) -
      sumY * (sumX1 * sumX2X2 - sumX2 * sumX1X2) +
      sumX2 * (sumX1 * sumX2Y - sumX2 * sumX1Y)) / denominator;

    const b2 = (n * (sumX1X1 * sumX2Y - sumX1X2 * sumX1Y) -
      sumX1 * (sumX1 * sumX2Y - sumX2 * sumX1Y) +
      sumY * (sumX1 * sumX1X2 - sumX2 * sumX1X1)) / denominator;

    setCoefficients([b0, b1, b2]);
    calculateError(b0, b1, b2);
    setSteps([
      `n = ${n}`,
      `sumX1 = ${sumX1.toFixed(2)}`,
      `sumX2 = ${sumX2.toFixed(2)}`,
      `sumY = ${sumY.toFixed(2)}`,
      `sumX1Y = ${sumX1Y.toFixed(2)}`,
      `sumX2Y = ${sumX2Y.toFixed(2)}`,
      `sumX1X1 = ${sumX1X1.toFixed(2)}`,
      `sumX2X2 = ${sumX2X2.toFixed(2)}`,
      `sumX1X2 = ${sumX1X2.toFixed(2)}`,
      `Denominator = ${denominator.toFixed(2)}`,
      `Intercept (b0) = ${b0.toFixed(2)}`,
      `Coefficient X1 (b1) = ${b1.toFixed(2)}`,
      `Coefficient X2 (b2) = ${b2.toFixed(2)}`,
    ]);
  };

  const calculateError = (b0, b1, b2) => {
    const error = points.reduce((acc, point) => {
      const predictedY = b0 + b1 * point.x1 + b2 * point.x2;
      return acc + Math.pow(point.y - predictedY, 2);
    }, 0) / points.length;
    setError(error);
  };

  const handlePredict = () => {
    if (!isNaN(inputX1) && !isNaN(inputX2)) {
      const x1 = parseFloat(inputX1);
      const x2 = parseFloat(inputX2);
      const y = coefficients[0] + coefficients[1] * x1 + coefficients[2] * x2;
      setPredictedY(y.toFixed(2));
    }
  };

  const resetPoints = () => {
    setPoints([]);
    setCoefficients([0, 0, 0]);
    setError(0);
    setSteps([]);
    setPredictedY(null);
    setHyperplaneData([]);
  };

  const scatterData = (xField, yField) => ({
    datasets: [{
      label: 'Data Points',
      data: points.map(point => ({ x: point[xField], y: point[yField] })),
      showLine: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      pointRadius: 5,
    }],
  });

  const scatterOptions = (xLabel, yLabel) => ({
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  });

  // const generateHyperplaneData = (coefficients) => {
  //   const hyperplaneData = [];
  //   for (let x = -10; x <= 10; x++) {
  //     for (let y = -10; y <= 10; y++) {
  //       const z = coefficients[0] + coefficients[1] * x + coefficients[2] * y;
  //       hyperplaneData.push({ x, y, z });
  //     }
  //   }
  //   return hyperplaneData;
  // };

  // const surfaceData = {
  //   datasets: [{
  //     label: 'Hyperplane',
  //     data: hyperplaneData,
  //     fill: true,
  //     borderColor: 'rgba(75, 192, 192, 1)',
  //     backgroundColor: 'rgba(75, 192, 192, 0.3)',
  //     borderWidth: 1,
  //     showLine: true,
  //   }],
  // };

  return (
    <div>
      <Navbar currentPage="Multi Linear Regression" info="multiplelinear-regression/info" />
      <div className='menu'>
        <input
          placeholder="Enter X1 value"
          value={inputX1}
          onChange={(e) => setInputX1(e.target.value)}
        />
        <input
          placeholder="Enter X2 value"
          value={inputX2}
          onChange={(e) => setInputX2(e.target.value)}
        />
        <input
          placeholder="Enter Y value"
          value={inputY}
          onChange={(e) => setInputY(e.target.value)}
        />
        <button className='add-btn' onClick={addPoint}>Add Point</button>
        <button className='visualize-btn' onClick={handlePredict}>Predict Y</button>
        <button className='reset-btn' onClick={resetPoints}>Reset</button>
      </div>
      {predictedY !== null && (
        <Typography variant="body1" align="center" gutterBottom>
          {predictedY && <div className="result">Predicted y = <strong>{predictedY}</strong></div>}
        </Typography>
      )}
      <div className='regression'>
        <div className="graph-container">
          <Typography variant="body1" align="center" gutterBottom color={"gray"}>
            Add points by clicking the 'Add Point' button.
          </Typography>
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "360px" }}>
            <h3>
              X1 vs Y
            </h3>
            <Scatter data={scatterData('x1', 'y')} options={scatterOptions('X1', 'Y')} />
          </div>
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "360px" }}>
            <h3>
              X2 vs Y
            </h3>
            <Scatter data={scatterData('x2', 'y')} options={scatterOptions('X2', 'Y')} />
          </div>
          <div className='graph' style={{ padding: "10px 30px 30px 10px", height: "360px" }}>
            <h3>
              X1 vs X2
            </h3>
            <Scatter data={scatterData('x1', 'x2')} options={scatterOptions('X1', 'X2')} />
          </div>

          {/* <div className="graph">
            <Typography variant="h6" align="center" gutterBottom>
              Hyperplane Visualization
            </Typography>
            <Chart type='scatter' data={surfaceData} options={{ maintainAspectRatio: true }} />
          </div> */}
        </div>

        <div className='calculations'>
          <p >Plane Equation:</p>
          <p>
            y = {coefficients[0].toFixed(2)} + {coefficients[1].toFixed(2)}*x1 + {coefficients[2].toFixed(2)}*x2
          </p>
          <p style={{ paddingTop: "10px" }}>
            Mean Squared Error: {error.toFixed(2)}
          </p>
          {steps.length > 0 &&
            <>
              <h4>Step-by-Step Calculation</h4>
              <ul className="steps-list">
                {steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </>}
        </div>
      </div>
    </div>
  );
};

export default MultiLinearRegression;
