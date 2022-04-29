import React from "react";
import Link from "next/link";
import {withRouter} from "next/router";

import DPLALogoWide from "public/static/images/dpla-logo-white.svg";

import {SITE_ENV, LOCAL_ID} from "constants/env";
import {LOCALS} from "constants/local";

import css from "./PageHeader.module.scss";
import utils from "stylesheets/utils.module.scss"

function PageHeader(props) {

    const submitSearch = async (event) => {
        event.preventDefault();
        const verticalSelect = event.target.vertical[0];
        const vertical = verticalSelect.options[verticalSelect.options.selectedIndex].value;
        const q = event.target.q.value;
        const newQuery = { q, vertical };

        props.router.push(
            {
                pathname: "/search",
                query: newQuery
            }
        );
    };

    const { hideSearchBar, router } = props;

    const hasQuery =
        router
        && router.pathname === "/search"
        && router.query;

    const searchQuery = (
        hasQuery
        && router.query.q
    ) ? router.query.q : ""

    const vertical = (
        hasQuery
        && router.query.vertical
    ) ? router.query.vertical : "artifacts"

    return (
        <div
            className={`${css.headerSearchBar} ${SITE_ENV === "pro"
                ? css.pro
                : ""}`}
        >
            <div
                className={`${css.flexWrapper}  ${SITE_ENV === "pro"
                    ? css.pro
                    : ""} ${utils.siteMaxWidth}`}
            >
                {(SITE_ENV === "user" || SITE_ENV === "pro") &&
                <Link as="/" href={SITE_ENV === "user" ? "/" : "/pro"}>
                    <a className={css.logo} title="Home Page">
                        <DPLALogoWide className={css.logoImg}/>
                    </a>
                </Link>}
                {SITE_ENV === "local" &&
                <Link href="/local" as="/">
                    <a className={`${css.logo} ${css.local}`} title="Home Page">
                        <img
                            className={css.localLogo}
                            alt={`${LOCALS[LOCAL_ID].name} Home`}
                            src={`/static/local/${LOCALS[LOCAL_ID].theme}/${LOCALS[
                                LOCAL_ID
                                ].logo}`}
                        />
                        <span className={css.localText}>{LOCALS[LOCAL_ID].name}</span>
                    </a>
                </Link>}
                {!hideSearchBar &&
                SITE_ENV !== "pro" &&
                <form
                    action={"/search"}
                    onSubmit={submitSearch}
                    className={css.searchBar}
                    id={"searchBarForm"}
                >
                    <input
                        key={searchQuery}
                        className={css.searchInput}
                        name="q"
                        type="search"
                        placeholder="Search the collection"
                        aria-label="Search the collection"
                        autoComplete="off"
                        defaultValue={searchQuery}
                    />
                    {SITE_ENV === "user" &&
                    <select
                        name={"vertical"}
                        id={"vertical"}
                        defaultValue={vertical}
                        className={css.searchSelect}

                    >
                        <option value={"artifacts"}>Artifacts</option>
                        <option value={"ebooks"}>Ebooks</option>
                    </select>}
                    {router &&
                    router.pathname === "/search" &&
                    router.query &&
                    Object
                        .keys(router.query)
                        .map((key, index) => {
                            if (key !== "q" && key !== "page") {
                                return (
                                    <input
                                        type="hidden"
                                        key={`k_${index}`}
                                        name={key}
                                        value={router.query[key]}
                                    />
                                );
                            }
                        })}
                    <button
                        type="submit"
                        className={css.searchButton}>
                        Search
                    </button>
                </form>}
            </div>
        </div>
    );

}

export default withRouter(PageHeader);
