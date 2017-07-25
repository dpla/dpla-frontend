const primarySourceSets = (state = { primarySourceSets: [] }, action) => {
  switch (action.type) {
    case "UPDATE_PRIMARY_SOURCE_SETS":
      return Object.assign(state, { primarySourceSets: action.sets });
    default:
      return state;
  }
};

export default primarySourceSets;
