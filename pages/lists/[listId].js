import React, { useState, useEffect, useCallback, useRef } from "react";
import Router, { useRouter } from "next/router";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localforage from "localforage";

dayjs.extend(relativeTime);

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import Button from "shared/Button";
import ListView from "shared/ListView";
import ListNameModal from "components/ListComponents/ListNameModal";
import ConfirmModal from "shared/ConfirmModal";
import Pagination from "shared/Pagination";
import { ListLoading, ListEmpty, ListsUnavailable } from "components/ListComponents";

import { addCommasToNumber, addLinkInfoToResults, getDataProviderName, getItemThumbnail, joinIfArray, truncateString } from "lib";

import { setLocalForageItem, removeLocalForageItem, STORAGE_UNAVAILABLE_ERROR } from "lib/localForage";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";

import { LISTS_TITLE } from "constants/lists";
import { UNTITLED_TEXT, LIST_PAGE_SIZE } from "constants/site";

const List = () => {
  const router = useRouter();
  const listId = Array.isArray(router.query?.listId)
    ? router.query.listId[0]
    : router.query?.listId;
  const page = Math.max(1, parseInt(router.query?.page || "1", 10) || 1);

  const [list, setList] = useState(null);
  const [items, setItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const isRenamingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchList = async () => {
      if (!listId) {
        return;
      }

      // Reset state for a new load
      setInitialized(false);
      setList(null);
      setItems([]);
      setStorageUnavailable(false);
      setFetchError(false);
      setIsPageLoading(true);

      try {
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

        const allItemIds = list.selectedHash ? Object.keys(list.selectedHash) : [];
        setTotalItemCount(allItemIds.length);

        if (allItemIds.length === 0) {
          setInitialized(true);
          setList(list);
          setItems([]);
          return;
        }

        const pageIds = allItemIds.slice((page - 1) * LIST_PAGE_SIZE, page * LIST_PAGE_SIZE);
        const ids = pageIds.join(",");

        let res;
        try {
          res = await fetch(`/api/items/${ids}`, { signal: controller.signal });
        } catch (err) {
          if (cancelled) return;
          console.error("Failed to fetch list items:", err);
          setInitialized(true);
          setList(list);
          setItems([]);
          setFetchError(true);
          return;
        }

        if (cancelled) return;

        if (!res.ok) {
          console.error("Failed to fetch list items:", res.status);
          setInitialized(true);
          setList(list);
          setItems([]);
          setFetchError(true);
          return;
        }

        try {
          const json = await res.json();
          if (cancelled) return;
          if (!Array.isArray(json.docs)) {
            setInitialized(true);
            setList(list);
            setItems([]);
            setFetchError(true);
            return;
          }
          const items = json.docs
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
          setFetchError(true);
        }
      } finally {
        if (!cancelled) {
          setIsPageLoading(false);
        }
      }
    };

    fetchList();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [listId, page]);

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

  const handleExport = useCallback(async () => {
    if (isExporting || !list) return;
    setIsExporting(true);
    try {
      const allItemIds = Object.keys(list.selectedHash || {});
      if (allItemIds.length === 0) return;

      const allItems = [];
      for (let i = 0; i < allItemIds.length; i += LIST_PAGE_SIZE) {
        const batchIds = allItemIds.slice(i, i + LIST_PAGE_SIZE);
        const res = await fetch(`/api/items/${batchIds.join(",")}`);
        if (!res.ok) continue;
        const json = await res.json();
        json.docs
          .filter((result) => result.error === undefined)
          .forEach((result) => {
            allItems.push({
              ...result.sourceResource,
              id: result.id ?? result.sourceResource["@id"],
              sourceUrl: result.isShownAt,
              dataProvider: getDataProviderName(result.dataProvider),
              thumbnailUrl: getItemThumbnail(result),
            });
          });
      }

      const Q = '\x22';
      const csvField = (value) => Q + value.replace(/\x22/g, Q + Q) + Q;
      const rows = allItems.map((item) => {
        const thumbnailUrl =
          item.thumbnailUrl && !item.thumbnailUrl.includes('placeholderImages')
            ? item.thumbnailUrl
            : '';
        const title = csvField(
          item.title ? truncateString(joinIfArray(item.title), 150) : UNTITLED_TEXT
        );
        const date = item?.date?.displayDate ? csvField(item.date.displayDate) : csvField('');
        const creator = item.creator ? csvField(joinIfArray(item.creator, ', ')) : csvField('');
        const description = item.description
          ? csvField(truncateString(joinIfArray(item.description)))
          : csvField('');
        const provider = item.dataProvider ? csvField(joinIfArray(item.dataProvider)) : csvField('');
        return [item.id, title, date, creator, description, provider, csvField(thumbnailUrl), csvField(item.sourceUrl || '')].join(',');
      });

      const csvData = `id,Title,Date,Creator,Description,Provider,Thumbnail,URL\r\n${rows.join("\r\n")}`;
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `DPLA User List - ${list.name || "list"}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  }, [isExporting, list]);

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

  const pageCount = Math.ceil(totalItemCount / LIST_PAGE_SIZE);

  return (
    <MainLayout pageTitle={list ? list.name : LISTS_TITLE}>
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: LISTS_TITLE,
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
                <span className={css.listNameText}>{list.name}</span>
                <span className={css.listHeaderActions}>
                  <ListNameModal
                    name="Rename"
                    type="rename"
                    className={css.listRenameButton}
                    value={list.name}
                    onChange={onNameChange}
                  />
                  <Button
                    type="secondary"
                    className={css.listDownloadButton}
                    onClick={handleExport}
                    disabled={isExporting}
                  >
                    {isExporting ? "Preparing download…" : "Download list"}
                  </Button>
                  <ConfirmModal
                    className={css.listDeleteConfirm}
                    buttonText="Delete list"
                    text="Delete list?"
                    confirmButtonText="Delete"
                    onConfirm={handleConfirmDelete}
                  />
                </span>
              </h1>
            )}
            {(list.createdAt || initialized) && (
              <p className={css.listDate}>
                {list.createdAt && <>Created {dayjs(list.createdAt, "x").fromNow()}</>}
                {list.createdAt && initialized && <> · </>}
                {initialized && <>{addCommasToNumber(totalItemCount)} {totalItemCount === 1 ? "item" : "items"}</>}
              </p>
            )}
            <p>
              <strong>Note:</strong> The link to this list won&apos;t work for
              someone else or in another browser.
            </p>
            {items.length > 0 && listId && (
              <div style={isPageLoading ? { opacity: 0.4, pointerEvents: "none" } : undefined}>
                <ListView
                  items={addLinkInfoToResults(items)}
                  behavior={"list"}
                  viewingList={listId}
                />
                {pageCount > 1 && (
                  <Pagination currentPage={page} pageCount={pageCount} />
                )}
              </div>
            )}
            {items.length === 0 && (
              fetchError
                ? <p role="alert" className={css.listItemsError}>We couldn&apos;t load your saved items right now. Please try again later.</p>
                : <ListEmpty />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default List;