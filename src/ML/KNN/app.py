from flask import Flask, jsonify, request
from flask_cors import CORS
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import numpy as np

app = Flask(__name__)
CORS(app)

# Load and preprocess the Iris dataset
iris = load_iris()
X = iris.data
y = iris.target
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train the KNN model
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

@app.route('/data', methods=['GET'])
def get_data():
    # Send scaled data and labels for visualization
    data = [{'x': X_scaled[i][0], 'y': X_scaled[i][1], 'label': int(y[i])} for i in range(len(X_scaled))]
    return jsonify(data)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive data from the client
        data = request.json['data']

        # Convert input data to float and preprocess the data
        data = [float(i) for i in data]
        data_scaled = scaler.transform([data])

        # Predict the class and find neighbors
        prediction = knn.predict(data_scaled)[0]
        neighbors = knn.kneighbors(data_scaled, return_distance=False)

        # Retrieve neighbor points
        neighbor_points = X_scaled[neighbors[0]].tolist()

        # Map the class label to class name
        class_name = iris.target_names[prediction]

        return jsonify({"prediction": class_name, "neighbors": neighbor_points})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(port=5000)
