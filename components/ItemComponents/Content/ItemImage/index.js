import React from "react";

import { classNames, stylesheet } from "./ItemImage.css";
import { getDefaultThumbnail } from "utilFunctions";

class ItemImage extends React.Component {
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
    const { title, type, url, useDefaultImage, defaultImageClass } = this.props;
    const { updateToDefaultImage } = this.state;
    const useDefaultWrapper = updateToDefaultImage || useDefaultImage;
    return (
      <div
        className={`${classNames.imageWrapper}
          ${useDefaultWrapper
            ? classNames.defaultImageWrapper + " " + defaultImageClass
            : ""}`}
      >
        <img
          src={updateToDefaultImage ? getDefaultThumbnail(type) : url}
          alt={title}
          className={classNames.image}
        />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </div>
    );
  }
}

export default ItemImage;
