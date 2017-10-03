import React from "react";

import { classNames } from "./GridView.css";
import { getDefaultThumbnail } from "utilFunctions";

class GridImage extends React.Component {
  state = {
    updateToDefaultImage: false
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
        <img
          src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
          alt={title}
          className={classNames.image}
        />
      </div>
    );
  }
}

export default GridImage;
