import React from "react";
import { Link } from "react-router-dom";
import * as path from "../../constants/routes";
import "./scss/index.css";
import "./scss/App.css";

const Home = () => (
  <div className="App">
    <h1>Home page</h1>
    <p>
      <Link to={path.SIGN_IN}>login</Link>
    </p>
    <p>
      <Link to={path.SIGN_UP}>signup</Link>
    </p>
    <p>
      <Link to={path.DASHBOARD}>dashboard</Link>
    </p>
  </div>
);
export default Home;
