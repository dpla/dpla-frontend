const titleCase = str =>
  str.replace(/\b\S/g, function(t) {
    return t.toUpperCase();
  });

export default titleCase;
