from flask import Flask, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score, classification_report
from sklearn import metrics
import io
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests


# Get the directory of the current file
base_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the relative path to the CSV file
csv_path = os.path.join(base_dir, "diabetes.csv")
# Load and preprocess the dataset
data = pd.read_csv(csv_path)

dependent_variable = "Outcome"
independent_variables = list(set(data.columns.tolist()) - {dependent_variable})
x = data[independent_variables].values
y = data[dependent_variable].values
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.33, random_state=0
)

sc = StandardScaler()
x_train = sc.fit_transform(x_train)
x_test = sc.transform(x_test)

classifier = LogisticRegression()
classifier.fit(x_train, y_train)
y_pred = classifier.predict(x_test)


# Create a route to serve the logistic regression results
@app.route("/logistic-regression-results", methods=["GET"])
def get_logistic_regression_results():
    confusion = confusion_matrix(y_test, y_pred)
    accuracy = accuracy_score(y_test, y_pred) * 100
    classification = classification_report(y_test, y_pred, output_dict=True)
    mae = metrics.mean_absolute_error(y_test, y_pred)
    mse = metrics.mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(metrics.mean_squared_error(y_test, y_pred))

    results = {
        "confusion_matrix": confusion.tolist(),
        "accuracy_score": accuracy,
        "classification_report": classification,
        "mean_absolute_error": mae,
        "mean_squared_error": mse,
        "root_mean_squared_error": rmse,
    }

    return jsonify(results)


# Create a route to serve the count plot as an image
@app.route("/count-plot", methods=["GET"])
def get_count_plot():
    plt.figure()
    sns.countplot(x="Outcome", data=data)
    plt.xlabel("Outcome")
    plt.ylabel("Count")
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.close()
    return send_file(img, mimetype="image/png")


# Create a route to serve the line plot as an image
@app.route("/line-plot", methods=["GET"])
def get_line_plot():
    plt.figure()
    data["Outcome"].plot()
    plt.xlabel("Index")
    plt.ylabel("Outcome")
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    plt.close()
    return send_file(img, mimetype="image/png")


if __name__ == "__main__":
    app.run(port=5000)
