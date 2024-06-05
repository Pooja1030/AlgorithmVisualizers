import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";
import Sort from './Sorting/sort';
import PathfindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import RecursiveSort from "./recursivesort/recursiveSort";
import ConvexHull from "./convexHull/convexHull";
import Graph from './RecursiveGraph/graph';
import Puzzle from './15Puzzle/puzzle';
import Queen from './Queen/queen';
import BinarySearch from './BinarySearch/binarysearch';
import LinkedList from './LinkedList/Linkedlist';
import Queue from './Queue/queue';
import Stack from './Stack/stack';
import Mst from './MST/mst';
import BST from "./BST/Bst"
import LinearRegressionVisualization from './ML/LinearRegression/linear';
import LogisticRegressionVisualization from './ML/LogisticRegression/logistic';
import MultipleLinearRegressionVisualization from './ML/Multiplelinearregression/multiplelinear';
import KMeansVisualization from './ML/KMeans/Kmeans';
import KNN from './ML/KNN/KNN';
import ANN from './ML/ANN/ANN';
import CNN from './ML/CNN/CNN';
// import RNN from './ML/RNN/RNN';

import SortingInfo from './Pages/InfoPages/sortInfo'
import MSTInfo from './Pages/InfoPages/mstInfo.js';
import PathfinderInfo from './Pages/InfoPages/pathFinder.js';
import BinarySearchInfo from './Pages/InfoPages/binarySearchInfo.js';
import NQueensInfo from './Pages/InfoPages/queensInfo.js';


function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="Sort" element={<Sort />} />
            <Route path="pathfinder" element={<PathfindingVisualizer />} />
            <Route path="recursiveSort" element={<RecursiveSort />} />
            <Route path="convexHull" element={<ConvexHull />} />
            <Route path="graph" element={<Graph />} />
            <Route path="puzzle" element={<Puzzle />} />
            <Route path="queen" element={<Queen />} />
            <Route path="BinaryTree" element={<BST />} />
            <Route path="BinarySearch" element={<BinarySearch />} />
            <Route path="MinimumSpanningTree" element={<Mst />} />
            <Route path="stack" element={<Stack />} />
            <Route path="queue" element={<Queue />} />
            <Route path="LinkedList" element={<LinkedList />} />
            <Route path="linear-regression" element={<LinearRegressionVisualization />} />
            <Route path="logistic-regression" element={<LogisticRegressionVisualization />} />
            <Route path="multiplelinear-regression" element={<MultipleLinearRegressionVisualization />} />
            <Route path="KMeans" element={<KMeansVisualization />} />
            <Route path="KNN" element={<KNN />} />
            <Route path="ANN" element={<ANN/>} />
            <Route path="CNN" element={<CNN />} />
            {/* <Route path="RNN" element={<RNN />} /> */}
            <Route path="*" element={<NoPage />} />
            
            <Route path="sort/info" element={<SortingInfo />} />
            <Route path="MinimumSpanningTree/info" element={<MSTInfo />} />
            <Route path="pathfinder/info" element={<PathfinderInfo />} />
            <Route path="BinarySearch/info" element={<BinarySearchInfo />} />
            <Route path="queen/info" element={<NQueensInfo />} />

          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;         
  
