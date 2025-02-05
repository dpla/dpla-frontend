/**
 * Asynchronous
 * @returns Promise
 * When successfully fulfilled, the Promise returns String ID of a random item
 * from the DPLA API.
 * Use with await, e.g.
 *   await getRandomItemIdAsync(currentUrl)
 */
const getRandomItemIdAsync = () => {
  return fetch(`https://api.dp.la/v2/random?api_key=${process.env.API_KEY}`)
    .then(response => response.json())
    .then(responseJson => {
      const doc = responseJson.docs[0];
      return doc.id;
    })
    .catch(error => {
      console.log(
        "Error encountered when attempting to get random item ID from DPLA API:"
      );
      console.log(error);
    });
};

export default getRandomItemIdAsync;
