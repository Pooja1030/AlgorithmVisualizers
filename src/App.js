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
// import Tree from "./RecursiveGraph/Tree"
import Graph from './RecursiveGraph/graph';
import Puzzle from './15Puzzle/puzzle';
import Queen from './Queen/queen';
// import BinarySearch from './BinaryTree/search';
import BinaryTree from './BinaryTree/searchcopy';
import BinarySearch from './BinarySearch/binarysearch';
import LinkedList from './LinkedList/Linkedlist';
import MinSpanTree from './MinimumSpanningTree/MinimumSpanningTree';
import Queue from './Queue/queue';
import Stack from './Stack/stack';

import HomeDraft from "./Pages/HomeDraft";


function App() {
  return (
    <div className="App">
    {/* ReactDOM.render( */}
      <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route index element={<HomeDraft />} />
            <Route path="Sort" element={<Sort />} />
            <Route path="pathfinder" element={<PathfindingVisualizer />} />
            <Route path="recursiveSort" element={<RecursiveSort />} />
            <Route path="convexHull" element={<ConvexHull />} />
            <Route path="graph" element={<Graph/>} />
            <Route path="puzzle" element={<Puzzle/>} />
            <Route path="queen" element={<Queen/>} />
            <Route path="BinaryTree" element={<BinaryTree/>} />
            <Route path="BinarySearch" element={<BinarySearch/>} />
            {/* <Route path="LinkedList" element={<LinkedList/>} /> */}
            <Route path="MinimumSpanningTree" element={<MinSpanTree/>} />
            <Route path="stack" element={<Stack/>} />
            <Route path="queue" element={<Queue/>} />
            <Route path="LinkedList" element={<LinkedList/>} />

            
            <Route path="*" element={<NoPage />} />

            <Route path="home" element={<Home/>} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
      </React.StrictMode>
    {/* ); */}
    </div>
  );
}

export default App;