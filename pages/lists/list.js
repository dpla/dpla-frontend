import React from "react";
import Router from "next/router";
import {withRouter} from "next/router";

import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";
import ListNameModal from "components/ListComponents/ListNameModal";
import ConfirmModal from "shared/ConfirmModal";
import {ListLoading, ListEmpty} from "components/ListComponents";

import {
    addLinkInfoToResults,
    deepCopyObject,
    getItemThumbnail
} from "lib";

import {setLocalForageItem, removeLocalForageItem} from "lib/localForage";

import {LISTS_TITLE} from "constants/lists";

import utils from "stylesheets/utils.module.scss";
import css from "components/ListComponents/ListComponents.module.scss";

class List extends React.Component {

    constructor(props) {
        super(props);
        console.log("IN: constructor");
        this.state = {
            list: null,
            items: [],
            initialized: false,
            uuid: ""
        };
    }

    async componentDidMount() {
        console.log("IN: componentDidMount()");
        await this.getList(
            this.props.listId,
            this.props.baseUrl
        );
    }

    getList = async (uuid, baseUrl) => {
        console.log("IN: getList", uuid, baseUrl);
        localforage
            .getItem(uuid)
            .then(async (list) => {
                if (list) {
                    await this.getItems(uuid, list, baseUrl);
                } else {
                    this.setState({initialized: true});
                }
            })
            .catch(function (err) {
                console.log("getList", err);
            });
    };

    getItems = async (uuid, list) => {
        console.log("IN: getItems");
        const itemIds = Object.keys(list.selectedHash);
        const ids = itemIds.join(",");
        if (ids.length === 0) {
            this.setState({
                initialized: true,
                list: list,
                items: [],
                uuid: uuid
            });
            return;
        }
        try {
            const url = `/api/items/${ids}`;
            const res = await fetch(url);
            const json = await res.json();
            const items = json.docs
                .filter(result => result.error === undefined)
                .map(result => {
                    const thumbnailUrl = getItemThumbnail(result);

                    // Try reading dataProvider from object.
                    // If this fails, read dataProvider from string.
                    const dataProviderFromObj = result.dataProvider && 
                        result.dataProvider.name;
                    const dataProvider = dataProviderFromObj ?
                        dataProviderFromObj :
                        result.dataProvider;

                    return Object.assign({}, result.sourceResource, {
                        thumbnailUrl,
                        id: result.id ? result.id : result.sourceResource["@id"],
                        sourceUrl: result.isShownAt,
                        provider: result.provider && result.provider.name,
                        dataProvider: dataProvider,
                        useDefaultImage: !result.object
                    });
                });
            this.setState({
                initialized: true,
                list: list,
                items: items,
                uuid: uuid
            });
            console.log("YAY", items);

        } catch (error) {
            this.setState({
                initialized: true,
                list: list,
                uuid: uuid,
                items: []
            });
        }
    };

    onNameChange = value => {
        console.log("IN: onNameChange");
        let uuid = this.props.listId;
        let list = deepCopyObject(this.state.list);
        list.name = value;
        this.setState({list: list});
        setLocalForageItem(uuid, list);
    };

    handleConfirm = e => {
        console.log("IN: handleConfirm");
        e.preventDefault();
        this.removeList();
    };

    removeList = async () => {
        console.log("IN: removeList");
        const {uuid} = this.state;
        await removeLocalForageItem(uuid);
        Router.push({
            pathname: "/lists",
            query: ""
        });
    };

    render() {
        const {uuid, list, items, initialized} = this.state;
        const {router} = this.props
        if (initialized && (!list || list.length === 0)) {
            return <Error statusCode={404}/>;
        }
        return (
            <MainLayout pageTitle={list ? list.name : LISTS_TITLE}>
                <BreadcrumbsModule
                    breadcrumbs={[
                        {
                            title: "My Lists",
                            url: "/lists",
                            as: "/lists"
                        },
                        {title: list ? list.name : LISTS_TITLE}
                    ]}
                />
                <div
                    id="main"
                    role="main"
                    className={`${utils.container} ${css.listDetailWrapper}`}
                >
                    {!initialized && <ListLoading/>}
                    {list &&
                        <div>
                            {list.name &&
                                <h1 className={css.listDetailName}>
                                    {list.name}
                                    <ListNameModal
                                        name="Rename"
                                        type="rename"
                                        className={css.listRenameButton}
                                        value={list.name}
                                        onChange={this.onNameChange}
                                    />
                                </h1>}
                            {list.createdAt &&
                                <p className={css.listDate}>
                                    Created {dayjs(list.createdAt, "x").fromNow()}
                                </p>}
                            <p>
                                <strong>
                                    Note:
                                </strong>
                                {" "}
                                The link to this list won't work for someone else or in another
                                browser.
                            </p>
                            {items &&
                                uuid &&
                                <ListView
                                    name={list.name}
                                    exportable={true}
                                    items={addLinkInfoToResults(items, router.query)}
                                    defaultUUID={uuid}
                                />}
                            {items.length === 0 && <ListEmpty/>}
                            {list.name &&
                                <ConfirmModal
                                    className={css.listDeleteConfirm}
                                    buttonText="Delete list"
                                    confirmText="Delete list?"
                                    confirmButtonText="Delete"
                                    onConfirm={this.handleConfirm}
                                />}

                        </div>}
                </div>
            </MainLayout>
        );
    }
}

// strangely, this makes the list uuid available in router.query.
// there's probably a better way...
export const getServerSideProps = async (context) => {
    return {
        props: {
            listId: context.req.params.list,
            baseUrl: process.env.BASE_URL
        }
    };
}

export default withRouter(List);
