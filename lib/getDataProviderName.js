/**
 * Normalizes a dataProvider value to a string name.
 * The DPLA API can return dataProvider as either a plain string or an object
 * with a `name` property. Returns undefined if neither form is present.
 *
 * @param {string|{name?: string}|null|undefined} dataProvider
 * @returns {string|undefined}
 */
const getDataProviderName = (dataProvider) =>
  typeof dataProvider === "string" ? dataProvider : dataProvider?.name;

export default getDataProviderName;
