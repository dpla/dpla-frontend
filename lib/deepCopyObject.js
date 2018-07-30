// #2 from: https://stackoverflow.com/questions/28876300/deep-copying-array-of-nested-objects-in-javascript/28876564#28876564

const deepCopy = obj => {
  let rv;
  switch (typeof obj) {
    case "object":
      if (obj === null) {
        // null => null
        rv = null;
      } else {
        switch (Object.prototype.toString.call(obj)) {
          case "[object Array]":
            // It's an array, create a new array with
            // deep copies of the entries
            rv = obj.map(deepCopy);
            break;
          case "[object Date]":
            // Clone the date
            rv = new Date(obj);
            break;
          case "[object RegExp]":
            // Clone the RegExp
            rv = new RegExp(obj);
            break;
          // ...probably a few others
          default:
            // Some other kind of object, deep-copy its
            // properties into a new object
            rv = Object.keys(obj).reduce(function(prev, key) {
              prev[key] = deepCopy(obj[key]);
              return prev;
            }, {});
            break;
        }
      }
      break;
    default:
      // It's a primitive, copy via assignment
      rv = obj;
      break;
  }
  return rv;
};

export default deepCopy;
