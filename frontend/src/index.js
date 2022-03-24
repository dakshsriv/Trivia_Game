import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Game from "./components/Game"
import './index.css';
import React, { Component } from "react";
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

class Renders extends Component {
  state = { routesList: ["testRoute", "testRoute2"], questions : null, requested: false};

  addRoute = (route, category) => {
    this.setState(
      (previousState) => ({
        routesList: [...previousState.routesList, route]
      }),
      console.log(this.state.routesList)
    );
  };

  render() {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {this.state.routesList.map((path) => (
            <li key={path}>
              <Link to={`/${path}`}>{path}</Link>
            </li>
          ))}
        </ul>
        <Routes>
          <Route path="/" element={<App callBackFunction={this.addRoute} questions={this.questions}/>} />
          {this.state.routesList.map((routePoint) => (
            <Route
              key={routePoint}
              path={["/", routePoint].join("")}
              element={<Game/>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Renders />
  </StrictMode>,
  rootElement
);
