from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, confusion_matrix, accuracy_score, classification_report
from sklearn import metrics
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
import io
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set the matplotlib backend to 'Agg' to avoid GUI-related warnings
import matplotlib
matplotlib.use('Agg')


app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Get the directory of the current file
base_dir = os.path.dirname(os.path.abspath(__file__))

# Linear Regression Data
@app.route('/linear-regression-data', methods=['GET'])
def get_linear_regression_data():
    # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "Book1.csv")
    # Load and preprocess the dataset
    df = pd.read_csv(csv_path)
    x = df['x'].values.reshape(-1, 1)
    y = df['y'].values.reshape(-1, 1)
    x_train, x_test, y_train, y_test = train_test_split(x, y, train_size=0.50)
    model = LinearRegression()
    model.fit(x_train, y_train)
    y_predicted = model.predict(x_test)
    mse = mean_squared_error(y_test, y_predicted)
    intercept = model.intercept_[0]
    coefficient = model.coef_[0][0]
    response_data = {
        "intercept": intercept,
        "coefficient": coefficient,
        "x_test": x_test.flatten().tolist(),
        "y_test": y_test.flatten().tolist(),
        "y_predicted": y_predicted.flatten().tolist(),
        "mse": mse
    }
    return jsonify(response_data)

# Logistic Regression Results
@app.route('/logistic-regression-results', methods=['GET'])
def get_logistic_regression_results():
    # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "diabetes.csv")
    # Load and preprocess the dataset
    data = pd.read_csv(csv_path)
    dependent_variable = 'Outcome'
    independent_variables = list(set(data.columns.tolist()) - {dependent_variable})
    x = data[independent_variables].values
    y = data[dependent_variable].values
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=0)
    sc = StandardScaler()
    x_train = sc.fit_transform(x_train)
    x_test = sc.transform(x_test)
    classifier = LogisticRegression()
    classifier.fit(x_train, y_train)
    y_pred = classifier.predict(x_test)
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
        "root_mean_squared_error": rmse
    }
    return jsonify(results)

# Count Plot
@app.route('/count-plot', methods=['GET'])
def get_count_plot():
   # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "diabetes.csv")
    # Load and preprocess the dataset
    data = pd.read_csv(csv_path)
    plt.figure()
    sns.countplot(x='Outcome', data=data)
    plt.xlabel('Outcome')
    plt.ylabel('Count')
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return send_file(img, mimetype='image/png')

# Line Plot
@app.route('/line-plot', methods=['GET'])
def get_line_plot():
   # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "diabetes.csv")
    # Load and preprocess the dataset
    data = pd.read_csv(csv_path)
    plt.figure()
    data['Outcome'].plot()
    plt.xlabel('Index')
    plt.ylabel('Outcome')
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()
    return send_file(img, mimetype='image/png')

# Multiple linear regression
 
@app.route("/train", methods=["GET"])
def train_model():
     # Construct the relative path to the CSV file
    csv_path = os.path.join(base_dir, "kc_house_data.csv")

    # Load and preprocess the dataset
    dataset = pd.read_csv(csv_path)
    dataset = dataset.drop(["id", "date"], axis=1)
    X = dataset.iloc[:, 1:].values
    y = dataset.iloc[:, 0].values
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


# KNN Iris Data
@app.route('/data', methods=['GET'])
def get_data():
    iris = load_iris()
    X = iris.data
    y = iris.target
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    data = [{'x': X_scaled[i][0], 'y': X_scaled[i][1], 'label': int(y[i])} for i in range(len(X_scaled))]
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    iris = load_iris()
    X = iris.data
    y = iris.target
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
    knn = KNeighborsClassifier(n_neighbors=3)
    knn.fit(X_train, y_train)
    try:
        data = request.json['data']
        data = [float(i) for i in data]
        data_scaled = scaler.transform([data])
        prediction = knn.predict(data_scaled)[0]
        neighbors = knn.kneighbors(data_scaled, return_distance=False)
        neighbor_points = X_scaled[neighbors[0]].tolist()
        class_name = iris.target_names[prediction]
        return jsonify({"prediction": class_name, "neighbors": neighbor_points})
    except Exception as e:
        return jsonify({"error": str(e)})

# KMeans Clustering
@app.route('/kmeans', methods=['GET'])
def kmeans():
    iris = load_iris()
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    df['target'] = iris.target
    num_clusters = int(request.args.get('num_clusters', 3))
    kmeans = KMeans(n_clusters=num_clusters, random_state=0)
    df['cluster'] = kmeans.fit_predict(df.iloc[:, :-1])
    response_data = {
        'clusters': df['cluster'].tolist(),
        'centroids': kmeans.cluster_centers_.tolist(),
        'data': df.iloc[:, :-1].values.tolist(),
        'feature_names': iris.feature_names
    }
    return jsonify(response_data)

@app.route('/predict-cluster', methods=['POST'])
def predict_cluster():
    new_data = request.json['data']
    num_clusters = int(request.json.get('num_clusters', 3))
    iris = load_iris()
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    kmeans = KMeans(n_clusters=num_clusters, random_state=0)
    kmeans.fit(df)
    cluster = kmeans.predict([new_data])
    return jsonify({'cluster': int(cluster[0])})

if __name__ == '__main__':
    app.run(port=5000)
