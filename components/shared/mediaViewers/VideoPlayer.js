import React from "react";

import css from "./mediaViewers.module.scss";
import * as PropTypes from "prop-types";

function VideoPlayer(props) {
  const { pathToFile, fileFormat } = props;
  return (
    <div className={css.videoPlayerWrapper}>
      <video className={css.videoPlayer} controls controlsList="nodownload">
        <source src={pathToFile} type={`video/${fileFormat}`} />
      </video>
    </div>
  );
}

VideoPlayer.propTypes = {
  pathToFile: PropTypes.any,
  fileFormat: PropTypes.any,
};

export default VideoPlayer;
