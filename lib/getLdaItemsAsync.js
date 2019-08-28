import { LDA_ENDPOINT } from "constants/items";

/**
 * Get docs from the DPLA API that are similar to the doc with the given id.
 * Similarity is based on LDA vectors (topic modeling).
 * Asynchronous
 * @returns Promise
 * When successfully fulfilled, the promise returns an array of docs from the
 * DPLA API.
 * Use with await, e.g.
 *   await getLdaItemsAsync(currentUrl, itemId)
 */

 const getLdaItemsAsync = (currentUrl, itemId) => {
  return fetch(`${currentUrl}${LDA_ENDPOINT}/${itemId}`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(
        "Error encountered when attempting to get LDA items from DPLA API:"
      );
      console.log(error);
    });
};

export default getLdaItemsAsync;
