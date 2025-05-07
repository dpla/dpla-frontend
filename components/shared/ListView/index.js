import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import ListImage from "./ListImage";
import ListNameModal from "components/ListComponents/ListNameModal";
import Alert from "shared/Alert";

import {
  bindLinkEvent,
  createUUID,
  deepCopyObject,
  joinIfArray,
  truncateString,
} from "lib";

import { getLocalForageLists, setLocalForageItem } from "lib/localForage";

import { MAX_LIST_ITEMS, MESSAGE_DELAY, UNTITLED_TEXT } from "constants/site";

import css from "./ListView.module.scss";
import utils from "stylesheets/utils.module.scss";

function joinTruncate(str) {
  return truncateString(joinIfArray(str));
}

/**
 * @param props description item description object
 * @return HTML with truncated item description
 */
function ItemDescription({ description }) {
  return (
    <div className={css.itemDescription}>
      <p>{joinTruncate(description)}</p>
    </div>
  );
}

/**
 *
 * @param items Array of items to display (not necessarily those in the list, may be search results or a browse topic).
 * @param exportable Whether or not to show the CSV download link
 * @param viewMode "list" or "grid" for search view
 * @param viewingList contains list id if viewing in /lists/[uuid]
 * @param behavior "search," "browse," or "list" for different behavior depending on where this is used.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ListView({
  items,
  exportable,
  viewMode,
  viewingList,
  behavior,
}) {
  const initialState = () => ({
    readOnly: false,
    listsInitialized: false,
    currentList: null,
    lists: [],
    checkboxShown: false,
    showMessage: "",
  });

  const [state, setState] = useState(initialState());
  const isCreatingRef = React.useRef(false);

  // Analytics for click through events.
  useEffect(() => {
    const links = document.getElementsByClassName("clickThrough");
    Array.from(links).forEach(function (link) {
      const item = items.filter((i) => i.sourceUrl === link.href)[0];
      if (item) {
        const gaEvent = {
          type: "Click Through",
          itemId: item.id,
          title: joinIfArray(item.title),
          partner: joinIfArray(item.provider),
          contributor: joinIfArray(item.dataProvider),
        };
        bindLinkEvent(gaEvent, [link]);
      }
    });
  }, [items]);

  // Analytics for Topic Browse events.
  useEffect(() => {
    if (behavior === "browse") {
      const links = document.getElementsByClassName("internalItemLink");
      Array.from(links).forEach(function (link) {
        const str = link.href;
        const item = items.filter((i) => {
          const suffix = i.linkAs;
          return str.indexOf(suffix, str.length - suffix.length) !== -1;
        })[0];
        if (item) {
          const gaEvent = {
            type: "Browse Item",
            itemId: item.id,
            title: joinIfArray(item.title),
            partner: joinIfArray(item.provider),
            contributor: joinIfArray(item.dataProvider),
          };
          bindLinkEvent(gaEvent, [link], "_self");
        }
      });
    }
  }, [items, behavior]);

  // "Flash" message effect. Runs whenever the showMessage state updates.
  useEffect(() => {
    if (state.showMessage) {
      const timer = setTimeout(
        () => setState((prev) => ({ ...prev, showMessage: "" })),
        MESSAGE_DELAY,
      );
      return () => clearTimeout(timer);
    }
  }, [state.showMessage]);

  // Load lists from localForge effect. Only runs once.
  // We presume we're the only view editing the lists, which may not actually be true.
  useEffect(() => {
    async function getLists() {
      const lists = await getLocalForageLists();
      lists.forEach((list) => {
        if (list.selectedHash === undefined) {
          list.selectedHash = {};
        }
      });
      lists.sort((a, b) => b.createdAt - a.createdAt);
      setState((prevState) => ({
        ...prevState,
        listsInitialized: true,
        currentList: viewingList
          ? lists.find((list) => list.uuid === viewingList)
          : null,
        checkboxShown: viewingList ? true : prevState.checkboxShown,
        lists,
      }));
    }

    getLists().catch((e) => console.error("Error initializing ListView", e));
  }, [viewingList]);

  const onCreate = useCallback(
    (value) => {
      const createList = async (listName) => {
        if (isCreatingRef.current) return; //guard against multiple calls in dev mode
        try {
          isCreatingRef.current = true;
          const uuid = createUUID();
          const createdAt = Date.now();
          const newLists = deepCopyObject(state.lists);
          const newList = {
            uuid,
            name: listName,
            selectedHash: {},
            count: 0,
            createdAt,
          };
          await setLocalForageItem(uuid, newList);
          newLists.push(newList);
          newLists.sort((a, b) => b.createdAt - a.createdAt);
          setState((prev) => ({
            ...prev,
            currentList: newList,
            lists: newLists,
            checkboxShown: true,
            showMessage: "List created.",
          }));
        } finally {
          isCreatingRef.current = false;
        }
      };
      createList(value).catch((e) => console.error("Error creating list", e));
    },
    [state.lists],
  );

  const downloadCSV = () => {
    const rows = items
      .filter((item) => {
        const realId = item.itemDplaId || item.id;
        return state.currentList.selectedHash[realId] !== undefined;
      })
      .map((item) => {
        const realId = item.itemDplaId || item.id;
        const thumbnailUrl =
          item.thumbnailUrl.indexOf("placeholderImages") === -1
            ? item.thumbnailUrl
            : "";
        const title = item.title
          ? `"${truncateString(item.title, 150).replace(/"/g, "”")}"`
          : UNTITLED_TEXT;
        const date = item?.date?.displayDate
          ? `"${item.date.displayDate.replace(/"/g, "”")}"`
          : "";
        const creator = item.creator
          ? `"${joinIfArray(item.creator, ", ").replace(/"/g, "”")}"`
          : "";
        const description = item.description
          ? `"${joinTruncate(item.description).replace(/"/g, "”")}"`
          : "";
        const provider = item.dataProvider
          ? `"${joinIfArray(item.dataProvider).replace(/"/g, "”")}"`
          : "";
        const url = item.sourceUrl;
        return `${realId},${title},${date},${creator},${description},${provider},${thumbnailUrl},${url}`;
      });
    const csvData = `id,Title,Date,Creator,Description,Provider,Thumbnail,URL\r\n${rows.join("\r\n")}`;
    const filename = `${state.listName}.csv`;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    if (navigator?.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          window.location.href = reader.result;
        };
        reader.readAsDataURL(blob);
      }
    }
  };

  const listSelectChange = useCallback((e) => {
    const listUUID = e.target.value;
    if (listUUID === "") {
      setState((prevState) => ({
        ...prevState,
        currentList: null,
        //selectedHash: {},
        checkboxShown: false,
      }));
    } else {
      setState((prevState) => {
        const currentList = prevState.lists.find(
          (list) => list.uuid === listUUID,
        );
        return {
          ...prevState,
          currentList: currentList,
          //selectedHash: currentList.selectedHash,
          checkboxShown: true,
        };
      });
    }
  }, []);

  const updateList = async (hash, message) => {
    const prevList = deepCopyObject(state.currentList);
    const newList = {
      ...prevList,
      updatedAt: Date.now(),
      selectedHash: hash,
    };
    const newLists = deepCopyObject(state.lists).filter(
      (list) => list.uuid !== newList.uuid,
    );
    newLists.push(newList);
    newLists.sort((a, b) => b.createdAt - a.createdAt);
    await setLocalForageItem(newList.uuid, newList);
    setState((prevState) => ({
      ...prevState,
      currentList: newList,
      lists: newLists,
      message,
    }));
  };
  // used for adding an item to a list in search and browse
  const onCheckItem = (e) => {
    const element = e.target;
    const id = element.getAttribute("data-id");
    element.checked ? addCell(id) : removeCell(id);
  };

  // used for removing an item from a list in the list view
  const onRemoveItem = (e) => {
    const element = e.target;
    const id = element.getAttribute("data-id");
    element.checked ? removeCell(id) : addCell(id);
  };

  const addCell = (id) => {
    const hash = deepCopyObject(state.currentList.selectedHash);
    if (hash[id]) return; // check if item already selected
    hash[id] = id;
    updateList(hash, "Item added").catch((e) =>
      console.error("Error updating list", e),
    );
  };

  const removeCell = (id) => {
    const hash = deepCopyObject(state.currentList.selectedHash);
    delete hash[id];
    const message = state.readOnly
      ? "Item removed. Uncheck to undo."
      : "Item removed";
    updateList(hash, message).catch((err) => {
      console.error("Error updating list:", err);
    });
  };

  const listCount = state.lists.length;
  return (
    <div>
      {state.listsInitialized && !viewingList && (
        <div className={css.listTools}>
          <ListNameModal
            type="create"
            value=""
            onChange={onCreate}
            name={
              state?.lists?.length > 0
                ? "Create new list"
                : "Create a list from these items"
            }
            className={css.createList}
          />
          {state?.lists?.length > 0 && (
            <>
              <label htmlFor="list-select" className={css.listSelectLabel}>
                {state?.currentList &&
                Object.keys(state?.currentList?.selectedHash).length > 0
                  ? "Adding"
                  : "Add"}{" "}
                to:
              </label>
              <select
                value={state?.currentList?.uuid}
                aria-label={
                  state?.currentList &&
                  Object.keys(state?.currentList?.selectedHash).length > 0
                    ? "Adding to"
                    : "Add to"
                }
                id="list-select"
                className={css.listSelect}
                onChange={listSelectChange}
              >
                <option value="">No list</option>
                {state.lists.map((list) => {
                  const listSize = Object.keys(list.selectedHash).length;
                  return (
                    <option key={list.uuid} value={list.uuid}>
                      {list.name} ({listSize})
                      {listSize !== 1 ? " items" : " item"})
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
      )}
      <Alert showMessage={state.showMessage} />
      {exportable && items.length > 0 && (
        <div className={css.downloadLink}>
          <a onClick={downloadCSV}>Download list</a>
        </div>
      )}
      <ul className={`${css.listView} ${viewMode === "grid" ? css.grid : ""}`}>
        {items.map((item) => {
          const realId = item.itemDplaId || item.id;
          const checked =
            state?.currentList?.selectedHash?.[realId] !== undefined;
          const shouldDisable =
            (!checked && listCount > MAX_LIST_ITEMS) ||
            realId === "http://dp.la/api/items/#sourceResource";
          const disabledMessage = `Maximum ${MAX_LIST_ITEMS} items per list.`;
          let itemLinkText = "View Full Item";
          if (item.type === "image") itemLinkText = "View Full Image";
          else if (item.type === "text") {
            itemLinkText = "View Full Text";
          }
          return (
            <li
              key={item.id}
              className={`${css.listItem} ${behavior === "list" && !state?.currentList?.selectedHash[realId] ? css.deleted : ""}`}
            >
              <ListImage
                item={item}
                title={item.title}
                type={item.type}
                url={item.thumbnailUrl}
                useDefaultImage={item.useDefaultImage}
              />
              <div className={css.itemInfo}>
                <h2 className={`${utils.hoverUnderline} ${css.itemTitle}`}>
                  {/* see issue #869 for details on this hack */}
                  {realId !== "http://dp.la/api/items/#sourceResource" && (
                    <Link href={item.linkHref} className={"internalItemLink"}>
                      {item.title
                        ? truncateString(joinIfArray(item.title, ", "), 150)
                        : UNTITLED_TEXT}
                    </Link>
                  )}
                  {/* see issue #869 for details on this hack */}
                  {realId === "http://dp.la/api/items/#sourceResource" && (
                    <span>
                      {item.title
                        ? truncateString(item.title, 150)
                        : UNTITLED_TEXT}
                    </span>
                  )}
                </h2>
                {(item.date || item.creator) && (
                  <span className={css.itemAuthorAndDate}>
                    {behavior === "search" && item.date && (
                      <span>{item.date.displayDate}</span>
                    )}
                    {behavior === "search" &&
                      item?.date?.displayDate &&
                      item.creator && <span> · </span>}
                    <span>
                      {truncateString(joinIfArray(item.creator, ", "))}
                    </span>
                  </span>
                )}
                <ItemDescription description={item.description} />
                <a
                  href={item.sourceUrl}
                  rel="noopener"
                  className={`clickThrough external ${css.itemSource}`}
                >
                  {itemLinkText}
                </a>
                {item.dataProvider && (
                  <span className={`${css.itemProvider}`}>
                    &nbsp; in {item.dataProvider}
                  </span>
                )}
              </div>
              {behavior !== "list" && (
                <label
                  className={`${css.checkboxLabel} ${state.checkboxShown ? "" : css.collapsed} ${shouldDisable ? css.disabled : ""}`}
                  htmlFor={`checkbox-${realId}`}
                  title={shouldDisable ? disabledMessage : ""}
                >
                  <input
                    className={`${css.checkboxInput} ${!checked && listCount >= MAX_LIST_ITEMS ? css.disabled : ""}`}
                    type="checkbox"
                    title={shouldDisable ? disabledMessage : ""}
                    data-id={realId}
                    onChange={onCheckItem}
                    checked={
                      state?.currentList?.selectedHash?.[realId] !== undefined
                    }
                    disabled={shouldDisable}
                    key={`checkbox-${realId}`}
                    id={`checkbox-${realId}`}
                  />
                  {!checked && listCount >= MAX_LIST_ITEMS
                    ? "Can’t add more"
                    : "Add to list"}
                </label>
              )}
              {behavior === "list" && (
                <label
                  className={`${css.checkboxLabel} ${css.remove} ${state.checkboxShown ? "" : css.collapsed} ${shouldDisable ? css.disabled : ""}`}
                  htmlFor={`checkbox-remove-${realId}`}
                  title={shouldDisable ? disabledMessage : ""}
                >
                  <input
                    className={`${css.checkboxInput} ${css.remove}`}
                    type="checkbox"
                    data-id={realId}
                    onChange={onRemoveItem}
                    checked={
                      state?.currentList?.selectedHash[realId] === undefined
                    }
                    key={`checkbox-remove-${realId}`}
                    id={`checkbox-remove-${realId}`}
                  />{" "}
                  Remove from list
                </label>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
