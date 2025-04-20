import React from "react";

import css from "./mediaViewers.module.scss";

function VideoPlayer({ pathToFile, fileFormat }) {
  return (
    <div className={css.videoPlayerWrapper}>
      <video className={css.videoPlayer} controls controlsList="nodownload">
        <source src={pathToFile} type={`video/${fileFormat}`} />
      </video>
    </div>
  );
}

export default VideoPlayer;
