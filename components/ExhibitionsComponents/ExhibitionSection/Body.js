import React from "react";

import Sidebar from "./Sidebar";
import Viewer from "./Viewer";
import Subheader from "./Subheader";

import css from "./ExhibitionSection.module.scss";
import utils from "stylesheets/utils.module.scss"

class Body extends React.Component {
    state = {isMenuOpen: false};

    toggleMenu() {
        this.setState(
            {
                isMenuOpen: !this.state.isMenuOpen
            },
            () => {
            }
        );
    }

    render() {
        const {
            section,
            subsection,
            sectionMap,
            subsectionMap,
            exhibitionSlug
        } = this.props;
        return (
            <div className={`${utils.container} ${css.body}`}>
                <Subheader
                    onClickMenuButton={() => this.toggleMenu()}
                    subsectionTitle={subsection.title}
                    isMenuOpen={this.state.isMenuOpen}
                />
                <div id="main" role="main" className={css.mainContent}>
                    <Sidebar
                        currentSubsection={subsection}
                        currentSection={section}
                        isShowing={this.state.isMenuOpen}
                        sectionMap={sectionMap}
                        subsectionMap={subsectionMap}
                        exhibitionSlug={exhibitionSlug}
                    />
                    <Viewer
                        subsection={subsection}
                        section={section}
                    />
                </div>
            </div>
        );
    }
}

export default Body;
