from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import mean_squared_error, confusion_matrix, accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.utils import to_categorical
import io
import matplotlib.pyplot as plt
import seaborn as sns
import os
from tensorflow.keras.datasets import cifar10

# Set the matplotlib backend to 'Agg' to avoid GUI-related warnings
import matplotlib
matplotlib.use('Agg')

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Get the directory of the current file
base_dir = os.path.dirname(os.path.abspath(__file__))

# CIFAR-10 classes
cifar10_classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

# Load and preprocess CIFAR-10 dataset
(x_train_cifar, y_train_cifar), (x_test_cifar, y_test_cifar) = cifar10.load_data()
x_train_cifar, x_test_cifar = x_train_cifar / 255.0, x_test_cifar / 255.0
y_train_cifar, y_test_cifar = to_categorical(y_train_cifar), to_categorical(y_test_cifar)

# Define CNN model for CIFAR-10
cifar_model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(32, 32, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])

cifar_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the CIFAR-10 model
cifar_model.fit(x_train_cifar, y_train_cifar, validation_data=(x_test_cifar, y_test_cifar), epochs=10)

# Load and preprocess the Iris dataset
iris_data = pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data', header=None)
iris_data.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class']
X = iris_data.iloc[:, 0:4].values
y = iris_data.iloc[:, 4].values

# Encode class labels for Iris dataset
labelencoder = LabelEncoder()
y = labelencoder.fit_transform(y)

# Split the Iris dataset
X_train_iris, X_test_iris, y_train_iris, y_test_iris = train_test_split(X, y, test_size=0.2, random_state=0)

# Standardize features for Iris dataset
sc = StandardScaler()
X_train_iris = sc.fit_transform(X_train_iris)
X_test_iris = sc.transform(X_test_iris)

# Build the ANN model for Iris dataset
iris_model = Sequential()
iris_model.add(Dense(units=8, activation='relu', input_dim=4))
iris_model.add(Dense(units=8, activation='relu'))
iris_model.add(Dense(units=3, activation='softmax'))

iris_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the ANN model for Iris dataset
iris_model.fit(X_train_iris, y_train_iris, batch_size=10, epochs=50, validation_split=0.1)

# Endpoint for CIFAR-10 predictions
@app.route('/predict-cifar', methods=['POST'])
def predict_cifar():
    data = request.json['data']
    image = np.array(data).reshape((32, 32, 3))
    image = np.expand_dims(image, axis=0)
    prediction = cifar_model.predict(image)
    
    predicted_class = np.argmax(prediction)
    confidence = np.max(prediction)
    
    if np.isnan(confidence):
        confidence = 0.0
    
    return jsonify({'prediction': cifar10_classes[predicted_class], 'confidence': float(confidence)})

# Endpoint for CIFAR-10 accuracy
@app.route('/accuracy-cifar', methods=['GET'])
def get_accuracy_cifar():
    loss, accuracy = cifar_model.evaluate(x_test_cifar, y_test_cifar, verbose=0)
    return jsonify({'accuracy': accuracy})

# Endpoint for ANN Iris predictions
@app.route('/predict-iris', methods=['POST'])
def predict_iris():
    data = request.json['data']
    data = np.array(data).reshape(1, -1)
    data = sc.transform(data)
    prediction = iris_model.predict(data)
    predicted_class = np.argmax(prediction, axis=1)[0]
    return jsonify({'prediction': int(predicted_class), 'class': labelencoder.inverse_transform([predicted_class])[0]})

# Endpoint for ANN Iris accuracy
@app.route('/accuracy-iris', methods=['GET'])
def get_accuracy_iris():
    loss, accuracy = iris_model.evaluate(X_test_iris, y_test_iris, verbose=0)
    return jsonify({'accuracy': accuracy})

# Endpoint for visualizing Iris dataset
@app.route('/visualize-iris', methods=['GET'])
def visualize_iris():
    plt.figure()
    plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')
    plt.xlabel('Sepal Length')
    plt.ylabel('Sepal Width')
    plt.title('Iris Data Visualization')
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    return send_file(img, mimetype='image/png')

if __name__ == '__main__':
    app.run(port=5000)
