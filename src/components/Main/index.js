import React from "react";
import { Route } from "react-router-dom";
import HeaderSearchBar from "../HeaderSearchBar";

class Main extends React.Component {
  render() {
    const { path } = this.props.match;
    return (
      <div>
        <HeaderSearchBar />
        <Route path={`${path}/hey`} render={() => <div>HEY</div>} />
      </div>
    );
  }
}

export default Main;
