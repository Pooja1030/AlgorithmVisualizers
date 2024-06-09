import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MultipleLinearRegressionInfo = () => {
    return (
        <>
            <Navbar currentPage="Multiple Linear Regression" visualizer="multiple-linearregression" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Multiple Linear Regression</h2>
                    <p>
                        Multiple linear regression is an extension of simple linear regression that is used to predict
                        a continuous target variable based on multiple independent features. It assumes a linear
                        relationship between the features and the target variable.
                    </p>
                    <p>
                        Multiple linear regression models the relationship between the independent variables (features)
                        <InlineMath math="X₁, X₂, ..., Xₙ" />       and the dependent variable (target) <InlineMath math="Y" /> as a linear equation:
                    </p>
                    <p>
                        <strong></strong>
                    </p>
                    <div className='formula'>
                        <BlockMath math="Y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε" />
                    </div>
                    <p>
                        Where:
                    </p>
                    <ul>
                        <li><strong>Y</strong> is the predicted value (target variable).</li>
                        <li><strong>X₁, X₂, ..., Xₙ</strong> are the feature values (independent variables).</li>
                        <li><strong>β₀</strong> is the y-intercept (the value of <InlineMath math="Y" />  when all <InlineMath math="X" />'s are 0).</li>
                        <li><strong>β₁, β₂, ..., βₙ</strong> are the coefficients (parameters) representing the strength and direction
                            of the relationship between each feature and the target.</li>
                        <li><strong>ε</strong> is the error term, representing the difference between the actual and predicted values.</li>
                    </ul>
                    <p>
                        The goal of multiple linear regression is to find the optimal values for the coefficients
                        <InlineMath math=" (β₀, β₁, β₂, ..., βₙ)" />  that minimize the difference between the predicted and actual values,
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

export default MultipleLinearRegressionInfo;
