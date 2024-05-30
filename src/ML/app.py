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
from sklearn.preprocessing import StandardScaler, LabelEncoder

import io
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set the matplotlib backend to 'Agg' to avoid GUI-related warnings
import matplotlib
matplotlib.use('Agg')

import tensorflow as tf
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.utils import to_categorical

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

# Multi-linear Regression
@app.route("/train", methods=["GET"])
def train_linear_model():
    X, y = load_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1 / 3, random_state=0)
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

# Load and preprocess CIFAR-10 dataset
(x_train_cifar, y_train_cifar), (x_test_cifar, y_test_cifar) = cifar10.load_data()
x_train_cifar, x_test_cifar = x_train_cifar / 255.0, x_test_cifar / 255.0
y_train_cifar, y_test_cifar = to_categorical(y_train_cifar), to_categorical(y_test_cifar)

# Define CNN model for CIFAR-10
cifar10_classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']
cnn_model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(32, 32, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])
cnn_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
cnn_model.fit(x_train_cifar, y_train_cifar, validation_data=(x_test_cifar, y_test_cifar), epochs=10)

# Load and preprocess the Iris dataset
iris_data = pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data', header=None)
iris_data.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class']
X_iris = iris_data.iloc[:, :-1].values
y_iris = iris_data.iloc[:, -1].values
labelencoder = LabelEncoder()
y_iris = labelencoder.fit_transform(y_iris)
X_train_iris, X_test_iris, y_train_iris, y_test_iris = train_test_split(X_iris, y_iris, test_size=0.2, random_state=0)
sc_iris = StandardScaler()
X_train_iris = sc_iris.fit_transform(X_train_iris)
X_test_iris = sc_iris.transform(X_test_iris)

# Define ANN model for Iris dataset
ann_model = Sequential([
    Dense(units=8, activation='relu', input_dim=4),
    Dense(units=8, activation='relu'),
    Dense(units=3, activation='softmax')
])
ann_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
ann_model.fit(X_train_iris, y_train_iris, batch_size=10, epochs=50, validation_split=0.1)

# Define routes for CIFAR-10 predictions and accuracy
@app.route('/cifar10-predict', methods=['POST'])
def cifar10_predict():
    try:
        data = request.json['data']
        print("Received data:", data)
        image = np.array(data).reshape((32, 32, 3))
        image = np.expand_dims(image, axis=0)
        prediction = cnn_model.predict(image)
        print("Prediction array:", prediction)
        predicted_class = np.argmax(prediction)
        print("Predicted class index:", predicted_class)
        confidence = np.max(prediction)
        if np.isnan(confidence):
            confidence = 0.0
        print("Confidence:", confidence)
        return jsonify({'predicted_class': cifar10_classes[predicted_class], 'confidence': float(confidence)})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Prediction failed'})

@app.route('/cifar10-accuracy', methods=['GET'])
def cifar10_accuracy():
    loss, accuracy = cnn_model.evaluate(x_test_cifar, y_test_cifar, verbose=0)
    return jsonify({'accuracy': accuracy})

# Define routes for Iris predictions, accuracy, and visualization
@app.route('/iris-predict', methods=['POST'])
def iris_predict():
    try:
        data = request.json['data']
        print("Received data:", data)
        data = np.array(data).reshape(1, -1)
        print("Reshaped data:", data)
        data = sc_iris.transform(data)
        print("Transformed data:", data)
        prediction = ann_model.predict(data)
        print("Prediction array:", prediction)
        predicted_class = np.argmax(prediction)
        print("Predicted class index:", predicted_class)
        return jsonify({'predicted_class': int(predicted_class), 'class': labelencoder.inverse_transform([predicted_class])[0]})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Prediction failed'})

@app.route('/iris-accuracy', methods=['GET'])
def iris_accuracy():
    loss, accuracy = ann_model.evaluate(X_test_iris, y_test_iris, verbose=0)
    return jsonify({'accuracy': accuracy})

@app.route('/iris-visualize', methods=['GET'])
def iris_visualize():
    plt.figure()
    plt.scatter(X_iris[:, 0], X_iris[:, 1], c=y_iris, cmap='viridis')
    plt.xlabel('Sepal Length')
    plt.ylabel('Sepal Width')
    plt.title('Iris Data Visualization')
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(port=5000)
