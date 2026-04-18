import React from "react";
import Link from "next/link";

import { getDefaultThumbnail, probeImage } from "lib";

import css from "./ListView.module.scss";

const SOURCE_RESOURCE_ITEM_ID = "http://dp.la/api/items/#sourceResource";

class ListImage extends React.Component {
  state = {
    updateToDefaultImage: false,
  };

  componentDidMount() {
    this.updateImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      if (this._cancelProbe) this._cancelProbe();
      this.setState({ updateToDefaultImage: false });
      this.updateImage();
    }
  }

  componentWillUnmount() {
    if (this._cancelProbe) this._cancelProbe();
  }

  updateImage() {
    const probedUrl = this.props.url;
    this._cancelProbe = probeImage(probedUrl, () => {
      if (this.props.url === probedUrl) {
        this.setState({ updateToDefaultImage: true });
      }
    });
  }

  render() {
    const { type, url, useDefaultImage, item, title, className } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;
    const imageSrc = updateToDefaultImage ? getDefaultThumbnail(type) : url;

    return (
      <div
        className={`${className || ""} ${css.imageWrapper}
          ${useDefaultWrapper && css.defaultImageWrapper}`}
      >
        {/* see issue #869 for details on this hack */}
        {item.id !== SOURCE_RESOURCE_ITEM_ID && (
          <Link
            href={item.linkHref}
            className={`${css.listItemImageLink} internalItemLink`}
            title={title}
          >
            <img
              src={imageSrc}
              alt=""
              className={css.image}
            />
          </Link>
        )}
        {/* see issue #869 for details on this hack */}
        {item.id === SOURCE_RESOURCE_ITEM_ID && (
          <span className={css.listItemImageLink}>
            <img
              src={imageSrc}
              alt=""
              className={css.image}
            />
          </span>
        )}
      </div>
    );
  }
}

export default ListImage;
