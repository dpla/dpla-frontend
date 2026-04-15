import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import { ListsContent } from "components/ListComponents";
import FeatureHeader from "shared/FeatureHeader";

import { getLocalForageLists, setLocalForageItem, STORAGE_UNAVAILABLE_ERROR } from "lib/localForage";
import { LISTS_TITLE } from "constants/lists";
import {createUUID} from "lib/index";

const ListsPage = () => {

  const [lists, setLists] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const isCreatingRef = React.useRef(false);

  useEffect( () => {
    const fetchLists = async () => {
      try {
        const fetchedLists = await getLocalForageLists();
        fetchedLists.sort((a, b) => b.createdAt - a.createdAt);
        setLists(fetchedLists);
      } catch (err) {
        console.error("fetchLists error", err);
        if (err.message === STORAGE_UNAVAILABLE_ERROR) {
          setStorageUnavailable(true);
        }
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized) fetchLists();
  }, [initialized]);


  const onCreateList = useCallback(async (name) => {
    // this isCreating ref is used to prevent multiple calls to onCreateList in dev mode,
    // and if React's API changes to depend on the callback being idempotent.
    // We can't just depend on looking up the uuid in localForage because it's async.
    if (isCreatingRef.current) {
      return;
    }

    try {
      isCreatingRef.current = true;
      const createdAt = Date.now();
      const uuid = createUUID();
      const newList = {
        uuid,
        name,
        selectedHash: {},
        count: 0,
        createdAt,
      }

      await setLocalForageItem(uuid, newList);

      setLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        return updatedLists.sort((a, b) => b.createdAt - a.createdAt);
      });

      // Redirect to the new list
      try {
        await Router.push({ pathname: `/lists/${uuid}` });
      } catch {}

    } finally {
      isCreatingRef.current = false;
    }
  }, []);


  return (
    <MainLayout pageTitle={LISTS_TITLE}>
      <div id="main" role="main">
        <FeatureHeader title={LISTS_TITLE} />
        <ListsContent
          lists={lists}
          initialized={initialized}
          onCreateList={onCreateList}
          storageUnavailable={storageUnavailable}
        />
      </div>
    </MainLayout>
  );
};

export default ListsPage;