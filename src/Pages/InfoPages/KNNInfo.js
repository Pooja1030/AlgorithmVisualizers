import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const KNNInfo = () => {
    return (
        <>
            <Navbar currentPage="k-Nearest Neighbors" visualizer="knn" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>k-Nearest Neighbors (k-NN)</h2>
                    <p>
                        k-Nearest Neighbors (k-NN) is a simple, supervised machine learning algorithm that
                        can be used for both classification and regression tasks. It works by finding the
                        k-nearest data points (neighbors) to a given input and making predictions based on those neighbors.
                    </p>
                    <p>
                        The algorithm assumes that similar data points are close to each other in the feature space.
                        Therefore, the class or value of a new data point is determined by the majority class or
                        average value of its k-nearest neighbors.
                    </p>

                    <h3>Algorithm</h3>
                    <ol>
                        <li>Choose the number of neighbors, k.</li>
                        <li>Calculate the distance between the new data point and all the training data points.
                            Common distance metrics include Euclidean distance, Manhattan distance, and Minkowski distance.</li>
                        <li>Sort the distances in ascending order and select the k-nearest neighbors.</li>
                        <li>
                            For classification, assign the class that is most common among the k-nearest neighbors.
                            For regression, calculate the average of the values of the k-nearest neighbors.
                        </li>
                    </ol>
                    <p>
                        The Euclidean distance between two points <InlineMath math="(x_1, y_1)" /> and
                        <InlineMath math="(x_2, y_2)" /> in a 2-dimensional space is given by:
                    </p>
                    <div className='formula'>
                        <BlockMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                    </div>

                    <h3>Choosing k</h3>
                    <p>
                        The value of k significantly impacts the performance of the k-NN algorithm. A small value of
                        k (e.g., k = 1) can lead to a model that is sensitive to noise in the training data, while a
                        large value of k can smooth out the prediction but may miss important patterns.
                    </p>
                    <p>
                        Typically, the value of k is chosen through cross-validation, where the dataset is divided into
                        training and validation sets multiple times, and the value of k that yields the best performance on the validation sets is selected.
                    </p>

                    <h3>Applications</h3>
                    <p>
                        k-NN is widely used in various fields due to its simplicity and effectiveness, including:
                    </p>
                    <ul>
                        <li><strong>Pattern Recognition:</strong> Identifying patterns in data, such as handwriting recognition.</li>
                        <li><strong>Recommendation Systems:</strong> Recommending products to users based on similar users' preferences.</li>
                        <li><strong>Medical Diagnosis:</strong> Classifying diseases based on patient symptoms and historical data.</li>
                        <li><strong>Anomaly Detection:</strong> Detecting unusual patterns that do not conform to expected behavior.</li>
                    </ul>

                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm" target="_blank" rel="noopener noreferrer">Learn more</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default KNNInfo;
