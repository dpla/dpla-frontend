const getLocalForageLists = async () => {
  let lists = [];
  await localforage.iterate((value, key) => {
    if (!value.name) return;
    lists.push({
      uuid: key,
      name: value.name,
      count: Object.keys(value.selectedHash).length,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt
    });
  });
  return lists;
};

const setLocalForageItem = async (key, value) => {
  const result = await localforage.setItem(key, value);
  return result;
};

const getLocalForageItem = async key => {
  const value = await localforage.getItem(key);
  return value;
};

export { getLocalForageLists, setLocalForageItem, getLocalForageItem };
