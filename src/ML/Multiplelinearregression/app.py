from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import os

app = Flask(__name__)
CORS(app)


def load_data():
    # Get the directory of the current file
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "kc_house_data.csv")

    # Load and preprocess the dataset
    dataset = pd.read_csv(csv_path)
    dataset = dataset.drop(["id", "date"], axis=1)
    X = dataset.iloc[:, 1:].values
    y = dataset.iloc[:, 0].values
    return X, y


@app.route("/train", methods=["GET"])
def train_model():
    X, y = load_data()
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=1 / 3, random_state=0
    )

    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    y_pred = regressor.predict(X_test)

    response = {
        "X_test": X_test.tolist(),
        "y_test": y_test.tolist(),
        "y_pred": y_pred.tolist(),
        "coefficients": regressor.coef_.tolist(),
        "intercept": regressor.intercept_.tolist(),
        "mse": np.mean((y_pred - y_test) ** 2),
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(port=5000)
