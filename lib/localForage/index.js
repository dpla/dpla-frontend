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
      console.log(err);
    });
  return lists;
};

const removeLocalForageItem = async key => {
  await localforage.removeItem(key).catch(function(err) {
    console.log(err);
  });
};

const setLocalForageItem = async (key, value) => {
  const result = await localforage.setItem(key, value).catch(function(err) {
    console.log(err);
  });
  return result;
};

const getLocalForageItem = async key => {
  // TODO: make it work with await so that 404s work
  const value = await localforage.getItem(key).catch(function(err) {
    console.log(err);
  });
  return value;
};

export {
  getLocalForageLists,
  setLocalForageItem,
  getLocalForageItem,
  removeLocalForageItem
};
