import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderSearchBar from "./components/HeaderSearchBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import PrimarySourceSets from "./components/PrimarySourceSets";

const App = () =>
  <Router>
    <div>
      <Header />

      <Route path="/" exact={true} component={Home} />

      <Route
        path="/(.+)"
        render={props =>
          <div>
            <HeaderSearchBar />
            <Route path="/primary-source-sets" component={PrimarySourceSets} />
          </div>}
      />

      <Footer />
    </div>
  </Router>;
export default App;
