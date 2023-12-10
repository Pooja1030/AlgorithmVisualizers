import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Sort from './Sorting/sort';
import Pathfinder from "./Pages/Pathfinder";
import RecursiveSort from "./recursivesort/recursiveSort";
import ConvexHull from "./convexHull/convexHull";
// import Tree from "./RecursiveGraph/Tree"
import Graph from './RecursiveGraph/graph';
import Puzzle from './15Puzzle/puzzle';
import Queen from './Queen/queen';
// import Sort from "./Pages/Sort";
// import Sorting from './Pages/Sorting';
// import NoPage from "./Pages/NoPage";



function App() {
  return (
    <div className="App">
    {/* ReactDOM.render( */}
      <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/sort' Component={Sort} />
            <Route path="Sort" element={<Sort />} />
            {/* <Route path="Sorting/" element={<Sorting />} /> */}
            <Route path="pathfinder" element={<Pathfinder />} />
            <Route path="recursiveSort" element={<RecursiveSort />} />
            <Route path="convexHull" element={<ConvexHull />} />
            <Route path="graph" element={<Graph/>} />
            <Route path="puzzle" element={<Puzzle/>} />
            <Route path="queen" element={<Queen/>} />

            {/* <Route path="*" element={<NoPage />} /> */}

          </Route>
        </Routes>
      </BrowserRouter>
      </React.StrictMode>
    {/* ); */}
    </div>
  );
}

export default App;