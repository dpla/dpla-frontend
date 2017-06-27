import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// TODO: remove empty div after footer is done. just using now to separate from header.
const App = () =>
  <Router>
    <Route path="/" exact={true}>
      <div>
        <Header />
        <div style={{ height: "150px", backgroundColor: "white" }} />
        <Footer />
      </div>
    </Route>
  </Router>;
export default App;
