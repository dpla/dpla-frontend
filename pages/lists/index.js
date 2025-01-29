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

  async componentDidMount() {
    const lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      lists: lists,
      initialized: true,
    });
  }

  onCreateList = async (listName) => {
    this.setState(async (prevState) => {
      const uuid = createUUID();
      const createdAt = Date.now();
      const newLists = deepCopyObject(prevState.lists);
      newLists.push({
        uuid: uuid,
        name: listName,
        count: 0,
        createdAt: createdAt,
      });
      newLists.sort((a, b) => b.createdAt - a.createdAt);
      const savedList = {
        name: listName,
        selectedHash: {},
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      await setLocalForageItem(uuid, savedList);
      return {
        lists: newLists,
      };
    });
    await Router.push({ pathname: `/lists/${uuid}` });
  };

  render() {
    const { lists, initialized } = this.state;
    return (
      <MainLayout pageTitle={LISTS_TITLE}>
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

export default ListsPage;
