import React from "react";

import { classNames } from "./ContentAndMetadata.css";

const VideoPlayer = ({ pathToFile, fileFormat }) =>
  <div className={classNames.videoPlayerWrapper}>
    <video
      className={classNames.videoPlayer}
      controls
      src={pathToFile}
      type={`video/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </video>
  </div>;

export default VideoPlayer;
