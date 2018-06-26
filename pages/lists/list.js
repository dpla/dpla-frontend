import React from "react";
import moment from "moment";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ListView from "shared/ListView";

import { getCurrentUrl, getDefaultThumbnail, addLinkInfoToResults } from "lib";
import { getLocalForageItem } from "lib/localForage";

import { API_ENDPOINT, THUMBNAIL_ENDPOINT } from "constants/items";

import utils from "stylesheets/utils.scss";

const TITLE = "List";

class List extends React.Component {
  state = { uuid: "", list: null, items: [] };

  componentDidMount() {
    const { url } = this.props;
    const uuid = url.query.list;
    this.setState({ uuid: uuid });
    this.getList(uuid);
  }

  getList = async uuid => {
    const list = await getLocalForageItem(uuid);
    this.setState({
      uuid: uuid,
      list: list,
      items: Object.keys(list.selectedHash)
    });
    this.getItems();
  };

  getItems = async () => {
    const currentUrl = getCurrentUrl(this.props.url.query.req);
    const ids = this.state.items.join(",");
    const url = `${currentUrl}${API_ENDPOINT}/${ids}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      const items = json.docs.map(result => {
        const thumbnailUrl = result.object
          ? `${currentUrl}${THUMBNAIL_ENDPOINT}/${result.id}`
          : getDefaultThumbnail(result.sourceResource.type);
        return Object.assign({}, result.sourceResource, {
          thumbnailUrl,
          id: result.id ? result.id : result.sourceResource["@id"],
          sourceUrl: result.isShownAt,
          provider: result.provider && result.provider.name,
          dataProvider: result.dataProvider,
          useDefaultImage: !result.object
        });
      });
      this.setState({ items: items });
    } catch (error) {
      if (res) {
        res.statusCode = 404;
      }
      return { error: { statusCode: 404 } };
    }
  };

  render() {
    const { url, req } = this.props;
    const { uuid, list, items } = this.state;
    return (
      <MainLayout route={url} pageTitle={TITLE}>
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "Lists",
              url: "/lists",
              as: "/lists"
            },
            { title: "A list." }
          ]}
          route={url}
        />
        {list &&
          <div id="main" role="main" className={`${utils.container}`}>
            {list.name && <h1>{list.name}</h1>}
            <p className="date">
              Created {moment(list.createdAt, "x").fromNow()}
            </p>
            {items &&
              uuid &&
              <ListView
                route={url}
                items={addLinkInfoToResults(items, url.query)}
                defaultUUID={uuid}
              />}
          </div>}
      </MainLayout>
    );
  }
}

List.getInitialProps = async ({ req }) => {
  return {};
};

export default List;
