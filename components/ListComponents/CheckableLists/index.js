import React, { useCallback, useEffect, useRef } from "react";

import Alert from "shared/Alert";
import ListNameModal from "components/ListComponents/ListNameModal";
import { ListCheckbox } from "components/ListComponents";

import { createUUID, deepCopyObject } from "lib";
import { getLocalForageLists, setLocalForageItem } from "lib/localForage";

import { MESSAGE_DELAY } from "constants/site";

import css from "../ListComponents.module.scss";

function CheckableLists({ itemId }) {
  const initialState = () => ({
    showMessage: "",
    checkedLists: [],
    lists: [],
    initialized: false,
  });
  const [state, setState] = React.useState(initialState());
  const isCreatingRef = useRef(false);

  useEffect(() => {
    async function init() {
      const lists = await getLocalForageLists();
      lists.sort((a, b) => b.createdAt - a.createdAt);
      const checkedLists = [];
      lists.forEach((l) => {
        if (l.selectedHash[itemId]) checkedLists.push(l.uuid);
      });
      setState((prevState) => ({
        ...prevState,
        lists: lists,
        checkedLists: checkedLists,
        initialized: true,
      }));
    }
    init();
  }, [itemId]);

  useEffect(() => {
    if (state.showMessage) {
      const timer = setTimeout(
        () => setState((prev) => ({ ...prev, showMessage: "" })),
        MESSAGE_DELAY,
      );
      return () => clearTimeout(timer);
    }
  }, [state.showMessage]);

  const onNewList = useCallback(
    async (listName) => {
      if (isCreatingRef.current) return;
      try {
        isCreatingRef.current = true;
        const uuid = createUUID();
        const createdAt = Date.now();
        const newLists = deepCopyObject(state.lists);
        const newList = {
          uuid: uuid,
          name: listName,
          selectedHash: { [itemId]: itemId },
          count: 1,
          createdAt,
          updatedAt: createdAt,
        };
        await setLocalForageItem(uuid, newList);
        newLists.push(newList);
        newLists.sort((a, b) => b.createdAt - a.createdAt);
        const checkedLists = deepCopyObject(state.checkedLists);
        checkedLists.push(uuid);
        setState((prevState) => ({
          ...prevState,
          showMessage: "List created and item added",
          checkedLists: checkedLists,
          lists: newLists,
        }));
      } finally {
        isCreatingRef.current = false;
      }
    },
    [state.checkedLists, state.lists, itemId],
  );

  const onCheckList = async (e) => {
    const element = e.target;
    const id = element.value;
    const selected = element.checked;
    if (selected) {
      await addItemToList(id);
    } else {
      await removeItemFromList(id);
    }
  };

  const addItemToList = async (id) => {
    const theList = deepCopyObject(state.lists.filter((l) => l.uuid === id)[0]);
    const checkedLists = deepCopyObject(state.checkedLists);
    if (checkedLists.indexOf(id) !== -1 && theList.selectedHash[itemId]) return; // check if item already selected
    checkedLists.push(id);
    theList.selectedHash[itemId] = itemId;
    await updateList(id, theList, checkedLists, "Item added");
  };

  const removeItemFromList = async (id) => {
    const theList = deepCopyObject(state.lists.filter((l) => l.uuid === id)[0]);
    const checkedLists = deepCopyObject(state.checkedLists);
    if (checkedLists.indexOf(id) === -1 && !theList.selectedHash[itemId])
      return; // check if item not selected
    checkedLists.splice(checkedLists.indexOf(id), 1);
    delete theList.selectedHash[itemId];
    await updateList(id, theList, checkedLists, "Item removed");
  };

  const updateList = async (uuid, list, checkedLists, message) => {
    list.updatedAt = Date.now();
    list.count = Object.keys(list.selectedHash).length;
    await setLocalForageItem(uuid, list);

    setState((prevState) => {
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
  };

  const listOfLists =
    state.lists.length === 0 ? (
      <></>
    ) : (
      <ul className={css.listOfLists}>
        {state.lists.map((l) => {
          const isChecked = state.checkedLists.indexOf(l.uuid) !== -1;
          const shouldDisable = l.count > 50 && !isChecked;
          return (
            <ListCheckbox
              key={`l_${l.uuid}`}
              list={l}
              shouldDisable={shouldDisable}
              isChecked={isChecked}
              onCheckList={onCheckList}
            />
          );
        })}
      </ul>
    );
  return (
    <div className="itemLists">
      <Alert showMessage={state.showMessage} />
      <ListNameModal
        className={css.newListModal}
        type="create"
        value=""
        onChange={onNewList}
        name="Add to a new list"
      />
      {listOfLists}
    </div>
  );
}

export default CheckableLists;
