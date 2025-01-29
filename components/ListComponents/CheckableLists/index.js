import React from "react";

import Alert from "shared/Alert";
import ListNameModal from "components/ListComponents/ListNameModal";
import { ListCheckbox } from "components/ListComponents";

import { createUUID, deepCopyObject } from "lib";
import { getLocalForageLists, setLocalForageItem } from "lib/localForage";

import { MESSAGE_DELAY } from "constants/site";

import css from "../ListComponents.module.scss";

class CheckableLists extends React.Component {
  state = { showMessage: "", checkedLists: [], lists: [], initialized: false };

  async componentDidMount() {
    await this.getLists();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMessage !== prevState.showMessage)
      setTimeout(() => this.setState({ showMessage: "" }), MESSAGE_DELAY);
  }

  getLists = async () => {
    const { itemId } = this.props;
    const lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    const checkedLists = [];
    lists.forEach((l) => {
      if (l.selectedHash[itemId]) checkedLists.push(l.uuid);
    });
    this.setState({
      lists: lists,
      checkedLists: checkedLists,
      initialized: true,
    });
  };

  onCheckList = async (e) => {
    const element = e.target;
    const id = element.value;
    const selected = element.checked;
    if (selected) {
      await this.addItemToList(id);
    } else {
      await this.removeItemFromList(id);
    }
  };

  async addItemToList(id) {
    const { itemId } = this.props;
    const theList = deepCopyObject(
      this.state.lists.filter((l) => l.uuid === id)[0],
    );
    const checkedLists = deepCopyObject(this.state.checkedLists);
    if (checkedLists.indexOf(id) !== -1 && theList.selectedHash[itemId]) return; // check if item already selected
    checkedLists.push(id);
    theList.selectedHash[itemId] = itemId;
    await this.updateList(id, theList, checkedLists, "Item added");
  }

  async removeItemFromList(id) {
    const { itemId } = this.props;
    const theList = deepCopyObject(
      this.state.lists.filter((l) => l.uuid === id)[0],
    );
    const checkedLists = deepCopyObject(this.state.checkedLists);
    if (checkedLists.indexOf(id) === -1 && !theList.selectedHash[itemId])
      return; // check if item not selected
    checkedLists.splice(checkedLists.indexOf(id), 1);
    delete theList.selectedHash[itemId];
    await this.updateList(id, theList, checkedLists, "Item removed");
  }

  updateList = async (uuid, list, checkedLists, message) => {
    this.setState((prevState) => {
      list.updatedAt = Date.now();
      list.count = Object.keys(list.selectedHash).length;
      const lists = deepCopyObject(
        prevState.lists.filter((l) => l.uuid !== uuid),
      );
      lists.push(list);
      lists.sort((a, b) => b.createdAt - a.createdAt);
      return {
        checkedLists: checkedLists,
        lists: lists,
        showMessage: message,
      };
    });
    await setLocalForageItem(uuid, list);
  };

  onNameChange = async (value) => {
    await this.createList(value);
  };

  createList = async (listName) => {
    this.setState(async (prevState) => {
      const { itemId } = this.props;
      const uuid = createUUID();
      const createdAt = Date.now();
      const checkedLists = deepCopyObject(prevState.checkedLists);
      checkedLists.push(uuid);
      const newLists = deepCopyObject(prevState.lists);
      const savedList = {
        name: listName,
        selectedHash: { [itemId]: itemId },
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      newLists.push({
        ...savedList,
        uuid: uuid,
        count: 1,
      });
      newLists.sort((a, b) => b.createdAt - a.createdAt);
      await setLocalForageItem(uuid, savedList);
      return {
        showMessage: "List created and item added",
        checkedLists: checkedLists,
        lists: newLists,
      };
    });
  };

  render() {
    const { lists, showMessage, checkedLists } = this.state;
    const listOfLists =
      lists.length > 0 ? (
        <ul className={css.listOfLists}>
          {lists.map((l) => {
            const isChecked = checkedLists.indexOf(l.uuid) !== -1;
            const shouldDisable = l.count > 50 && !isChecked;
            return (
              <ListCheckbox
                key={`l_${l.uuid}`}
                list={l}
                shouldDisable={shouldDisable}
                isChecked={isChecked}
                onCheckList={this.onCheckList}
              />
            );
          })}
        </ul>
      ) : (
        <></>
      );
    return (
      <div className="itemLists">
        <Alert showMessage={showMessage} />
        <ListNameModal
          className={css.newListModal}
          type="create"
          value=""
          onChange={this.onNameChange}
          name="Add to a new list"
        />
        {listOfLists}
      </div>
    );
  }
}

export default CheckableLists;
