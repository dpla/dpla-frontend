import React from "react";

import { classNames, stylesheet } from "./mediaViewers.css";

const VideoPlayer = ({ pathToFile, fileFormat }) =>
  <div className={classNames.videoPlayerWrapper}>
    <video
      className={classNames.videoPlayer}
      controls
      controlsList="nodownload"
      src={pathToFile}
      type={`video/${fileFormat}`}
    >
      {/* TODO: actually add captions? don't know if that's a possibility */}
      <track kind="captions" />
    </video>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default VideoPlayer;
