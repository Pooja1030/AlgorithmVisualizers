import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/navbar";
import axios from 'axios';
import { gsap } from 'gsap';

function LogisticRegressionVisualization() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/logistic-regression-results')
      .then(response => {
        setResults(response.data);
        animateResults();
      })
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  const animateResults = () => {
    gsap.fromTo('.result-card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
  };

  return (
    <div>
      <Navbar currentPage="Logistic Regression" 
      info="logistic-regression/info"/> 

      {results ? (
        <div>
          <h2 className="result-card">Count Plot</h2>
          <img src="http://localhost:5000/count-plot" alt="Count Plot" className="result-card" />
          <h2 className="result-card">Line Plot</h2>
          <img src="http://localhost:5000/line-plot" alt="Line Plot" className="result-card" />
          
          <h3>Logistic Regression Results</h3>
          <h2 className="result-card">Confusion Matrix</h2>
          <pre className="result-card">{JSON.stringify(results.confusion_matrix, null, 2)}</pre>
          <h2 className="result-card">Accuracy Score</h2>
          <p className="result-card">{results.accuracy_score}%</p>
          <h2 className="result-card">Classification Report</h2>
          <pre className="result-card">{JSON.stringify(results.classification_report, null, 2)}</pre>
          <h2 className="result-card">Mean Absolute Error</h2>
          <p className="result-card">{results.mean_absolute_error}</p>
          <h2 className="result-card">Mean Squared Error</h2>
          <p className="result-card">{results.mean_squared_error}</p>
          <h2 className="result-card">Root Mean Squared Error</h2>
          <p className="result-card">{results.root_mean_squared_error}</p>
        </div>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
}

export default LogisticRegressionVisualization;
