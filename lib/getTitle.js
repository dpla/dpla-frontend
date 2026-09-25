// Given a source (i.e. JSON response from primary source sets API)
// return the title.

const getTitle = (source) => source.name || source.mainEntity?.[0]?.name;

export default getTitle;
