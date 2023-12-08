import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Pathfinder from "./Pages/Pathfinder";
import Sort from "./Pages/Sort";
import Sorting from './Pages/Sorting';
import NoPage from "./Pages/NoPage";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Sort" element={<Sort />} />
            <Route path="Sorting/" element={<Sorting />} />
            <Route path="pathfinder" element={<Pathfinder />} />
            <Route path="*" element={<NoPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;