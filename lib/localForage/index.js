import localforage from "localforage";

const getLocalForageLists = async () => {
  let lists = [];
  await localforage
    .iterate((value, key) => {
      if (value.name) {
        lists.push({
          uuid: key,
          name: value.name,
          count: value?.selectedHash
            ? Object.keys(value.selectedHash).length
            : 0,
          selectedHash: value.selectedHash,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt,
        });
      }
    })
    .catch(function (err) {
      console.log("localforage.getLocalForageLists error", err);
    });
  return lists;
};

const removeLocalForageItem = async (key) => {
  await localforage.removeItem(key).catch(function (err) {
    console.error("localforage.removeLocalForageItem error", err);
  });
};

const setLocalForageItem = async (key, value) => {
  return await localforage.setItem(key, value).catch(function (err) {
    console.error("localforage.setLocalForageItem error", err);
  });
};

const getLocalForageItem = async (key) => {
  return await localforage.getItem(key).catch(function (err) {
    console.error("localforage.getLocalForageItem error", err);
  });
};

export {
  getLocalForageLists,
  setLocalForageItem,
  getLocalForageItem,
  removeLocalForageItem,
};
