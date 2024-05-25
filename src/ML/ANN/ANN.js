import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography } from '@mui/material';

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
    <Container>
      <Typography variant="h4" gutterBottom>Iris ANN Classifier</Typography>
      <TextField label="Sepal Length" name="sepal_length" value={inputs.sepal_length} onChange={handleChange} />
      <TextField label="Sepal Width" name="sepal_width" value={inputs.sepal_width} onChange={handleChange} />
      <TextField label="Petal Length" name="petal_length" value={inputs.petal_length} onChange={handleChange} />
      <TextField label="Petal Width" name="petal_width" value={inputs.petal_width} onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handlePredict}>Predict</Button>
      <Typography variant="h6">{prediction}</Typography>
      <Button variant="contained" color="secondary" onClick={handleGetAccuracy}>Get Accuracy</Button>
      <Typography variant="h6">{accuracy}</Typography>
    </Container>
  );
}

export default ANN;
