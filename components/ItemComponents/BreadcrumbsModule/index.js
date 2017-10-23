import React from "react";
import Link from "next/link";

import Breadcrumbs from "../../Breadcrumbs";

import { stylesheet, classNames } from "./BreadcrumbsModule.css";
import { classNames as utilClassNames } from "css/utils.css";
import { removeQueryParams } from "utilFunctions";
const markdownit = require("markdown-it")({ html: true });

const { container } = utilClassNames;

// const PreviousItemLink = ({ query, searchItemCount, paginationInfo }) => {
//   const { previous, next } = paginationInfo;
//   const { id: previousItemId } = previous;
//   const previousIdx = parseInt(query.previous, 10);
//   const nextIdx = parseInt(query.next, 10);
//   const page_size = parseInt(query.page_size, 10);
//   const page = parseInt(query.page, 10);
//   const newPage = page > 0 && previous === -1 ? page - 1 : page;
//
//   const newPrevious = previous > 0
//     ? previous - 1
//     : newPage !== page ? page_size - 1 : "";
//   return (
//     <Link
//       href={{
//         pathname: "/item",
//         query: {
//           ...query,
//           itemId: previousItemId,
//           previous: newPrevious,
//           next: nextIdx && nextIdx < searchItemCount - 1 ? nextIdx - 1 : "",
//           page: newPage
//         }
//       }}
//       as={{
//         pathname: `/item/${previousItemId}`,
//         query: {
//           ...query,
//           previous: previous > 0 && previous >= 0 ? previous - 1 : "",
//           next: nextIdx && nextIdx < searchItemCount - 1 ? nextIdx - 1 : ""
//         }
//       }}
//     >
//       <a>
//         Previous
//       </a>
//     </Link>
//   );
// };

const PreviousItemLink = ({ query, searchItemCount, paginationInfo }) => {
  const { previous } = paginationInfo;
  const { id: previousItemId, page: previousItemPage } = previous;
  const previousIdx = parseInt(query.previous, 10);
  const nextIdx = parseInt(query.next, 10);
  return (
    <Link
      href={{
        pathname: "/item",
        query: {
          ...query,
          itemId: previousItemId,
          previous: previousIdx > 0 ? previousIdx - 1 : "",
          next: previousIdx > 0 ? nextIdx - 1 : nextIdx
        }
      }}
      as={{
        pathname: `/item/${previousItemId}`,
        query: {
          ...removeQueryParams(query, ["itemId"]),
          previous: previousIdx > 0 ? previousIdx - 1 : "",
          next: previousIdx > 0 ? nextIdx - 1 : nextIdx
        }
      }}
    >
      <a>
        Previous
      </a>
    </Link>
  );
};
const NextItemLink = ({ query, searchItemCount, paginationInfo }) => {
  const { next } = paginationInfo;
  const { id: nextItemId, page: nextItemPage } = next;
  const previousIdx = parseInt(query.previous, 10);
  const nextIdx = parseInt(query.next, 10);
  return (
    <Link
      href={{
        pathname: "/item",
        query: {
          ...query,
          itemId: nextItemId,
          previous: nextIdx < searchItemCount - 1
            ? previousIdx + 1
            : previousIdx,
          next: nextIdx < searchItemCount - 1 ? nextIdx + 1 : "",
          page: nextItemPage
        }
      }}
      as={{
        pathname: `/item/${nextItemId}`,
        query: {
          ...removeQueryParams(query, ["itemId"]),
          previous: nextIdx < searchItemCount - 1
            ? previousIdx + 1
            : previousIdx,
          next: nextIdx < searchItemCount - 1 ? nextIdx + 1 : "",
          page: nextItemPage
        }
      }}
    >
      <a>
        Next
      </a>
    </Link>
  );
};

const BreadcrumbsModule = ({
  route,
  breadcrumbs,
  searchItemCount,
  paginationInfo
}) =>
  <div className={classNames.wrapper}>
    <div className={[container, classNames.breadcrumbsModule].join(" ")}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs.map(breadcrumb =>
          Object.assign({}, breadcrumb, {
            title: markdownit.render(breadcrumb.title)
          })
        )}
      />
      <PreviousItemLink
        query={route.query}
        searchItemCount={searchItemCount}
        paginationInfo={paginationInfo}
      />
      <NextItemLink
        query={route.query}
        searchItemCount={searchItemCount}
        paginationInfo={paginationInfo}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
