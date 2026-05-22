import React from "react";

import css from "./mediaViewers.module.scss";

function VideoPlayer({ pathToFile, fileFormat, captionsUrl }) {
  return (
    <div className={css.videoPlayerWrapper}>
      <video className={css.videoPlayer} controls controlsList="nodownload">
        <source src={pathToFile} />
        {captionsUrl && (
          <track
            kind="captions"
            src={captionsUrl}
            srclang="en"
            label="English"
            default
          />
        )}
      </video>
    </div>
  );
}

export default VideoPlayer;
