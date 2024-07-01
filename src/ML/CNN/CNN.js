import React, { useState } from 'react';
import axios from 'axios';
import { DropzoneArea } from 'material-ui-dropzone';
import * as tf from '@tensorflow/tfjs';
import Navbar from '../../Components/navbar';

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
              setPrediction(`Predicted Class: ${response.data.predicted_class}`);
              setConfidence(`Confidence: ${(response.data.confidence * 100).toFixed(2)}%`);
            })
            .catch(error => console.error('Error predicting:', error));
        };
      };
      reader.readAsDataURL(image);
    }
  };

  const handleGetAccuracy = () => {
    axios.get('http://localhost:5000/cifar10-accuracy')
      .then(response => setAccuracy(`Model Accuracy: ${(response.data.accuracy * 100).toFixed(2)}%`))
      .catch(error => console.error('Error getting accuracy:', error));
  };

  return (
    <div >
      <Navbar currentPage="Convolutional Neural Networks" info="cnn/info" />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2>CIFAR-10 CNN Classifier</h2>
        <div style={{ width: "400px" }}>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={handleImageChange}
            filesLimit={1}
          />
        </div>

        <div className='menu'>
          <button className='visualize-btn' onClick={handlePredict} disabled={!image}>Predict</button>
          <button className='visualize-btn' onClick={handleGetAccuracy}>Get Accuracy</button>
        </div>
        {prediction && <div className='result'>{prediction}</div>}
        {confidence && <div className='result'>{confidence}</div>}
        {accuracy && <div className='result'>{accuracy}</div>}
      </div>
    </div>
  );
}

export default CNN;
