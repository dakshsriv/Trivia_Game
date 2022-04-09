import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Game from "./components/Game"
import './index.css';
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

class Renders extends Component {
  state = { routes: {"testRoute":"World", "testRoute2":"Hello"},routesList: ["testRoute", "testRoute2"], requested: false};

  addRoute = (route, category) => {
    this.setState(
      (previousState) => ({
        routes: {...previousState.routes, ...{[route]:category}}
      }),
      console.log(Object.keys(this.state.routes)))
  };

  render() {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {Object.keys(this.state.routes).map((path) => (
            <li key={path}>
              <Link to={`/${path}`}>{path}</Link>
            </li>
          ))}
        </ul>
        <Routes>
          <Route path="/" element={<App callBackFunction={this.addRoute}/>} />
          {Object.entries(this.state.routes).map(([routePoint, category]) => (
            <Route
              key={routePoint}
              path={["/", routePoint].join("")}
              element={<Game key={routePoint} category={category} questions={5} />}
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
