import React from "react";
import moment from "moment";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";

import { getLocalForageLists } from "lib/localForage";

import utils from "stylesheets/utils.scss";

const TITLE = "Lists";
const DESCRIPTION = "Your lists.";

class Lists extends React.Component {
  state = { lists: [] };

  componentDidMount() {
    this.getLists();
  }

  getLists = async () => {
    let lists = await getLocalForageLists();
    lists.sort((a, b) => a.createdAt < b.createdAt);
    this.setState({
      lists: lists
    });
  };

  render() {
    const { url } = this.props;
    const { lists } = this.state;
    return (
      <MainLayout route={url} pageTitle={TITLE}>
        <div id="main" role="main">
          <FeatureHeader title={TITLE} description={DESCRIPTION} />
          <div className={`${utils.container}`}>
            <div className="">
              <ul className="">
                {lists.map((l, index) =>
                  <li key={index}>
                    {l.name}
                    <span className="date">
                      {moment(l.createdAt, "x").fromNow()}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}
Lists.getInitialProps = async ({ req }) => {
  return {};
};

export default Lists;