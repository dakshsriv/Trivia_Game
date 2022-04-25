import ReactDOM from "react-dom";
import App from "./components/App";
import Game from "./components/Game"
import './index.css';
import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game/" element={<Game/>} />
    </Routes>
  </BrowserRouter>
</StrictMode>, document.getElementById('root'))