import React from "react";
import Link from "next/link";

import { getDefaultThumbnail } from "lib";

import css from "./ListView.module.scss";

class ListImage extends React.Component {
  state = {
    updateToDefaultImage: false,
    item: this.props.item
  };

  componentDidMount() {
    this.updateImage();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ updateToDefaultImage: false });
      this.updateImage();
    }
  }

  updateImage() {
    // Check for images that error so we can replace them with a default image
    const _img = document.createElement("img");
    _img.src = this.props.url;
    _img.onerror = () => {
      this.setState({ updateToDefaultImage: true });
    };
  }

  render() {
    const { type, url, useDefaultImage, item, title, className } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;

    return (
      <div
        className={`${className} ${css.imageWrapper}
          ${useDefaultWrapper && css.defaultImageWrapper}`}
      >
        {/* see issue #869 for details on this hack */}
        {item.id !== "http://dp.la/api/items/#sourceResource" &&
          <Link href={item.linkHref} as={item.linkAs}>
            <a
              className={`${css.listItemImageLink} internalItemLink`}
              title={title}
              aria-hidden
            >
              <img
                src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
                alt=""
                className={css.image}
              />
            </a>
          </Link>}
        {/* see issue #869 for details on this hack */}
        {item.id === "http://dp.la/api/items/#sourceResource" &&
          <span className={css.listItemImageLink} aria-hidden>
            <img
              src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
              alt=""
              className={css.image}
            />
          </span>}
      </div>
    );
  }
}

export default ListImage;
