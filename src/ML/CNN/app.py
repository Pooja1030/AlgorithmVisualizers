from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, Flatten, MaxPooling2D
from tensorflow.keras.utils import to_categorical

app = Flask(__name__)
CORS(app)

# CIFAR-10 classes
cifar10_classes = ['airplane', 'automobile', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck']

# Load and preprocess CIFAR-10 dataset
(x_train, y_train), (x_test, y_test) = cifar10.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
y_train, y_test = to_categorical(y_train), to_categorical(y_test)

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

# Train the model
model.fit(x_train, y_train, validation_data=(x_test, y_test), epochs=10)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    image = np.array(data).reshape((32, 32, 3))
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)
    
    # Logging for debugging
    print(f"Prediction: {prediction}")
    
    predicted_class = np.argmax(prediction)
    confidence = np.max(prediction)
    
    if np.isnan(confidence):
        confidence = 0.0
    
    return jsonify({'prediction': cifar10_classes[predicted_class], 'confidence': float(confidence)})

@app.route('/accuracy', methods=['GET'])
def accuracy():
    loss, acc = model.evaluate(x_test, y_test, verbose=0)
    return jsonify({'accuracy': acc})

if __name__ == '__main__':
    app.run(port=5000)
