import React from "react";

import MainLayout from "components/MainLayout";
import { Lists, ListsEmpty } from "components/ListComponents";
import FeatureHeader from "shared/FeatureHeader";

import { getLocalForageLists } from "lib/localForage";

import utils from "stylesheets/utils.scss";

const TITLE = "Lists";
const DESCRIPTION = "Your lists.";

class ListsPage extends React.Component {
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
            {lists.length > 0 && <Lists lists={lists} />}
            {lists.length === 0 && <ListsEmpty />}
          </div>
        </div>
      </MainLayout>
    );
  }
}
ListsPage.getInitialProps = async ({ req }) => {
  return {};
};

export default ListsPage;
