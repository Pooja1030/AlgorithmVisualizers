import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import * as tf from '@tensorflow/tfjs';

function CNN() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState('');
  const [accuracy, setAccuracy] = useState(null);

  const handleImageChange = (files) => {
    setImage(files[0]);
  };

  const handlePredict = async () => {
    if (image) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          const tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([32, 32])
            .toFloat()
            .div(tf.scalar(255.0))
            .expandDims();
          const inputData = tensor.arraySync();
          axios.post('http://localhost:5000/predict-cifar', { data: inputData })
            .then(response => {
              setPrediction(`Predicted Class: ${response.data.prediction}`);
              setConfidence(`Confidence: ${(response.data.confidence * 100).toFixed(2)}%`);
            })
            .catch(error => console.error('Error predicting:', error));
        };
      };
      reader.readAsDataURL(image);
    }
  };

  const handleGetAccuracy = () => {
    axios.get('http://localhost:5000/accuracy-cifar')
      .then(response => setAccuracy(`Model Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`))
      .catch(error => console.error('Error getting accuracy:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>CIFAR-10 CNN Classifier</Typography>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={handleImageChange}
        filesLimit={1}
      />
      <Button variant="contained" color="primary" onClick={handlePredict} disabled={!image}>Predict</Button>
      <Typography variant="h6">{prediction}</Typography>
      <Typography variant="h6">{confidence}</Typography>
      <Button variant="contained" color="secondary" onClick={handleGetAccuracy}>Get Accuracy</Button>
      <Typography variant="h6">{accuracy}</Typography>
    </Container>
  );
}

export default CNN;
