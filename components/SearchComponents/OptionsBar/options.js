export const pageSizeOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
  { value: "100", label: "100" }
];

export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "a_to_z", label: "A–Z" },
  { value: "z_to_a", label: "Z-A" },
  { value: "old_to_new", label: "Oldest to Newest" },
  { value: "new_to_old", label: "Newest to Oldest" }
];

export const mapSortOptionsToParams = {
  a_to_z: {
    sort_by: "title",
    sort_order: "asc"
  },
  z_to_a: {
    sort_by: "title",
    sort_order: "desc"
  },
  old_to_new: {
    sort_by: "created",
    sort_order: "asc"
  },
  new_to_old: {
    sort_by: "created",
    sort_order: "desc"
  },
  relevance: {
    sort_by: "",
    sort_order: ""
  }
};

export const getSortOptionFromParams = ({ sortBy, sortOrder }) => {
  if (sortBy === "created") {
    return sortOrder === "asc" ? "old_to_new" : "new_to_old";
  } else if (sortBy === "title") {
    return sortOrder === "asc" ? "a_to_z" : "z_to_a";
  } else {
    return "relevance";
  }
};
