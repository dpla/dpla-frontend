import localforage from "localforage";

export const STORAGE_UNAVAILABLE_ERROR = "No available storage method found.";

const getLocalForageLists = async () => {
  let lists = [];
  await localforage.iterate((value, key) => {
    if (value.name) {
      const selectedHash = value.selectedHash ?? {};
      lists.push({
        uuid: key,
        name: value.name,
        count: Object.keys(selectedHash).length,
        selectedHash,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      });
    }
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
