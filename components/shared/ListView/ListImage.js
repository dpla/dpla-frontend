import React from "react";
import Link from "next/link";

import { classNames } from "./ListView.css";
import { getDefaultThumbnail } from "utilFunctions";

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
        className={`${classNames.imageWrapper}
          ${useDefaultWrapper && classNames.defaultImageWrapper}`}
      >
        <Link href={this.state.item.linkHref} as={this.state.item.linkAs}>
          <a className={`${classNames.listItemImageLink}`}>
            <img
              src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
              alt={title}
              className={classNames.image}
            />
          </a>
        </Link>
      </div>
    );
  }
}

export default ListImage;
