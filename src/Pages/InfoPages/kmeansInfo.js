import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const KMeansInfo = () => {
    return (
        <>
            <Navbar currentPage="k-Means Clustering" visualizer="kmeans" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>k-Means Clustering</h2>
                    <p>
                        k-Means clustering is an unsupervised machine learning algorithm used to
                        partition a dataset into k distinct, non-overlapping subsets (clusters).
                        The algorithm aims to minimize the variance within each cluster and maximize
                        the variance between clusters.
                    </p>
                    <p>
                        The k-Means algorithm is iterative and refines the clusters through repeated
                        adjustments of the cluster centroids and reassignment of data points until convergence.
                    </p>

                    <h3>Algorithm</h3>
                    <ol>
                        <li>Choose the number of clusters, k.</li>
                        <li>Initialize the cluster centroids by randomly selecting k data points from the dataset.</li>
                        <li>Assign each data point to the nearest cluster centroid.</li>
                        <li>Recalculate the centroids of the clusters based on the current assignment of data points.</li>
                        <li>Repeat steps 3 and 4 until the cluster assignments do not change or a maximum
                            number of iterations is reached.</li>
                    </ol>
                    <p>
                        The Euclidean distance between two points <InlineMath math="(x_1, y_1)" /> and <InlineMath math="(x_2, y_2)" /> in a 2-dimensional space is given by:
                    </p>
                    <div className='formula'>
                        <BlockMath math="d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                    </div>

                    <h3>Choosing k</h3>
                    <p>
                        The value of k significantly impacts the resulting clusters. A small value of k
                        can lead to underfitting, while a large value of k can lead to overfitting.
                        The optimal value of k is often determined using methods such as the Elbow Method or
                        Silhouette Analysis.
                    </p>

                    <h3>Applications</h3>
                    <p>
                        k-Means clustering is widely used in various fields due to its simplicity and
                        effectiveness, including:
                    </p>
                    <ul>
                        <li><strong>Customer Segmentation:</strong> Grouping customers based on purchasing behavior.</li>
                        <li><strong>Image Compression:</strong> Reducing the number of colors in an image by
                            clustering similar colors.</li>
                        <li><strong>Document Clustering:</strong> Organizing documents into topics based on
                            content similarity.</li>
                        <li><strong>Market Research:</strong> Identifying distinct groups within a market for
                            targeted marketing.</li>
                    </ul>
                    <button title="Learn more">
                        <a href="https://en.wikipedia.org/wiki/K-means_clustering" target="_blank" rel="noopener noreferrer">Learn more about k-Means Clustering</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default KMeansInfo;
