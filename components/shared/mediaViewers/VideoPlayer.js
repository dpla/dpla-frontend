import React from "react";

import css from "./mediaViewers.module.scss";

const VideoPlayer = ({ pathToFile, fileFormat }) =>
  <div className={css.videoPlayerWrapper}>
    <video
      className={css.videoPlayer}
      controls
      controlsList="nodownload"
      src={pathToFile}
      type={`video/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </video>
  </div>;

export default VideoPlayer;
