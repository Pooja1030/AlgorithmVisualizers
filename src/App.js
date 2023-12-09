import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Sort from './Sorting/sort';



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

          </Route>
        </Routes>
      </BrowserRouter>
      </React.StrictMode>
    {/* ); */}
    </div>
  );
}

export default App;