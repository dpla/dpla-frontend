import React from "react";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import { ListsContent } from "components/ListComponents";
import FeatureHeader from "shared/FeatureHeader";

import { createUUID, deepCopyObject } from "lib";
import { getLocalForageLists, setLocalForageItem } from "lib/localForage";
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

  onCreateList = value => {
    this.createList(value);
  };

  createList = async listName => {
    // add the new list to local storage
    const uuid = createUUID();
    const createdAt = Date.now();
    let newLists = deepCopyObject(this.state.lists);
    newLists.push({
      uuid: uuid,
      name: listName,
      count: 0,
      createdAt: createdAt
    });
    newLists.sort((a, b) => b.createdAt - a.createdAt);
    let savedList = {
      name: listName,
      selectedHash: {},
      createdAt: createdAt,
      updatedAt: createdAt
    };
    this.setState({
      lists: newLists
    });
    await setLocalForageItem(uuid, savedList);
    Router.push({ pathname: `/lists/${uuid}` });
  };

  render() {
    const { url } = this.props;
    const { lists, initialized } = this.state;
    return (
      <MainLayout route={url} pageTitle={LISTS_TITLE}>
        <div id="main" role="main">
          <FeatureHeader title={LISTS_TITLE} />
          <ListsContent
            lists={lists}
            initialized={initialized}
            onCreateList={this.onCreateList}
          />
        </div>
      </MainLayout>
    );
  }
}
ListsPage.getInitialProps = async ({ req }) => {
  return {};
};

export default ListsPage;
