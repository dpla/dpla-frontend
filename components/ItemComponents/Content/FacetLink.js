import React from "react";
import Link from "next/link";

function FacetLink({ facet, value, facetLabel, extraQuery }) {
  return (
    <Link
      href={{ pathname: "/search", query: { [facet]: `"${value}"`, ...extraQuery } }}
      title={`Find more items with ${facetLabel || facet} "${value}"`}
      className="link"
    >
      {value}
    </Link>
  );
}

export default FacetLink;
