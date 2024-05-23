import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

function RNN() {
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState('');
  const [accuracy, setAccuracy] = useState(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlePredict = async () => {
    if (inputText) {
      const encodedText = inputText.split(' ').map(word => word.charCodeAt(0) % 10000);
      axios.post('http://localhost:5000/predict', { data: [encodedText] })
        .then(response => setPrediction(`Predicted Class: ${response.data.prediction[0]}`))
        .catch(error => console.error('Error predicting:', error));
    }
  };

  const handleGetAccuracy = () => {
    axios.get('http://localhost:5000/accuracy')
      .then(response => setAccuracy(`Model Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`))
      .catch(error => console.error('Error getting accuracy:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>IMDb Review RNN Classifier</Typography>
      <TextField
        label="Enter your review"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={inputText}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handlePredict}>Predict</Button>
      <Typography variant="h6">{prediction}</Typography>
      <Button variant="contained" onClick={handleGetAccuracy}>Get Accuracy</Button>
      <Typography variant="h6">{accuracy}</Typography>
    </Container>
  );
}

export default RNN;
