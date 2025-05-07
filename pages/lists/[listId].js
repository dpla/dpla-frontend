import React, { useState, useEffect, useCallback, useRef } from "react";
import Router, { useRouter } from "next/router";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localforage from "localforage";

dayjs.extend(relativeTime);

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";
import ListNameModal from "components/ListComponents/ListNameModal";
import ConfirmModal from "shared/ConfirmModal";
import { ListLoading, ListEmpty } from "components/ListComponents";

import { addLinkInfoToResults, getItemThumbnail } from "lib";

import { setLocalForageItem, removeLocalForageItem } from "lib/localForage";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";

import { LISTS_TITLE } from "constants/lists";
import { UNTITLED_TEXT } from "constants/site";

const List = () => {
  const router = useRouter();
  const listId = Array.isArray(router.query.listId)
    ? router.query.listId[0]
    : router.query.listId;

  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const isRenamingRef = useRef(false);

  useEffect(() => {
    const fetchList = async () => {
      if (!listId) {
        return;
      }

      const list = await localforage.getItem(listId);

      if (!list) {
        setInitialized(true);
        setItems([]);
        return;
      }

      const itemIds = list?.selectedHash ? Object.keys(list?.selectedHash) : [];

      if (itemIds.length === 0) {
        setInitialized(true);
        setList(list);
        setItems([]);
        return;
      }

      const ids = itemIds.join(",");

      const url = `/api/items/${ids}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) {
          setInitialized(true);
          setList(list);
          setItems([]);
          return;
        }
        throw new Error("Couldn't load items.");
      }

      try {
        const json = await res.json();
        const items = json.docs
          .filter((result) => result.error === undefined)
          .map((result) => {
            const thumbnailUrl = getItemThumbnail(result);
            const dataProviderFromObj =
              result.dataProvider && result.dataProvider.name;
            const dataProvider = dataProviderFromObj || result.dataProvider;

            return {
              ...result.sourceResource,
              thumbnailUrl,
              id: result.id ? result.id : result.sourceResource["@id"],
              sourceUrl: result.isShownAt,
              provider: result.provider && result.provider.name,
              dataProvider: dataProvider,
              useDefaultImage: !result.object,
            };
          });
        setInitialized(true);
        setList(list);
        setItems(items);
      } catch {
        setInitialized(true);
        setList(list);
        setItems([]);
      }
    };

    fetchList();
  }, [listId]);

  const onNameChange = useCallback(
    async (value) => {
      console.log("Renaming list to: ", value);
      if (isRenamingRef.current) {
        return;
      }

      try {
        isRenamingRef.current = true;
        const updatedList = { ...list, name: value };
        await setLocalForageItem(listId, updatedList);
        setList(updatedList);
      } finally {
        isRenamingRef.current = false;
      }
    },
    [list, listId],
  );

  const handleConfirmDelete = useCallback(async () => {
    await removeLocalForageItem(listId);
    await Router.push({
      pathname: "/lists",
      query: "",
    });
  }, [listId]);

  if (initialized && !list) {
    return <Error statusCode={404} />;
  }

  return (
    <MainLayout pageTitle={list ? list.name : LISTS_TITLE}>
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: "My Lists",
            url: "/lists",
            as: "/lists",
          },
          { title: list ? list.name : UNTITLED_TEXT },
        ]}
      />
      <div
        id="main"
        role="main"
        className={`${utils.container} ${css.listDetailWrapper}`}
      >
        {!initialized && <ListLoading />}
        {list && (
          <div>
            {list.name && (
              <h1 className={css.listDetailName}>
                {list.name}
                <ListNameModal
                  name="Rename"
                  type="rename"
                  className={css.listRenameButton}
                  value={list.name}
                  onChange={onNameChange}
                />
              </h1>
            )}
            {list.createdAt && (
              <p className={css.listDate}>
                Created {dayjs(list.createdAt, "x").fromNow()}
              </p>
            )}
            <p>
              <strong>Note:</strong> The link to this list won&apos;t work for
              someone else or in another browser.
            </p>
            {items && listId && (
              <ListView
                name={list.name}
                exportable={true}
                items={addLinkInfoToResults(items)}
                behavior={"list"}
                viewingList={listId}
              />
            )}
            {items.length === 0 && <ListEmpty />}
            {list.name && (
              <ConfirmModal
                className={css.listDeleteConfirm}
                buttonText="Delete list"
                confirmText="Delete list?"
                confirmButtonText="Delete"
                onConfirm={handleConfirmDelete}
              />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default List;
