import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderSearchBar from "./components/HeaderSearchBar";
import Footer from "./components/Footer";
import Home from "./components/Home";

const App = () =>
  <Router>
    <div>
      <Header />

      <Route path="/" exact={true} component={Home} />
      <Route path="/(.+)">
        <HeaderSearchBar />
      </Route>
      <Footer />
    </div>
  </Router>;
export default App;
