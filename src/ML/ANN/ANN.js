import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/navbar';

function ANN() {
  const [inputs, setInputs] = useState({
    sepal_length: '',
    sepal_width: '',
    petal_length: '',
    petal_width: ''
  });

  const [prediction, setPrediction] = useState('');
  const [accuracy, setAccuracy] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handlePredict = () => {
    const inputData = Object.values(inputs).map(Number);
    axios.post('http://localhost:5000/predict-iris', { data: inputData })
      .then(response => setPrediction(`Predicted Class: ${response.data.class}`))
      .catch(error => console.error('Error predicting:', error));
  };

  const handleGetAccuracy = () => {
    axios.get('http://localhost:5000/accuracy-iris')
      .then(response => setAccuracy(`Model Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`))
      .catch(error => console.error('Error getting accuracy:', error));
  };

  return (
    <div>
      <Navbar currentPage="Artificial Neural Networks" info="ann/info" />
      <h2>Iris ANN Classifier</h2>
      <div className='menu'>
        <input placeholder="Sepal Length" name="sepal_length" value={inputs.sepal_length} onChange={handleChange} />
        <input placeholder="Sepal Width" name="sepal_width" value={inputs.sepal_width} onChange={handleChange} />
        <input placeholder="Petal Length" name="petal_length" value={inputs.petal_length} onChange={handleChange} />
        <input placeholder="Petal Width" name="petal_width" value={inputs.petal_width} onChange={handleChange} />

        <button className='visualize-btn' onClick={handlePredict}>Predict</button>
        <button className='visualize-btn' onClick={handleGetAccuracy}>Get Accuracy</button>
      </div>
      {prediction && <div className='result'>Prediction: {prediction}</div>}
      {accuracy && <div className='result'>Accuracy: {accuracy}</div>}

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
            <li>Iris setosa</li>
            <li>Iris versicolor</li>
            <li>Iris virginica</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ANN;
