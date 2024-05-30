from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.utils import to_categorical

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# CIFAR-10 classes
cifar10_classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

# Load and preprocess the smaller dataset
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()

# Create a smaller dataset
num_samples = 1000  # Define the number of samples for the smaller dataset
x_train_small, y_train_small = x_train[:num_samples], y_train[:num_samples]
x_test_small, y_test_small = x_test[:num_samples], y_test[:num_samples]

# Normalize the pixel values
x_train_small, x_test_small = x_train_small / 255.0, x_test_small / 255.0
y_train_small, y_test_small = to_categorical(y_train_small), to_categorical(y_test_small)

# Define CNN model
model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(32, 32, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model on the smaller dataset
model.fit(x_train_small, y_train_small, validation_data=(x_test_small, y_test_small), epochs=10)

# Define endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    image = np.array(data).reshape((32, 32, 3))  # Assuming input data is already preprocessed
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)

    predicted_class = np.argmax(prediction)
    confidence = np.max(prediction)

    if np.isnan(confidence):
        confidence = 0.0

    return jsonify({'prediction': cifar10_classes[predicted_class], 'confidence': float(confidence)})

# Define endpoint for accuracy
@app.route('/accuracy', methods=['GET'])
def accuracy():
    loss, acc = model.evaluate(x_test_small, y_test_small, verbose=0)
    return jsonify({'accuracy': acc})

if __name__ == '__main__':
    app.run(port=5000)
