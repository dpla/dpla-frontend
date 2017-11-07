import React from "react";
import Link from "next/link";

import Breadcrumbs from "../../Breadcrumbs";

import { stylesheet, classNames } from "./BreadcrumbsModule.css";
import { classNames as utilClassNames } from "css/utils.css";
import { removeQueryParams } from "utilFunctions";
const markdownit = require("markdown-it")({ html: true });

const { container } = utilClassNames;
const chevron = "/static/images/chevron-thick-orange.svg";

// const PreviousItemLink = ({ query, searchItemCount, paginationInfo }) => {
//   const { previous } = paginationInfo;
//   const { id: previousItemId, page: previousItemPage } = previous;
//   const previousIdx = parseInt(query.previous, 10);
//   let nextIdx = parseInt(query.next, 10);
//   // sets next to the last item in the search results, based on the previous item
//   if (!nextIdx >= 0 && previousIdx <= searchItemCount - 2) {
//     nextIdx = previousIdx + 2;
//   }
//   return (
//     <Link
//       href={{
//         pathname: "/item",
//         query: {
//           ...query,
//           itemId: previousItemId,
//           previous: previousIdx > 0 ? previousIdx - 1 : "",
//           next: previousIdx >= 0 ? nextIdx - 1 : nextIdx,
//           page: previousItemPage
//         }
//       }}
//       as={{
//         pathname: `/item/${previousItemId}`,
//         query: {
//           ...removeQueryParams(query, ["itemId"]),
//           previous: previousIdx > 0 ? previousIdx - 1 : "",
//           next: previousIdx >= 0 ? nextIdx - 1 : nextIdx,
//           page: previousItemPage
//         }
//       }}
//     >
//       <a className={`${classNames.previousItemButton} hover-underline`}>
//         <img src={chevron} alt="" className={classNames.previousChevron} />
//         <span>
//           Previous <span className={classNames.hideOnSmallScreens}>Item</span>
//         </span>
//       </a>
//     </Link>
//   );
// };
// const NextItemLink = ({ query, searchItemCount, paginationInfo }) => {
//   const { next } = paginationInfo;
//   const { id: nextItemId, page: nextItemPage } = next;
//   let previousIdx = parseInt(query.previous, 10);
//   if (parseInt(query.next, 10) + 1 === 2) {
//     previousIdx = -1;
//   }
//   const nextIdx = parseInt(query.next, 10);
//   return (
//     <Link
//       href={{
//         pathname: "/item",
//         query: {
//           ...query,
//           itemId: nextItemId,
//           previous: nextIdx < searchItemCount ? previousIdx + 1 : previousIdx,
//           next: nextIdx < searchItemCount - 1 ? nextIdx + 1 : "",
//           page: nextItemPage
//         }
//       }}
//       as={{
//         pathname: `/item/${nextItemId}`,
//         query: {
//           ...removeQueryParams(query, ["itemId"]),
//           previous: nextIdx < searchItemCount ? previousIdx + 1 : previousIdx,
//           next: nextIdx < searchItemCount - 1 ? nextIdx + 1 : "",
//           page: nextItemPage
//         }
//       }}
//     >
//       <a className={`${classNames.nextItemButton} hover-underline`}>
//         <span>
//           Next <span className={classNames.hideOnSmallScreens}>Item</span>
//         </span>
//         <img src={chevron} alt="" className={classNames.nextChevron} />
//       </a>
//     </Link>
//   );
// };

const BreadcrumbsModule = ({
  route,
  breadcrumbs
  // searchItemCount,
  // paginationInfo
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
      {/*(route.query.previous >= 0 || route.query.next) &&
        <div className={classNames.navButtonsWrapper}>
          {route.query.previous &&
            route.query.previous >= 0 &&
            <PreviousItemLink
              query={route.query}
              searchItemCount={searchItemCount}
              paginationInfo={paginationInfo}
            />}
          {route.query.next &&
            route.query.next < searchItemCount &&
            <NextItemLink
              query={route.query}
              searchItemCount={searchItemCount}
              paginationInfo={paginationInfo}
            />}
          </div>*/}
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default BreadcrumbsModule;
