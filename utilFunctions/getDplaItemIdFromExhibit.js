// Given a JSON response from an exhibit
// Get the DPLA ID of the item
const getDplaItemIdFromExhibit = itemJson =>
  itemJson.element_texts
    .filter(element_text => element_text.element.name === "Has Version")
    .map(element_text => element_text.text)[0];

export default getDplaItemIdFromExhibit;
