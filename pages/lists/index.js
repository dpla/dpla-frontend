import React from "react";
import Link from "next/link";
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
    lists.sort((a, b) => a.createdAt > b.createdAt);
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
            {lists.length > 0 &&
              <ul className="">
                {lists.map((l, index) =>
                  <li key={index}>
                    <h2>
                      <Link href={`/lists/${l.uuid}`}><a>{l.name}</a></Link>
                    </h2>
                    <span>{l.count} {l.count !== 1 ? "items " : "item "}</span>
                    {l.createdAt &&
                      <span className="date">
                        Created {moment(l.createdAt, "x").fromNow()}
                      </span>}
                  </li>
                )}
              </ul>}
            {lists.length === 0 &&
              <div>
                <h2>You have no lists</h2>
                <p>
                  Create some lists from our{" "}
                  <Link prefetch href="/browse-by-topic">
                    <a>topics</a>
                  </Link>{" "}or{" "}
                  <Link prefetch href="/search">
                    <a>search results</a>
                  </Link>.
                </p>
                <p>
                  <strong>Note:</strong> You won't see lists created in
                  another browser here. To view those lists, open the browser
                  you used when creating them.
                </p>
              </div>}
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
