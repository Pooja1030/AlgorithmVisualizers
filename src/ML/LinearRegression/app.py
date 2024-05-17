# Flask backend
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

@app.route('/linear-regression-data', methods=['GET'])
def get_linear_regression_data():
    print('Request received at /linear-regression-data')  # Debug print
     # Get the directory of the current file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "Book1.csv")

    # Load and preprocess the dataset
    df = pd.read_csv(csv_path)
    x = df['x'].values.reshape(-1, 1)
    y = df['y'].values.reshape(-1, 1)
    
    # Split the dataset
    x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.50)
    
    # Train the model
    model = LinearRegression()
    model.fit(x_train, y_train)
    
    # Make predictions
    y_predicted = model.predict(x_test)
    
    # Calculate mean squared error
    mse = mean_squared_error(y_test, y_predicted)

    # Extract intercept and coefficient
    intercept = model.intercept_[0]
    coefficient = model.coef_[0][0]

    # Prepare the data for JSON response
    response_data = {
        "intercept": intercept,
        "coefficient": coefficient,
        "x_test": x_test.flatten().tolist(),
        "y_test": y_test.flatten().tolist(),
        "y_predicted": y_predicted.flatten().tolist(),
        "mse": mse
    }
    
    print('Response Data:', response_data)  # Debug print
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(port=5000)
