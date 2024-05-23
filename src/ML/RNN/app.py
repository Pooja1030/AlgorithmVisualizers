from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.datasets import imdb

app = Flask(__name__)
CORS(app)

# Load and preprocess the dataset
num_words = 10000
max_len = 200

(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=num_words)

x_train = pad_sequences(x_train, maxlen=max_len)
x_test = pad_sequences(x_test, maxlen=max_len)

# Build the RNN
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=num_words, output_dim=32, input_length=max_len),
    tf.keras.layers.SimpleRNN(32),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the RNN
model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))

# Create an endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    data = np.array(data)
    data = pad_sequences(data, maxlen=max_len)
    prediction = model.predict(data)
    predicted_class = (prediction > 0.5).astype('int32')
    return jsonify({'prediction': predicted_class.tolist()})

# Create an endpoint for accuracy
@app.route('/accuracy', methods=['GET'])
def get_accuracy():
    loss, accuracy = model.evaluate(x_test, y_test, verbose=0)
    return jsonify({'accuracy': accuracy})

if __name__ == '__main__':
    app.run(port=5000)
