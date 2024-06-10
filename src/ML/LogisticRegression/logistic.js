import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/navbar";
import axios from 'axios';

function LogisticRegressionVisualization() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/logistic-regression-results')
      .then(response => {
        setResults(response.data);
      })
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  const renderConfusionMatrix = (matrix) => {
    return (
      <table className="confusion-matrix" style={{marginBottom:"20px"}}>
        <thead>
          <tr>
            <th></th>
            <th>Predicted 0</th>
            <th>Predicted 1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Actual 0</td>
            <td>{matrix[0][0]}</td>
            <td>{matrix[0][1]}</td>
          </tr>
          <tr>
            <td>Actual 1</td>
            <td>{matrix[1][0]}</td>
            <td>{matrix[1][1]}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderClassificationReport = (report) => {
    const headers = ["Precision", "Recall", "F1-Score", "Support"];
    const classes = Object.keys(report).filter(key => !["accuracy", "macro avg", "weighted avg"].includes(key));
    const avgMetrics = ["accuracy", "macro avg", "weighted avg"];

    return (
      <table className="classification-report" style={{marginBottom:"20px"}}>
        <thead>
          <tr>
            <th>Class</th>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => (
            <tr key={cls}>
              <td>{cls}</td>
              <td>{report[cls].precision.toFixed(2)}</td>
              <td>{report[cls].recall.toFixed(2)}</td>
              <td>{report[cls]["f1-score"].toFixed(2)}</td>
              <td>{report[cls].support}</td>
            </tr>
          ))}
          {avgMetrics.map(metric => (
            <tr key={metric}>
              <td>{metric}</td>
              <td>{report[metric].precision ? report[metric].precision.toFixed(2) : report[metric].toFixed(2)}</td>
              <td>{report[metric].recall ? report[metric].recall.toFixed(2) : report[metric].toFixed(2)}</td>
              <td>{report[metric]["f1-score"] ? report[metric]["f1-score"].toFixed(2) : report[metric].toFixed(2)}</td>
              <td>{report[metric].support}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Navbar currentPage="Logistic Regression" info="logistic-regression/info" />

      {results ? (
        <div className='regression'>
          <div className="graph-container">
            <h3>Count Plot</h3>
            <img src="http://localhost:5000/count-plot" alt="Count Plot" className="graph" />
            <h3>Line Plot</h3>
            <img src="http://localhost:5000/line-plot" alt="Line Plot" className="graph" />
          </div>

          <div className='calculations'>
            <h4>Results</h4>
            
            <h2  style={{marginBottom:"20px", marginTop:"20px"}}>Confusion Matrix</h2>
            {renderConfusionMatrix(results.confusion_matrix)}

            <h2  style={{marginBottom:"20px"}}>Classification Report</h2>
            {renderClassificationReport(results.classification_report)}

            <ul className="steps-list">
              <li><strong>Accuracy Score: </strong>{results.accuracy_score}%</li>
              <li><strong>Mean Absolute Error: </strong>{results.mean_absolute_error}</li>
              <li><strong>Mean Squared Error: </strong>{results.mean_squared_error}</li>
              <li><strong>Root Mean Squared Error: </strong>{results.root_mean_squared_error}</li>
            </ul>
          </div>
        </div>
      ) : (
          <p>Loading results...</p>
      )}
    </div>
  );
}

export default LogisticRegressionVisualization;
