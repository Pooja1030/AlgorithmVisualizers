import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';

const ANNInfo = () => {
    return (
        <>
            <Navbar currentPage="Artificial Neural Networks" visualizer="ann" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Artificial Neural Networks (ANN)</h2>
                    <p>
                        Artificial Neural Networks (ANNs) are computational models inspired by the 
                        structure and function of biological neural networks in the brain. ANNs are
                         capable of learning complex patterns and relationships from data through a process 
                         known as training.
                    </p>
                    <p>
                        ANNs consist of interconnected nodes called neurons, organized into layers. Each neuron
                         receives input signals, processes them using an activation function, and produces an 
                         output signal. The strength of the connections between neurons, represented by weights,
                          determines the network's behavior.
                    </p>
                    <h3>Structure of an Artificial Neural Network</h3>
                    <p>
                        ANNs typically consist of three types of layers:
                    </p>
                    <ul>
                        <li><strong>Input Layer:</strong> Receives input data and passes it to the hidden layers.</li>
                        <li><strong>Hidden Layers:</strong> Intermediate layers that perform computations on the 
                        input data using weighted connections and activation functions.</li>
                        <li><strong>Output Layer:</strong> Produces the final output of the network based on the 
                        computations performed in the hidden layers.</li>
                    </ul>
                    <h3>Training Artificial Neural Networks</h3>
                    <p>
                        Training an ANN involves adjusting the weights of the connections between neurons to
                         minimize the difference between the predicted outputs and the actual outputs (targets). 
                         This process is typically performed using optimization algorithms such as Gradient Descent.
                    </p>
                    <p>
                        During training, the network iteratively adjusts the weights based on the error 
                        (the difference between predicted and actual outputs) and propagates this error backward 
                        through the network, a process known as backpropagation.
                    </p>
                    <h3>Activation Functions</h3>
                    <p>
                        Activation functions introduce non-linearity into the network, allowing it to learn complex 
                        relationships in the data. Common activation functions include:
                    </p>
                    <ul>
                        <li><strong>ReLU (Rectified Linear Unit)</strong></li>
                        <li><strong>Sigmoid</strong></li>
                        <li><strong>Tanh (Hyperbolic Tangent)</strong></li>
                    </ul>
                    <h3>Applications</h3>
                    <p>
                        ANNs have applications in various fields, including:
                    </p>
                    <ul>
                        <li><strong>Image Recognition:</strong> Classifying images into categories.</li>
                        <li><strong>Natural Language Processing (NLP):</strong> Analyzing and generating human language.</li>
                        <li><strong>Speech Recognition:</strong> Converting spoken language into text.</li>
                        <li><strong>Medical Diagnosis:</strong> Identifying diseases from medical images and data.</li>
                    </ul>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Artificial_neural_network" target="_blank" rel="noopener noreferrer">Learn more</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ANNInfo;
