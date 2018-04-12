import React from "react";
import Link from "next/link";

import { getDefaultThumbnail } from "utilFunctions";

import css from "./ListView.scss";

class ListImage extends React.Component {
  state = {
    updateToDefaultImage: false,
    item: this.props.item
  };

  componentDidMount() {
    // Check for images that error so we can replace them with a default image
    const _img = document.createElement("img");
    _img.src = this.props.url;
    _img.onerror = () => {
      this.setState({ updateToDefaultImage: true });
    };
  }

  render() {
    const { title, type, url, useDefaultImage } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;

    return (
      <div
        className={`${css.imageWrapper}
          ${useDefaultWrapper && css.defaultImageWrapper}`}
      >
        <Link href={this.state.item.linkHref} as={this.state.item.linkAs}>
          <a
            className={`${css.listItemImageLink} internalItemLink`}
            aria-hidden
          >
            <img
              src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
              alt=""
              className={css.image}
            />
          </a>
        </Link>
      </div>
    );
  }
}

export default ListImage;
