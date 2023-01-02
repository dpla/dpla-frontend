import localforage from "localforage";

const getLocalForageLists = async () => {
  let lists = [];
  await localforage
    .iterate((value, key) => {
      if (value.name) {
        lists.push({
          uuid: key,
          name: value.name,
          count: Object.keys(value.selectedHash).length,
          selectedHash: value.selectedHash,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt
        });
      }
    })
    .catch(function(err) {
      console.log("getLocalForageLists", err);
    });
  return lists;
};

const removeLocalForageItem = async key => {
  await localforage.removeItem(key).catch(function(err) {
    console.log("removeLocalForageItem", err);
  });
};

const setLocalForageItem = async (key, value) => {
  return await localforage.setItem(key, value).catch(function (err) {
    console.log("setLocalForageItem", err);
  });
};

const getLocalForageItem = async key => {
  // TODO: make it work with await so that 404s work
  return await localforage.getItem(key).catch(function (err) {
    console.log("getLocalForageItem", err);
  });
};

export {
  getLocalForageLists,
  setLocalForageItem,
  getLocalForageItem,
  removeLocalForageItem
};
