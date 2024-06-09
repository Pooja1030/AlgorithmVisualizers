import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

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

                    <h3>Linear Regression Model</h3>

                    <p>
                        Linear regression models the relationship between the independent variable (feature) X
                        and the dependent variable (target) Y as a linear equation:
                    </p>
                    <div className='formula'>
                        <BlockMath math="Y = β₀ + β₁X + ε" />

                    </div>
                    <p>
                        Where:
                    </p>
                    <ul>
                        <li><strong>Y</strong> is the predicted value (target variable).</li>
                        <li><strong>X</strong> is the feature value (independent variable).</li>
                        <li><strong>β₀</strong> is the y-intercept (the value of <InlineMath math="Y" /> when <InlineMath math="X = 0" />).</li>
                        <li><strong>β₁</strong> is the slope of the line (the change in <InlineMath math="Y" /> for a unit change in <InlineMath math="X" />).</li>
                        <li><strong>ε</strong> is the error term, representing the difference between the actual and predicted values.</li>
                    </ul>
                    <p>
                        The goal of linear regression is to find the optimal values for the coefficients (β₀ and β₁)
                        that minimize the difference between the predicted and actual values, typically using optimization
                        techniques like gradient descent or analytical methods like least squares.
                    </p>


                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Simple_linear_regression" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LinearRegressionInfo;
