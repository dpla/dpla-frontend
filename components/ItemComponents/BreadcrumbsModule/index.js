import React from "react";
import Link from "next/link";

import Breadcrumbs from "../../Breadcrumbs";

import { stylesheet, classNames } from "./BreadcrumbsModule.css";
import { classNames as utilClassNames } from "css/utils.css";
const markdownit = require("markdown-it")({ html: true });

const { container } = utilClassNames;

const PreviousItemLink = ({
  query,
  searchItemCount,
  previousItemId,
  nextItemId
}) => {
  const previous = parseInt(query.previous, 10);
  const next = parseInt(query.next, 10);
  const page_size = parseInt(query.page_size, 10);
  const page = parseInt(query.page, 10);
  const newPage = page > 0 && previous === -1 ? page - 1 : page;
  console.log(newPage);
  const newPrevious = previous > 0
    ? previous - 1
    : newPage !== page ? page_size - 1 : "";
  return (
    <Link
      href={{
        pathname: "/item",
        query: {
          ...query,
          itemId: previousItemId,
          previous: newPrevious,
          next: next && next < searchItemCount - 1 ? next - 1 : "",
          page: newPage
        }
      }}
      as={{
        pathname: `/item/${previousItemId}`,
        query: {
          ...query,
          previous: previous > 0 && previous >= 0 ? previous - 1 : "",
          next: next && next < searchItemCount - 1 ? next - 1 : ""
        }
      }}
    >
      <a>
        Previous
      </a>
    </Link>
  );
};
const NextItemLink = ({
  query,
  searchItemCount,
  previousItemId,
  nextItemId
}) => {
  const { next, previous } = query;
  const previousIdx = parseInt(previous, 10);
  const nextIdx = parseInt(next, 10);
  return (
    <Link
      href={{
        pathname: "/item",
        query: {
          ...query,
          itemId: nextItemId,
          previous: previousIdx > 0 && previousIdx >= 0 ? previousIdx - 1 : "",
          next: nextIdx && nextIdx < searchItemCount - 1 ? nextIdx - 1 : ""
        }
      }}
      as={{
        pathname: `/item/${nextItemId}`,
        query: {
          ...query,
          previous: previousIdx > 0 && previousIdx >= 0 ? previousIdx - 1 : "",
          next: nextIdx && nextIdx < searchItemCount - 1 ? nextIdx - 1 : ""
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
  nextItemId,
  previousItemId,
  searchItemCount
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
        previousItemId={previousItemId}
        nextItemId={nextItemId}
      />
      <NextItemLink
        query={route.query}
        searchItemCount={searchItemCount}
        previousItemId={previousItemId}
        nextItemId={nextItemId}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
