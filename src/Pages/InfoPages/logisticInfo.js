import React from 'react';
import Navbar from '../../Components/navbar';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const LogisticRegressionInfo = () => {
    return (
        <>
            <Navbar currentPage="Logistic Regression" visualizer="logistic-regression" />
            <div className="info-container-2">
                <div className="info-section">
                    <h2>Logistic Regression</h2>
                    <p>
                        Logistic regression is a supervised learning algorithm used for binary classification tasks,
                        where the goal is to predict one of two possible outcomes. Unlike linear regression,
                        which predicts continuous values, logistic regression predicts the probability that
                        a given input belongs to a certain class.
                    </p>
                    <p>
                        Logistic regression models the relationship between the independent variables (features)
                        and the dependent variable (target) using the logistic function, also known as the sigmoid function.
                        This function maps any real-valued number into the range [0, 1], making it suitable for
                        binary classification.
                    </p>

                    <h3>Logistic Regression Model</h3>
                    <p>
                        The logistic regression model predicts the probability that the dependent variable <InlineMath math="Y" />
                        equals 1 (the event of interest) given the independent variables (features) <InlineMath math="X" />:
                    </p>
                    <div className='formula'>
                        <BlockMath math="P(Y=1|X) = \frac{1}{1 + \exp(-(β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ))}" />
                    </div>

                    <p>Where,</p>
                    <ul>
                        <li><strong>P(Y=1|X):</strong> The probability that the target variable <InlineMath math="Y" />
                            equals 1 given the input features <InlineMath math="X" />.</li>
                        <li><strong>X₁, X₂, ..., Xₙ:</strong> The feature values (independent variables).</li>
                        <li><strong>β₀:</strong> The intercept term, which represents the baseline log-odds of the event
                            occurring when all features are zero.</li>
                        <li><strong>β₁, β₂, ..., βₙ:</strong> The coefficients (parameters) representing the impact of each
                            feature on the log-odds of the event occurring.</li>
                        <li><strong>exp:</strong> The exponential function <InlineMath math="e^x" />,
                            where <InlineMath math="e" /> is Euler's number (approximately 2.71828).</li>
                    </ul>

                    <h3>Exponential Function in Logistic Regression</h3>
                    <p>
                        The logistic regression model uses the logistic function (or sigmoid function) to map any real-valued
                        number into the range [0, 1], making it suitable for binary classification. The logistic function is defined as:
                    </p>
                    <div className='formula'>
                        <BlockMath math="\text{Logistic function} = \frac{1}{1 + \exp(-z)}" />
                    </div>
                    <p>
                        Where <InlineMath math="z" /> is the linear combination of the input features and their corresponding coefficients:
                    </p>
                    <div className='formula'>
                        <BlockMath math="z = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ" />
                    </div>
                    <p>
                        The exponential function <InlineMath math="\exp(-z)" /> transforms the linear combination
                        <InlineMath math="z" /> in such a way that the output of the logistic function is a probability value
                        between 0 and 1. This transformation ensures that the predicted probability is constrained within this
                        range, making it suitable for binary classification.
                    </p>

                    <h3>Applications</h3>
                    <p>
                        Logistic regression is widely used in various fields for binary classification tasks, including:
                    </p>
                    <ul>
                        <li><strong>Medical Diagnosis:</strong> Predicting the presence or absence of a disease based
                            on patient characteristics.</li>
                        <li><strong>Credit Scoring:</strong> Assessing the likelihood of a borrower defaulting on a loan.</li>
                        <li><strong>Marketing:</strong> Determining whether a customer will purchase a product based on their
                            demographic and behavioral data.</li>
                        <li><strong>Social Sciences:</strong> Analyzing binary outcomes such as voting behavior or employment status.</li>
                    </ul>
                    <button title='Learn more'>
                        <a href="https://en.wikipedia.org/wiki/Logistic_regression" target="_blank" rel="noopener noreferrer">
                            Learn more</a>
                    </button>
                </div>
            </div>
        </>
    );
};

export default LogisticRegressionInfo;
