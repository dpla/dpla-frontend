import React, {useState, useEffect, useCallback} from "react"
import Link from "next/link";
import {withRouter} from "next/router";

import ListImage from "./ListImage";
import ListNameModal from "components/ListComponents/ListNameModal";
import Alert from "shared/Alert";

import {
  bindLinkEvent, createUUID, deepCopyObject, joinIfArray, truncateString,
} from "lib";

import {
  getLocalForageItem, getLocalForageLists, setLocalForageItem,
} from "lib/localForage";

import {MAX_LIST_ITEMS, MESSAGE_DELAY, UNTITLED_TEXT} from "constants/site";

import css from "./ListView.module.scss";
import utils from "stylesheets/utils.module.scss";

function joinTruncate(str) {
  return truncateString(joinIfArray(str));
}

/**
 * @param props description item description object
 * @return HTML with truncated item description
 */
function ItemDescription({description}) {
  return (<div className={css.itemDescription}>
    <p>{joinTruncate(description)}</p>
  </div>);
}

function ListView({items, router, exportable, viewMode, defaultUUID, name}) {

  const initialState = () => ({
    readOnly: false,
    listsInitialized: false,
    listName: "",
    listUUID: "",
    selectedHash: {},
    lists: [],
    checkboxShown: false,
    hasList: false,
    listCreatedAt: 0,
    showMessage: "",
  });

  const [state, setState] = useState(initialState());
  const isCreatingRef = React.useRef(false);

  useEffect(() => {
    async function init() {
      await getLists();
      bindClickThroughEvent();
      bindBrowseEvent();
    }

    init().catch(e => console.error("Error initializing ListView", e));
  }, []);

  useEffect(() => {
    if (state.showMessage) {
      const timer = setTimeout(() => setState(prev => ({...prev, showMessage: ""})), MESSAGE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [state.showMessage]);

  useEffect(() => {
    if (name !== state.listName) {
      setState(prev => ({...prev, listName: name}));
    }
  }, [name]);

  const bindClickThroughEvent = () => {
    const links = document.getElementsByClassName("clickThrough");

    Array.from(links).forEach(function (link) {
      const item = items.filter(i => i.sourceUrl === link.href)[0];

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
  };

  const bindBrowseEvent = () => {
    const path = window.location.pathname;
    if (path.startsWith("/browse-by-topic")) {
      const links = document.getElementsByClassName("internalItemLink");

      Array.from(links).forEach(function (link) {
        const str = link.href;
        const item = items.filter(i => {
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
  };

  const getLists = async () => {
    let readOnly = false;
    const lists = await getLocalForageLists();
    lists.sort((a, b) => b.createdAt - a.createdAt);
    if (defaultUUID) {
      readOnly = true;
      await loadList(defaultUUID);
    }
    setState(prev => ({
      ...prev, readOnly, lists, listsInitialized: true
    }));
  };

  const createList = useCallback(async (listName) => {
    if (isCreatingRef.current) {
      return;
    }

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
        createdAt
      }

      await setLocalForageItem(uuid, newList);
      newLists.push(newList);
      newLists.sort((a, b) => b.createdAt - a.createdAt);

      setState(prev => ({
        ...prev,
        listName,
        listCreatedAt: createdAt,
        listUUID: uuid,
        selectedHash: {},
        lists: newLists,
        checkboxShown: true,
        hasList: true
      }));
    } finally {
      isCreatingRef.current = false;
    }
  }, [state.lists]);

  const onNameChange = useCallback((value) => {
    createList(value).catch(e => console.error("Error creating list", e));
  }, [state.lists]);


  const downloadCSV = () => {
    const rows = items
      .filter((item) => {
        const realId = item.itemDplaId || item.id;
        return state.selectedHash[realId] !== undefined;
      })
      .map((item) => {
        const realId = item.itemDplaId || item.id;
        const thumbnailUrl = item.thumbnailUrl.indexOf("placeholderImages") === -1 ? item.thumbnailUrl : "";
        const title = item.title ? `"${truncateString(item.title, 150).replace(/"/g, "”")}"` : UNTITLED_TEXT;
        const date = item?.date?.displayDate ? `"${item.date.displayDate.replace(/"/g, "”")}"` : "";
        const creator = item.creator ? `"${joinIfArray(item.creator, ", ").replace(/"/g, "”")}"` : "";
        const description = item.description ? `"${joinTruncate(item.description).replace(/"/g, "”")}"` : "";
        const provider = item.dataProvider ? `"${joinIfArray(item.dataProvider).replace(/"/g, "”")}"` : "";
        const url = item.sourceUrl;
        return `${realId},${title},${date},${creator},${description},${provider},${thumbnailUrl},${url}`;
      });
    const csvData = `id,Title,Date,Creator,Description,Provider,Thumbnail,URL\r\n${rows.join("\r\n",)}`;

    const filename = `${state.listName}.csv`;
    const blob = new Blob([csvData], {type: "text/csv;charset=utf-8;"});
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

  const loadList = async listUUID => {
    const value = await getLocalForageItem(listUUID);
    const listName = value.name;
    const selectedHash = value.selectedHash;
    const listCreatedAt = value.createdAt;

    setState(prevState => ({
      ...prevState,
      listName,
      listUUID,
      selectedHash,
      listCreatedAt: listCreatedAt,
      hasList: true,
      checkboxShown: true
    }));
  };

  const listSelectChange = e => {
    const listUUID = e.target.value;
    if (listUUID === "") {
      setState((prevState) => ({
        ...prevState,
        listName: "",
        listUUID: "",
        selectedHash: {},
        checkboxShown: false,
        listCreatedAt: 0,
        hasList: false
      }));
    } else {
      loadList(listUUID).catch(e => console.error("Error loading list", e));
    }
  };

  const updateList = async (hash, message) => {
    const updatedAt = Date.now();
    let savedList = {
      name: state.listName,
      selectedHash: hash,
      createdAt: state.listCreatedAt,
      updatedAt: updatedAt
    };
    await setLocalForageItem(state.listUUID, savedList);
    let lists = deepCopyObject(state.lists);
    lists.sort((a, b) => b.createdAt - a.createdAt);
    lists.forEach(l => {
      if (l.uuid === state.listUUID) {
        l.count = Object.keys(hash).length;
      }
    });
    setState((prevState) => ({
      ...prevState,
      selectedHash: hash,
      lists,
      showMessage: message
    }));
  };

  const onCheckItem = e => {
    const element = e.target;
    let id = element.getAttribute("data-id");
    element.checked ? addCell(id) : removeCell(id);
  };

  const onRemoveItem = e => {
    const element = e.target;
    let id = element.getAttribute("data-id");
    element.checked ? removeCell(id) : addCell(id);
  };

  const addCell = id => {
    let hash = deepCopyObject(state.selectedHash);
    if (hash[id]) return; // check if item already selected
    hash[id] = id;
    updateList(hash, "Item added").catch(e => console.error("Error updating list", e));
  };

  const removeCell = id => {
    let hash = deepCopyObject(state.selectedHash);
    delete hash[id];
    const message = state.readOnly ? "Item removed. Uncheck to undo." : "Item removed";
    updateList(hash, message).catch(err => {
      console.error("Error updating list:", err);
    });
  };

  const listCount = Object.keys(state.selectedHash).length;
  return (
    <div>
      {state.listsInitialized && !state.readOnly && (<div className={css.listTools}>
        <ListNameModal
          type="create"
          value=""
          onChange={onNameChange}
          name={state?.lists?.length > 0 ? "Create new list" : "Create a list from these items"}
          className={css.createList}
        />
        {state?.lists?.length > 0 && (<label htmlFor="list-select" className={css.listSelectLabel}>
          {state.hasList ? "Adding" : "Add"} to:
        </label>)}
        {state?.lists?.length > 0 && (<select
          value={state.listUUID}
          aria-label={state.hasList ? "Adding to" : "Add to"}
          id="list-select"
          className={css.listSelect}
          onChange={listSelectChange}
        >
          <option value="">No list</option>
          {state.lists.map((list) => {
            return (<option key={list.uuid} value={list.uuid}>
              {list.name} ({list.count}
              {list.count !== 1 ? " items" : " item"})
            </option>);
          })}
        </select>)}
      </div>)}
      <Alert showMessage={state.showMessage}/>
      {exportable && items.length > 0 && (<div className={css.downloadLink}>
        <a onClick={downloadCSV}>Download list</a>
      </div>)}
      <ul
        className={`${css.listView} ${viewMode === "grid" ? css.grid : ""}`}
      >
        {items.map((item) => {
          const realId = item.itemDplaId || item.id;
          const checked = state.selectedHash[realId] !== undefined;
          const shouldDisable = (!checked && listCount > MAX_LIST_ITEMS) || realId === "http://dp.la/api/items/#sourceResource";
          const disabledMessage = `Maximum ${MAX_LIST_ITEMS} items per list.`;
          let itemLinkText = "View Full Item";
          if (item.type === "image") itemLinkText = "View Full Image"; else if (item.type === "text") {
            itemLinkText = "View Full Text";
          }

          return (<li
            key={item.id}
            className={`${css.listItem} ${state.readOnly && state.selectedHash[realId] === undefined ? css.deleted : ""}`}
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
                {realId !== "http://dp.la/api/items/#sourceResource" && (<Link
                  href={item.linkHref}
                  as={item.linkAs}
                  className={"internalItemLink"}
                >
                  {item.title ? truncateString(joinIfArray(item.title, ", "), 150) : UNTITLED_TEXT}
                </Link>)}
                {/* see issue #869 for details on this hack */}
                {realId === "http://dp.la/api/items/#sourceResource" && (<span>
                        {item.title ? truncateString(item.title, 150) : UNTITLED_TEXT}
                      </span>)}
              </h2>
              {(item.date || item.creator) && (<span className={css.itemAuthorAndDate}>
                      {router.pathname.startsWith("/search") && item.date && (<span>{item.date.displayDate}</span>)}
                {router.pathname.startsWith("/search") && item?.date?.displayDate && item.creator && <span> · </span>}
                <span>
                        {truncateString(joinIfArray(item.creator, ", "))}
                      </span>
                    </span>)}
              <ItemDescription description={item.description}/>
              <a
                href={item.sourceUrl}
                rel="noopener"
                className={`clickThrough external ${css.itemSource}`}
              >
                {itemLinkText}
              </a>
              {item.dataProvider && (<span className={`${css.itemProvider}`}>
                      &nbsp; in {item.dataProvider}
                    </span>)}
            </div>
            {!state.readOnly && (<label
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
                checked={state.selectedHash[realId] !== undefined}
                disabled={shouldDisable}
                key={`checkbox-${realId}`}
                id={`checkbox-${realId}`}
              />
              {!checked && listCount >= MAX_LIST_ITEMS ? "Can’t add more" : "Add to list"}
            </label>)}
            {state.readOnly && (<label
              className={`${css.checkboxLabel} ${css.remove} ${state.checkboxShown ? "" : css.collapsed} ${shouldDisable ? css.disabled : ""}`}
              htmlFor={`checkbox-remove-${realId}`}
              title={shouldDisable ? disabledMessage : ""}
            >
              <input
                className={`${css.checkboxInput} ${css.remove}`}
                type="checkbox"
                data-id={realId}
                onChange={onRemoveItem}
                checked={state.selectedHash[realId] === undefined}
                key={`checkbox-remove-${realId}`}
                id={`checkbox-remove-${realId}`}
              />{" "}
              Remove from list
            </label>)}
          </li>);
        })}
      </ul>
    </div>
  );
}

export default withRouter(ListView);
