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
      <Route exact path="/" element={<App />} />
      <Route exact path="/game/" element={<div>Please enter a game link as a URL extension</div>} />
      <Route exact path="/game/:gameLink" element={<Game/>} />
    </Routes>
  </BrowserRouter>
  <br/>
  <h5>Copyright 2022 Daksh Srivastava</h5>
</StrictMode>, document.getElementById('root'))