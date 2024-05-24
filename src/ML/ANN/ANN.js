import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

function ANN() {
  const [inputData, setInputData] = useState({ sepal_length: '', sepal_width: '', petal_length: '', petal_width: '' });
  const [prediction, setPrediction] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handlePredict = () => {
    const data = [
      parseFloat(inputData.sepal_length),
      parseFloat(inputData.sepal_width),
      parseFloat(inputData.petal_length),
      parseFloat(inputData.petal_width)
    ];
    axios.post('http://localhost:5000/predict', { data })
      .then(response => setPrediction(`Predicted Class: ${response.data.class}`))
      .catch(error => console.error('Error predicting:', error));
  };

  const handleGetAccuracy = () => {
    axios.get('http://localhost:5000/accuracy')
      .then(response => setAccuracy(`Model Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`))
      .catch(error => console.error('Error getting accuracy:', error));
  };

  const handleVisualize = () => {
    axios.get('http://localhost:5000/visualize', { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(new Blob([response.data]));
        setImageSrc(url);
      })
      .catch(error => console.error('Error getting visualization:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Iris Classifier</Typography>
      <TextField label="Sepal Length" name="sepal_length" value={inputData.sepal_length} onChange={handleChange} />
      <TextField label="Sepal Width" name="sepal_width" value={inputData.sepal_width} onChange={handleChange} />
      <TextField label="Petal Length" name="petal_length" value={inputData.petal_length} onChange={handleChange} />
      <TextField label="Petal Width" name="petal_width" value={inputData.petal_width} onChange={handleChange} />
      <Button variant="contained" onClick={handlePredict}>Predict</Button>
      <Typography variant="h6">{prediction}</Typography>
      <Button variant="contained" onClick={handleGetAccuracy}>Get Accuracy</Button>
      <Typography variant="h6">{accuracy}</Typography>
      <Button variant="contained" onClick={handleVisualize}>Visualize Data</Button>
      {imageSrc && <img src={imageSrc} alt="Iris Data Visualization" />}
    </Container>
  );
}

export default ANN;
