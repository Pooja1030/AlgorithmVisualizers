import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Sort from "./Pages/Sort";
import Sorting from './Pages/Sorting';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Sort" element={<Sort />} />
            <Route path="Sorting/" element={<Sorting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;