import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./ResourcesTabs.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

class ResourcesTabs extends React.Component {
  render() {
    const { slug } = this.props.set;
    const { currentTab } = this.props;
    return (
      <div className={classNames.wrapper}>
        <div className={classNames.tabsWrapper}>
          <div className={[classNames.tabs, module].join(" ")}>
            <Link
              href={`/primary-source-sets/set?set=${slug}`}
              as={`/primary-source-sets/${slug}`}
            >
              <a
                className={[
                  classNames.tab,
                  currentTab === "sourceSet" && classNames.activeTab
                ].join(" ")}
              >
                Source Set
              </a>
            </Link>
            <Link onClick={() => this.onTabChange("additionalResources")}>
              <a
                className={[
                  classNames.tab,
                  currentTab === "additionalResources" && classNames.activeTab
                ].join(" ")}
              >
                Additional Resources
              </a>
            </Link>
            {!this.props.route.query.studentMode &&
              <Link
                href={`/primary-source-sets/set/teaching-guide?set=${slug}`}
                as={`/primary-source-sets/${slug}/teaching-guide`}
              >
                <a
                  className={[
                    classNames.tab,
                    currentTab === "teachingGuide" && classNames.activeTab
                  ].join(" ")}
                >
                  Teaching Guide
                </a>
              </Link>}
          </div>
        </div>
        {this.props.children}
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ResourcesTabs;
