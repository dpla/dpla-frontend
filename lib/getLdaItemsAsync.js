import { LDA_ENDPOINT } from "constants/items";

/**
 * 
 */

 const getLdaItemsAsync = (currentUrl, itemId) => {
  console.log("weeeeeeeeeee");
  console.log(itemId);
  return fetch(`${currentUrl}${LDA_ENDPOINT}/${itemId}`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.docs;
    })
    .catch(error => {
      console.log(
        "Error encountered when attempting to get LDA items from DPLA API:"
      );
      console.log(error);
    });
};

export default getLdaItemsAsync;
