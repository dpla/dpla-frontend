import React from "react";

import MainLayout from "components/MainLayout";
import { ListsContent } from "components/ListComponents";
import FeatureHeader from "shared/FeatureHeader";

import { getLocalForageLists } from "lib/localForage";
import { LISTS_TITLE } from "constants/lists";

class ListsPage extends React.Component {
  state = { lists: [], initialized: false };

  componentDidMount() {
    this.getLists();
  }

  getLists = async () => {
    let lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      lists: lists,
      initialized: true
    });
  };

  render() {
    const { url } = this.props;
    const { lists, initialized } = this.state;
    return (
      <MainLayout route={url} pageTitle={LISTS_TITLE}>
        <div id="main" role="main">
          <FeatureHeader title={LISTS_TITLE} />
          <ListsContent lists={lists} initialized={initialized} />
        </div>
      </MainLayout>
    );
  }
}
ListsPage.getInitialProps = async ({ req }) => {
  return {};
};

export default ListsPage;
