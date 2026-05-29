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
import { ListLoading, ListEmpty, ListsUnavailable } from "components/ListComponents";

import { addLinkInfoToResults, getDataProviderName, getItemThumbnail } from "lib";

import { setLocalForageItem, removeLocalForageItem, STORAGE_UNAVAILABLE_ERROR } from "lib/localForage";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";

import { LISTS_TITLE } from "constants/lists";
import { UNTITLED_TEXT } from "constants/site";

const List = () => {
  const router = useRouter();
  const listId = Array.isArray(router.query?.listId)
    ? router.query.listId[0]
    : router.query?.listId;

  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [itemsFetchError, setItemsFetchError] = useState(false);
  const isRenamingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchList = async () => {
      if (!listId) {
        return;
      }

      let list;
      try {
        list = await localforage.getItem(listId);
      } catch (err) {
        if (cancelled) return;
        console.error("fetchList error", err);
        if (err.message === STORAGE_UNAVAILABLE_ERROR) {
          setStorageUnavailable(true);
        }
        setInitialized(true);
        return;
      }

      if (cancelled) return;

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

      let res;
      try {
        res = await fetch(`/api/items/${ids}`, { signal: controller.signal });
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to fetch list items:", err);
        setInitialized(true);
        setList(list);
        setItems([]);
        setItemsFetchError(true);
        return;
      }

      if (cancelled) return;

      if (!res.ok) {
        console.error("Failed to fetch list items:", res.status);
        setInitialized(true);
        setList(list);
        setItems([]);
        setItemsFetchError(true);
        return;
      }

      try {
        const json = await res.json();
        if (cancelled) return;
        const items = (json.docs ?? [])
          .filter((result) => result.error === undefined)
          .map((result) => {
            const thumbnailUrl = getItemThumbnail(result);
            const dataProvider = getDataProviderName(result.dataProvider);

            return {
              ...result.sourceResource,
              thumbnailUrl,
              thumbnailSourceUrl: result.object,
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
        if (cancelled) return;
        setInitialized(true);
        setList(list);
        setItems([]);
        setItemsFetchError(true);
      }
    };

    fetchList();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [listId]);

  const onNameChange = useCallback(
    async (value) => {
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
    try {
      await Router.push({
        pathname: "/lists",
        query: "",
      });
    } catch {}
  }, [listId]);

  if (initialized && storageUnavailable) {
    return (
      <MainLayout pageTitle={LISTS_TITLE}>
        <div id="main" role="main" className={`${utils.container} ${css.listDetailWrapper}`}>
          <ListsUnavailable />
        </div>
      </MainLayout>
    );
  }

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
            {items.length === 0 && (
              itemsFetchError
                ? <p className={css.listItemsError}>We couldn&apos;t load your saved items right now. Please try again later.</p>
                : <ListEmpty />
            )}
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
