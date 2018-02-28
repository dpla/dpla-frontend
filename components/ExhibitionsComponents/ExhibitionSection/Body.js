import React from "react";

import Sidebar from "./Sidebar";
import Viewer from "./Viewer";
import Subheader from "./Subheader";
import { classNames } from "./ExhibitionSection.css";
import { classNames as utilClassNames } from "css/utils.css";
const { container } = utilClassNames;

class Body extends React.Component {
  state = { isMenuOpen: false };

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen }, () => {});
  }

  componentWillUnmount() {}

  render() {
    const { exhibition, section, subsection, route } = this.props;
    return (
      <div className={[container, classNames.body].join(" ")}>
        <Subheader
          onClickMenuButton={() => this.toggleMenu()}
          section={section}
          subsection={subsection}
          isMenuOpen={this.state.isMenuOpen}
        />
        <div id="main" role="main" className={classNames.mainContent}>
          <Sidebar
            exhibition={exhibition}
            currentSubsection={subsection}
            currentSection={section}
            isShowing={this.state.isMenuOpen}
          />
          <Viewer
            route={route}
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
