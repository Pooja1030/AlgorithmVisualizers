from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import io
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

# Load and preprocess the dataset
data = pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data', header=None)
data.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class']
X = data.iloc[:, 0:4].values
y = data.iloc[:, 4].values

# Encode class labels
labelencoder = LabelEncoder()
y = labelencoder.fit_transform(y)

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Standardize features
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Build the ANN
model = Sequential()
model.add(Dense(units=8, activation='relu', input_dim=4))
model.add(Dense(units=8, activation='relu'))
model.add(Dense(units=3, activation='softmax'))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the ANN
model.fit(X_train, y_train, batch_size=10, epochs=50, validation_split=0.1)

# Create an endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    data = np.array(data).reshape(1, -1)
    data = sc.transform(data)
    prediction = model.predict(data)
    predicted_class = np.argmax(prediction, axis=1)[0]
    return jsonify({'prediction': int(predicted_class), 'class': labelencoder.inverse_transform([predicted_class])[0]})

# Create an endpoint for accuracy
@app.route('/accuracy', methods=['GET'])
def get_accuracy():
    loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
    return jsonify({'accuracy': accuracy})

# Create an endpoint for visualizations
@app.route('/visualize', methods=['GET'])
def visualize():
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
