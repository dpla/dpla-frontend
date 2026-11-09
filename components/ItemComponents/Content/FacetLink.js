import React from "react";
import Link from "next/link";

import { isValidFacetQuery } from "lib";

function FacetLink({ facet, value, facetLabel, extraQuery }) {
  const query = { [facet]: `"${value}"`, ...extraQuery };

  // API rejects whole search if any one filter is out of bounds.
  if (!Object.values(query).every(isValidFacetQuery)) {
    return value;
  }

  return (
    <Link
      href={{ pathname: "/search", query }}
      title={`Find more items with ${facetLabel || facet} "${value}"`}
      className="link"
    >
      {value}
    </Link>
  );
}

export default FacetLink;
