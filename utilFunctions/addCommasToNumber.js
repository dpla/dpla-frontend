// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

const addCommasToNumber = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default addCommasToNumber;
