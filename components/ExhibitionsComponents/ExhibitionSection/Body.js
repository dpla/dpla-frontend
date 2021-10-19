import React from "react";

import Sidebar from "./Sidebar";
import Viewer from "./Viewer";
import Subheader from "./Subheader";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss"

class Body extends React.Component {
  state = { isMenuOpen: false };

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen }, () => {});
  }

  componentWillUnmount() {}

  render() {
    const { exhibition, section, subsection } = this.props;
    return (
      <div className={`${utils.container} ${css.body}`}>
        <Subheader
          onClickMenuButton={() => this.toggleMenu()}
          section={section}
          subsection={subsection}
          isMenuOpen={this.state.isMenuOpen}
        />
        <div id="main" role="main" className={css.mainContent}>
          <Sidebar
            exhibition={exhibition}
            currentSubsection={subsection}
            currentSection={section}
            isShowing={this.state.isMenuOpen}
          />
          <Viewer
            subsection={subsection}
            exhibition={exhibition}
            section={section}
          />
        </div>
      </div>
    );
  }
}

export default Body;
