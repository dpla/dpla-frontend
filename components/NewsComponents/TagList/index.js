import React from "react";
import Link from "next/link";

import {NEWS_TAGS} from "constants/news";

import css from "stylesheets/content-pages.module.scss"
import {withRouter} from "next/router";

function TagList({router, currentTag, keywords, author}) {
    return (<ul className={css.collapsed}>
        {(currentTag || author !== "" || keywords !== "") && <li>
            <Link href="/news">All News</Link>
        </li>}
        {!(currentTag || author !== "" || keywords !== "") && <li>All News</li>}
        {NEWS_TAGS.map(tag => {
            const id = tag.id;
            const markup = tag.name.toLowerCase().replace(" ", "-") !== currentTag ? <Link
                href={{
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        tag: tag.name.toLowerCase().replace(" ", "-"),
                        k: keywords,
                        page: 1,
                        author: author
                    }
                }}
                title={`View only posts under ${tag.name}`}
            >
                {tag.name}
            </Link> : <span>{tag.name}</span>;
            return <li key={id}>{markup}</li>;
        })}
    </ul>);
}

export default withRouter(TagList);
