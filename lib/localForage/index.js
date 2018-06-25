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

export { getLocalForageLists };
