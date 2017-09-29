import React from "react";

import { classNames, stylesheet } from "./ListView.css";
import { getDefaultThumbnail } from "utilFunctions";

class ListImage extends React.Component {
  state = {
    updateToDefaultImage: false
  };

  componentDidMount() {
    const _img = document.createElement("img");
    _img.src = this.props.url;
    _img.onerror = () => {
      this.setState({ updateToDefaultImage: true });
    };
  }

  render() {
    const { title, type, url, useDefaultImage } = this.props;
    const { updateToDefaultImage } = this.state;

    return (
      <div
        className={`${classNames.imageWrapper}
          ${updateToDefaultImage || useDefaultImage
            ? classNames.defaultImageWrapper
            : ""}`}
      >
        <img
          src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
          alt={title}
          className={classNames.image}
        />
      </div>
    );
  }
}

export default ListImage;
