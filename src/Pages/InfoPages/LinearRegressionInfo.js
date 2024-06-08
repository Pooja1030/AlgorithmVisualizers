import React from 'react';
import Navbar from '../../Components/navbar';

const LinearRegressionInfo = () => {
    return (
        <>
            <Navbar currentPage="Linear Regression" visualizer="linear-regression" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Linear Regression</h2>
                    <p>
                        Linear regression is a fundamental supervised learning algorithm in machine 
                        learning used for predicting a continuous target variable based on one or more 
                        independent features. It assumes a linear relationship between the input features 
                        and the target variable.
                    </p>
                    <p>
                        In machine learning, linear regression is often employed for tasks such as predicting 
                        house prices based on features like area, number of bedrooms, and location; forecasting
                         sales based on advertising spending; or estimating the impact of variables on an outcome.
                    </p>

                    <p>
                        Linear regression models the relationship between the independent variables (features) 
                        X and the dependent variable (target) Y as a linear equation:
                    </p>
                    <div className='formula'><p>Y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε</p></div>
                    <p>
                        Where:
                    </p>
                    <ul>
                        <li>Y is the predicted value (target variable).</li>
                        <li>X₁, X₂, ..., Xₙ are the feature values (independent variables).</li>
                        <li>β₀, β₁, β₂, ..., βₙ are the coefficients (parameters) representing the 
                            strength and direction of the relationship between each feature and the target.</li>
                        <li>ε is the error term, representing the difference between the actual and
                             predicted values.</li>
                    </ul>
                    <p>
                        The goal of linear regression is to find the optimal values for the coefficients 
                        (β₀, β₁, β₂, ..., βₙ) that minimize the difference between the predicted and actual values,
                         typically using optimization techniques like gradient descent or analytical methods like least squares.
                    </p>


                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Linear_regression" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>

                </div>
            </div>
        </>
    );
};

export default LinearRegressionInfo;
