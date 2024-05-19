# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.datasets import load_iris

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load the Iris dataset
iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['target'] = iris.target

# Endpoint for KMeans clustering
@app.route('/kmeans', methods=['GET'])
def kmeans():
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

# Endpoint for predicting cluster of a new data point
@app.route('/predict', methods=['POST'])
def predict():
    new_data = request.json['data']
    num_clusters = int(request.json.get('num_clusters', 3))
    kmeans = KMeans(n_clusters=num_clusters, random_state=0)
    kmeans.fit(df.iloc[:, :-1])
    cluster = kmeans.predict([new_data])
    
    return jsonify({'cluster': int(cluster[0])})

if __name__ == '__main__':
    app.run(port=5000)
