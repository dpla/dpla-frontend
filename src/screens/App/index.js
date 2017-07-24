import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Main from "./screens/Main";

const App = () =>
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/" component={Main} />
      </Switch>
      <Footer />
    </div>
  </Router>;
export default App;
